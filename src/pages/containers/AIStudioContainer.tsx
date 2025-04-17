import { useRef, useState } from 'react'

import { convertTimeToSec } from 'src/utils/common'

import useFFmpeg from '@hooks/useFFmpeg'
import useRecorder from '@hooks/useRecorder'

import Video from '@components/Video'

export default function AIStudioContainer() {
  const isWorking = useRef(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoPath =
    'https://wcfresource.a1edu.com/newsystem/aistudio/70100001.mp4'

  const timeStampArr = [
    { text: 'Hey, guys!', start: '00:00.5', end: '00:02.8' },
    { text: "Hello! What's your name?", start: '00:04.2', end: '00:07.1' },
    { text: 'My name is Leoni.', start: '00:08.2', end: '00:10.3' },
  ]

  // 특정 구간부터 원하는 구간까지 재생시킬 떄 사용하는 변수
  const [limit, setLimit] = useState({
    isLimit: false,
    startTime: 0,
    endTime: 0,
  })

  const { recFiles, startRecording } = useRecorder()
  const { outputFile, trans } = useFFmpeg()

  // const [recIndex, setRecIndex] = useState(0)

  /**
   * 비디오 재생 - 특정 시간
   * @param startTime
   * @param endTime
   */
  const playVideoFrom = (startTime: string, endTime: string) => {
    setLimit({
      isLimit: true,
      startTime: convertTimeToSec(startTime),
      endTime: convertTimeToSec(endTime),
    })
  }

  /**
   * 유저 녹음 시작
   * @param i
   * @param start
   * @param end
   */
  const startRecord = (i: number, start: string, end: string) => {
    if (!isWorking.current) {
      isWorking.current = true

      startRecording(i, start, end, isWorking)
    }
  }

  /**
   * 비디오와 음원 합성
   */
  const transVideo = () => {
    trans(videoPath, recFiles, timeStampArr)
  }

  /**
   * limit 초기화
   */
  const clearLimit = () => {
    setLimit({
      isLimit: false,
      startTime: 0,
      endTime: 0,
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        gap: '5px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '500px',
          gap: '5px',
        }}
      >
        {outputFile ? (
          <video
            src={outputFile}
            width={500}
            controls
            crossOrigin={'anonymous'}
          />
        ) : (
          <Video
            videoRef={videoRef}
            limit={limit}
            path={videoPath}
            clearLimit={clearLimit}
          />
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            paddingTop: '5px',
          }}
        >
          {timeStampArr.map((timeStamp, i) => {
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginLeft: '10px',
                  marginRight: '10px',
                }}
              >
                <span>{timeStamp.text}</span>

                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      border: '1px solid white',
                      paddingRight: '2px',
                      paddingLeft: '2px',
                    }}
                    onClick={() => {
                      playVideoFrom(timeStamp.start, timeStamp.end)
                    }}
                  >
                    playaddasdsa
                  </div>

                  <div
                    style={{
                      border: '1px solid white',
                      paddingRight: '2px',
                      paddingLeft: '2px',
                    }}
                    onClick={() => {
                      startRecord(i, timeStamp.start, timeStamp.end)
                    }}
                  >
                    rec
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div
          style={{
            marginTop: '20px',
            width: '25%',
            height: '30px',
            border: '1px solid white',
            paddingRight: '2px',
            paddingLeft: '2px',
            textAlign: 'center',
          }}
          onClick={() => {
            transVideo()
          }}
        >
          trans
        </div>
      </div>
    </div>
  )
}
