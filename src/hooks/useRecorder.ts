import { useEffect, useState } from 'react'

import axios from 'axios'

import { convertTimeToSec } from 'src/utils/common'

const API_URL = 'https://api.readinggate.elasolution.com'
const API_KEY = 'e874641aac784ff6b9d62c3483f7aaaa'

export default function useRecorder() {
  const [recFiles, setRecFiles] = useState<{ index: number; file: File }[]>([])

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
            const recorder = new MediaRecorder(stream)
            const chunks: BlobPart[] = []

            recorder.ondataavailable = (event) => {
              chunks.push(event.data)
            }

            recorder.onstop = () => {
              stream.getTracks().forEach(function (track) {
                track.stop()
              })

              const audioBlob = new Blob(chunks, { type: recorder.mimeType })
              const studentAudio = new File(
                [audioBlob],
                `userAudio${recIndex + 1}.mp3`,
                {
                  type: 'audio/mp3',
                },
              )

              setRecFiles((prev) => {
                const filtered = prev.filter((f) => f.index !== recIndex)
                return [
                  ...filtered,
                  { index: recIndex, file: studentAudio },
                ].sort((a, b) => a.index - b.index)
              })

              const audioURL = URL.createObjectURL(audioBlob)
              const audio = new Audio(audioURL)
              audio.play()

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
          const onFailGetUserMedia = (err: string) => {
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

  return { recFiles, startRecording }
}
