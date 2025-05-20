import { useRef, useState } from 'react'

import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { convertTimeToSec, formatTime } from '@utils/common'

const BASE_URL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm'

export default function useFFmpeg() {
  const [outputFile, setOutputFile] = useState('')
  const [partFiles, setPartFiles] = useState<File[] | null>(null)

  const ffmpegRef = useRef(new FFmpeg())
  const ffmpeg = ffmpegRef.current

  /**
   * ffmpeg 로드
   */
  const loadFFmpeg = async () => {
    await ffmpeg.load({
      coreURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(
        `${BASE_URL}/ffmpeg-core.wasm`,
        'application/wasm',
      ),
    })
  }

  /**
   * 유저 동영상 만들기
   * @param videoPath
   * @param recFiles
   * @param timeStampArr
   */
  const trans = async (
    videoPath: string,
    recFiles: {
      index: number
      file: File
    }[],
    timeStampArr: {
      start: string
      end: string
    }[],
  ) => {
    try {
      await loadFFmpeg()

      if (ffmpeg.loaded) {
        // 자른 음원과 아이의 음원 붙이기
        let mergeStrArr: string[] = []

        // 파일 로드
        await ffmpeg.writeFile('video.mp4', await fetchFile(videoPath))

        for (let i = 0; i < recFiles.length; i++) {
          await fileToMp3(recFiles[i].file, `userAudio${i + 1}.mp3`)
        }

        // 동영상에서 오디오 분리
        await splitAudio()

        // 음원 특정 구간 자르기
        for (let i = 0; i < timeStampArr.length; i++) {
          const start = i === 0 ? '00:00' : timeStampArr[i - 1].end
          const end = timeStampArr[i].start

          await sliceAudio(start, end, `part${i + 1}.mp3`)

          mergeStrArr.push(`part${i + 1}.mp3`)
          mergeStrArr.push(`userAudio${i + 1}.mp3`)
        }

        // 음원 합치기
        await mergeAudio([...mergeStrArr])

        // 비디오와 오디오 합치기
        await makeVideo('user.mp4')

        // 완성된 파일 읽어오기
        const data = await ffmpeg.readFile('user.mp4')
        // @ts-ignore
        const blob = new Blob([data.buffer], { type: 'video/mp4' })
        const url = URL.createObjectURL(blob)

        setOutputFile(url)

        await ffmpeg.deleteFile('video.mp4')
        await ffmpeg.deleteFile('merged.mp3')
        await ffmpeg.deleteFile('audio.mp3')
        await ffmpeg.deleteFile('user.mp4')

        for (let i = 0; i < timeStampArr.length; i++) {
          await ffmpeg.deleteFile(`part${i + 1}.mp3`)
          await ffmpeg.deleteFile(`userAudio${i + 1}.mp3`)
        }
      } else {
      }
    } catch (e) {
      console.log(e)
    } finally {
      ffmpeg.terminate()
    }
  }

  /**
   * 비디오에서 부분 음원 얻기
   * @param videoPath
   */
  const getPartFiles = async (
    videoPath: string,
    timeStampArr: {
      text: string
      cls: string
      start: string
      end: string
    }[],
  ) => {
    try {
      await loadFFmpeg()

      if (ffmpeg.loaded) {
        // 파일 로드
        await ffmpeg.writeFile('video.mp4', await fetchFile(videoPath))

        // 오디오와 비디오 분리
        await splitAudio()

        const files = []

        for (let i = 0; i < timeStampArr.length; i++) {
          const start = timeStampArr[i].start
          const end = timeStampArr[i].end

          await sliceAudio(start, end, `part${i + 1}.mp3`)

          const data = await ffmpeg.readFile(`part${i + 1}.mp3`)
          // @ts-ignore
          const file = new File([data.buffer], `part${i + 1}.mp3`, {
            type: 'audio/mp3',
          })

          files.push(file)
        }

        setPartFiles(files)

        await ffmpeg.deleteFile('video.mp4')
        await ffmpeg.deleteFile('audio.mp3')

        for (let i = 0; i < timeStampArr.length; i++) {
          await ffmpeg.deleteFile(`part${i + 1}.mp3`)
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      ffmpeg.terminate()
    }
  }

  /**
   * 비디오와 음원 분리(mp3)
   */
  const splitAudio = async () => {
    await ffmpeg.exec([
      '-i',
      'video.mp4',
      '-q:a',
      '0',
      '-map',
      'a',
      'audio.mp3',
    ])
  }

  /**
   * 오디오 원하는 부분 자르는 함수
   * @param startTime
   * @param endTime
   * @param outputName
   */
  const sliceAudio = async (
    startTime: string,
    endTime: string,
    outputName: string,
  ) => {
    const duration = convertTimeToSec(endTime) - convertTimeToSec(startTime)

    await ffmpeg.exec([
      '-i',
      'audio.mp3',
      '-ss',
      startTime,
      '-t',
      formatTime(duration),
      outputName,
    ])
  }

  /**
   * 오디오들을 합치는 함수
   * @param audioList
   */
  const mergeAudio = async (audioList: string[]) => {
    const audioStr = audioList.reduce((acc, cur) => acc + '|' + cur)
    console.log(audioStr)
    await ffmpeg.exec(['-i', `concat:${audioStr}`, '-c', 'copy', 'merged.mp3'])
  }

  /**
   * 비디오와 오디오 결합해서 비디오 만드는 함수
   * @param fileName
   */
  const makeVideo = async (fileName: string) => {
    await ffmpeg.exec([
      '-i',
      'video.mp4',
      '-i',
      'merged.mp3',
      '-c:v',
      'copy',
      '-map',
      '0:v:0',
      '-map',
      '1:a:0',
      `${fileName}`,
    ])
  }

  /**
   * File 객체를 mp3로 변환하는 함수
   * @param file 변환할 File 객체
   * @param outputName 출력 mp3 파일 이름
   */
  const fileToMp3 = async (file: File, outputName: string): Promise<void> => {
    const inputName = `input_${Date.now()}${getExtension(file.name)}`

    // 1. ffmpeg에 원본 파일 write
    await ffmpeg.writeFile(inputName, await fetchFile(file))

    // 2. 변환 실행
    await ffmpeg.exec([
      '-i',
      inputName,
      '-ar',
      '44100',
      '-ac',
      '2',
      '-b:a',
      '128k',
      outputName,
    ])

    await ffmpeg.deleteFile(inputName)
  }

  /**
   * 확장자 얻기
   * @param filename
   * @returns
   */
  const getExtension = (filename: string): string => {
    const match = filename.match(/\.[0-9a-z]+$/i)
    return match ? match[0] : '.webm' // fallback 확장자
  }

  return { outputFile, partFiles, trans, getPartFiles }
}
