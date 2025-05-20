import { useEffect, useState } from 'react'

import axios from 'axios'

import { convertTimeToSec } from '@utils/common'
import { IRecordResultData } from '@interfaces/ISpeak'
import { SAVE_STATISTICS_PATH } from 'src/constants/constants'

const API_URL = 'https://api.readinggate.elasolution.com'
const API_KEY = 'e874641aac784ff6b9d62c3483f7aaaa'

export default function useRecorder() {
  const [recFiles, setRecFiles] = useState<{ index: number; file: File }[]>([])
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    console.log(recFiles)
  }, [recFiles])

  const startRecording = (
    recIndex: number,
    startTime: string,
    endTime: string,
    isWorking: React.MutableRefObject<boolean>,
  ) => {
    try {
      // 오디오의 duration을 구한 뒤 녹음 시작
      const onRecordHandler = () => {
        const duration =
          (convertTimeToSec(endTime) - convertTimeToSec(startTime)) * 1000

        if (navigator.mediaDevices.getUserMedia) {
          console.log('The mediaDevices.getUserMedia() method is supported.')

          // user media 권한 얻기 성공
          const onSuccGetUserMedia = (stream: MediaStream) => {
            setStream(stream)
            const recorder = new MediaRecorder(stream)
            const chunks: BlobPart[] = []

            recorder.ondataavailable = (event) => {
              chunks.push(event.data)
            }

            recorder.onstop = () => {
              stream.getTracks().forEach(function (track) {
                track.stop()
              })

              playAudioFromBlob(chunks, recorder, recIndex)
              setStream(null)

              setTimeout(() => {
                isWorking.current = false
                console.log(isWorking.current)
              }, duration)

              ////////////////////////////
              // to-do connect edutem api
              ////////////////////////////
              //   pron_v2(
              //     studyId,
              //     studentHistoryId,
              //     bookCode,
              //     quizNo,
              //     tryCount,
              //     studentAudio,
              //     nativeAudio,
              //     text,
              //     changeSentenceScore,
              //   )
            }

            recorder.onerror = (e) => {
              alert(e)
            }

            recorder.start()

            setTimeout(() => {
              recorder.stop()
            }, duration)
          }

          // user media 권한 얻기 실패
          const onFailGetUserMedia = (err: unknown) => {
            console.error('The following error occured: ' + err)

            // to-do reset
          }

          const constraints = { audio: true }
          navigator.mediaDevices
            .getUserMedia(constraints)
            .then(onSuccGetUserMedia, onFailGetUserMedia)
            .catch((err) => {
              alert(
                '예기치 못한 오류가 발생했습니다. 리딩게이트로 연락주시길 바랍니다. 1599-0533',
              )

              // to-do exit study
            })
        } else {
          alert('MediaDevices.getUserMedia() not supported on your browser!')

          // to-do reset
        }
      }

      onRecordHandler()
    } catch (e) {
      alert(e)
    }
  }

  /**
   * 녹음 완료 후 자동으로 녹음된 파일 재생
   * @param chunks
   * @param recorder
   * @param recIndex
   */
  const playAudioFromBlob = (
    chunks: BlobPart[],
    recorder: MediaRecorder,
    recIndex: number,
  ) => {
    const audioBlob = new Blob(chunks, { type: recorder.mimeType })
    const studentAudio = new File([audioBlob], `userAudio${recIndex + 1}.mp3`, {
      type: 'audio/mp3',
    })

    setRecFiles((prev) => {
      const filtered = prev.filter((f) => f.index !== recIndex)

      return [...filtered, { index: recIndex, file: studentAudio }].sort(
        (a, b) => a.index - b.index,
      )
    })

    const audioURL = URL.createObjectURL(audioBlob)
    const audio = new Audio(audioURL)

    audio.play()
  }

  /**
   * 녹음된 파일 유저가 재생
   * @param index
   */
  const playAudioFromRecFile = (index: number) => {
    const recFile = recFiles.find((f) => f.index === index)

    if (recFile) {
      const audioFile = recFile.file
      const url = URL.createObjectURL(audioFile)

      const audio = new Audio(url)

      audio.play()
    } else {
      alert('녹음을 진행해주세요.')
    }
  }

  /**
   * 에듀템 테스트
   * @param audioBlob
   * @param text
   */
  const pron_v2 = async (
    studyId: string,
    studentHistoryId: string,
    bookCode: string,
    quizNo: number,
    tryCount: number,
    studentAudio: File,
    nativeAudio: string,
    text: string,
    changeSentenceScore: (score: IRecordResultData) => void,
  ) => {
    const nativeFile = await convertURLtoFile(nativeAudio)

    const formData = new FormData()
    formData.append('student_audio', studentAudio)
    formData.append('text', text)
    // @ts-ignore
    formData.append('get_phoneme_result', true)
    // @ts-ignore
    formData.append('native_audio', nativeFile)

    // 에듀템 평가가 너무 오래 걸릴 경우 얼럿창 띄워주기
    const popupSpeakLouder = () => {
      alert('Speak Louder!!!')
    }

    const lazyTimer = setTimeout(() => popupSpeakLouder(), 7000)
    // 에듀템 평가가 너무 오래 걸릴 경우 얼럿창 띄워주기 end

    axios
      .post(`${API_URL}/pron_v2/`, formData, {
        headers: {
          'X-API-Key': API_KEY,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((data) => {
        // Speak 데이터 로그 남기기
        try {
          axios.post(`/${SAVE_STATISTICS_PATH}`, {
            studyId: studyId,
            studentHistoryId: studentHistoryId,
            errorCode: data.status,
            bookCode: bookCode,
            libName: 'Speak',
            apiName: 'PRON_V2',
            quizNo: quizNo,
            sentence: text,
            tryCount: `${tryCount + 1}`,
            scorePhoneme: data.data.phoneme_result.sentence_score,
            scoreTotal: data.data.total_score,
          })
        } catch (e) {
          console.log('Error save statistics')
        }

        // 스피킹 결과
        switch (data.status) {
          case 200:
            // 정상적으로 완료된 경우
            changeSentenceScore(data.data)
            break

          case 401:
            // 인증키가 잘못된 경우
            alert(
              'study.인증키가 잘못되었습니다. 리딩게이트로 전화주세요. 1599-0533',
            )
            break

          case 403:
            // Forbidden
            alert(data.data)
            break

          case 422:
            // Validation Error
            alert(data.data)
            break
        }
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        clearTimeout(lazyTimer)
      })
  }

  /**
   * 테스트용 API서버 개발되면 지우고 위에 함수 사용
   */
  const testPronV2 = async () => {}

  return { recFiles, stream, startRecording, playAudioFromRecFile }
}

export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url)
  const data = await response.blob()
  const ext = url.split('.').pop() // url 구조에 맞게 수정할 것
  const filename = url.split('/').pop() // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` }
  return new File([data], filename!, metadata)
}
