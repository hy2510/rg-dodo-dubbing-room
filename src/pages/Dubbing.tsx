import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import {
  imgBtnRec,
  imgBtnPlay,
  imgBtnRight,
  imgBtnSave,
  bgGraphArea,
  imgBtnLeft,
} from '@utils/Assets'

import { convertTimeToSec } from '@utils/common'

import { SpeakMode } from './containers/DubbingContainer'

import useFFmpeg from '@hooks/useFFmpeg'
import useRecorder from '@hooks/useRecorder'

import { StyledSpeechBubble } from '@components/dubbing/SpeechBubble'

import Video from '@components/dubbing/Video'
import Visualizer from '@components/dubbing/Visualizer'
import LiveVisualizer from '@components/dubbing/LiveVisualizer'
import AlertBox from '@components/AlertBox'
import ModalTotalScore from '@components/modals/ModalTotalScore'

type DubbingProps = {
  mode: SpeakMode
}

export default function Dubbing({ mode }: DubbingProps) {
  const isWorking = useRef(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoPath =
    'https://wcfresource.a1edu.com/newsystem/aistudio/70100001.mp4'

  const timeStampArr = [
    { text: 'Hey, guys!', cls: 'highlight', start: '00:00.5', end: '00:02.8' },
    {
      text: "Hello! What's your name?",
      cls: 'hold',
      start: '00:04.2',
      end: '00:07.1',
    },
    { text: 'My name is Leoni.', cls: '', start: '00:08.2', end: '00:10.3' },
  ]

  // 특정 구간부터 원하는 구간까지 재생시킬 떄 사용하는 변수
  const [limit, setLimit] = useState({
    isLimit: false,
    startTime: 0,
    endTime: 0,
  })

  const { recFiles, stream, startRecording } = useRecorder()
  const { outputFile, partFile, trans, getPartFile } = useFFmpeg()

  const audioRef = useRef<HTMLAudioElement>(null)
  const [recIndex, setRecIndex] = useState(0)

  const [showModalTotalScore, setShowModalTotalScore] = useState<boolean>(false)

  useEffect(() => {
    getPartFile(
      videoPath,
      timeStampArr[recIndex].start,
      timeStampArr[recIndex].end,
    )
  }, [])

  useEffect(() => {
    getPartFile(
      videoPath,
      timeStampArr[recIndex].start,
      timeStampArr[recIndex].end,
    )
  }, [recIndex])

  useEffect(() => {
    if (audioRef.current) {
      const recFile = recFiles.find((f) => f.index === recIndex)

      if (recFile) {
        let currentAudio = audioRef.current

        const audioFile = recFile.file
        const url = URL.createObjectURL(audioFile)

        currentAudio.src = url
        currentAudio.load()
      }
    }
  }, [recFiles, recIndex])

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
   * 녹음 시작
   */
  const startRecord = () => {
    if (!isWorking.current) {
      isWorking.current = true

      startRecording(
        recIndex,
        timeStampArr[recIndex].start,
        timeStampArr[recIndex].end,
        isWorking,
      )
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
    <>
      <StyledDubStudio>
        <div className="row-1st">
          <div className="graph-area">
            {stream && (
              <LiveVisualizer
                stream={stream}
                durationInSeconds={
                  convertTimeToSec(timeStampArr[recIndex].end) -
                  convertTimeToSec(timeStampArr[recIndex].start)
                }
              />
            )}

            <Visualizer audioFile={partFile} color={'#fff'} />
          </div>
          <div className="dubbing-control-area">
            <div className="col-left">
              {/* 녹음 버튼 */}
              <div
                className="btn-rec"
                onClick={() => {
                  startRecord()
                }}
              >
                <img src={imgBtnRec} alt="" />
              </div>

              {/* 녹음된 문장 재생 */}
              <div className="btn-play">
                <img src={imgBtnPlay} alt="" />
              </div>
            </div>

            <div className="col-center">
              {/* 이전 문장 보기 버튼 */}
              <div
                className="btn-chev-left"
                onClick={() => {
                  setRecIndex(recIndex - 1)
                }}
              >
                <img src={imgBtnLeft} alt="" />
              </div>

              {/* 현재 문장 */}
              <div className="sentence">{timeStampArr[recIndex].text}</div>

              {/* 다음 문장 보기 버튼 */}
              <div
                className="btn-chev-right"
                onClick={() => {
                  setRecIndex(recIndex + 1)
                }}
              >
                <img src={imgBtnRight} alt="" />
              </div>
            </div>

            <div className="col-right">
              {/* Save 버튼 */}
              <div
                className="btn-save"
                onClick={() => {
                  // setShowDubResult(true)
                }}
              >
                <img src={imgBtnSave} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="row-2nd">
          <div className="col-left">
            <Video
              videoRef={videoRef}
              limit={limit}
              path={videoPath}
              clearLimit={clearLimit}
            />
          </div>
          <div className="col-right">
            {timeStampArr.map((timeStamp, idx) => (
              <StyledSpeechBubble key={idx} className={timeStamp.cls}>
                <div className="character">
                  <img
                    src={`src/assets/images/character/aistudio_character_${timeStamp.text
                      .split(' ')[0]
                      .toLowerCase()}1.png`}
                    alt=""
                  />
                </div>
                <div
                  className="text-box"
                  onClick={() => {
                    playVideoFrom(timeStamp.start, timeStamp.end)
                  }}
                >
                  {timeStamp.text}
                </div>
              </StyledSpeechBubble>
            ))}
          </div>
        </div>
      </StyledDubStudio>

      <div style={{ display: 'none' }}>
        <AlertBox message="목록으로 나가시겠습니까?" />
      </div>

      {/* 토탈 스코어 보기 */}
      {showModalTotalScore && (
        <ModalTotalScore
          dubDate="2025-05-30"
          level="KA"
          playTime="00:30"
          totalScore="50"
          dubTime="00:30"
          dubSentence={30}
          dubWords={10}
          checkIsReview={false}
        />
      )}
    </>
  )
}

// ========== Styled Components ==========

const StyledDubStudio = styled.div`
  width: calc(100%);
  height: calc(100% - 100px);
  margin-top: 100px;

  img {
    -webkit-user-drag: none;
    user-select: none;
  }

  .row-1st {
    width: 100%;
    height: 334px;
    background-image: url(${bgGraphArea});
    background-size: 100%;
    background-position: top;
    background-repeat: no-repeat;
    position: relative;

    .graph-area {
      position: absolute;
      top: 40px;
      left: 40px;
      width: calc(100% - 80px);
      height: 206px;
    }

    .dubbing-control-area {
      height: 70px;
      position: absolute;
      left: 130px;
      right: 130px;
      bottom: 6px;
      display: grid;
      grid-template-columns: 200px 1fr 100px;
      gap: 20px;

      .col-left {
        display: flex;
        align-items: center;
        gap: 10px;

        .btn-rec {
          cursor: pointer;
          width: 95px;
          height: fit-content;

          img {
            display: block;
            width: 100%;
          }
        }

        .btn-play {
          cursor: pointer;
          width: 95px;
          height: fit-content;

          img {
            display: block;
            width: 100%;
          }
        }
      }

      .col-center {
        display: grid;
        grid-template-columns: 80px 1fr 80px;
        align-items: center;
        justify-items: center;
        gap: 10px;
        text-align: center;
        font-size: 1.4em;
        color: #ffffff;

        .btn-chev-left {
          cursor: pointer;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            display: block;
            width: 100%;
          }
        }

        .btn-chev-right {
          cursor: pointer;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            display: block;
            width: 100%;
          }
        }
      }

      .col-right {
        display: flex;
        align-items: center;
        justify-content: end;

        .btn-save {
          cursor: pointer;
          width: 95px;
          height: fit-content;

          img {
            display: block;
            width: 100%;
          }
        }
      }
    }
  }

  .row-2nd {
    height: 246px;
    background-color: #1951d9;
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 30px;
    padding: 20px;

    .col-left video {
      width: 100%;
      border: 10px solid #002f9f;
      border-radius: 20px;
    }

    .col-right {
      display: flex;
      flex-direction: column;
      gap: 10px;
      height: 246px;
      padding-bottom: 40px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 999px;
      }
    }
  }
`
