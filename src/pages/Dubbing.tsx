import { useEffect, useRef, useState } from 'react'
import { useSoundContext } from '@contexts/SoundContext'
import styled from 'styled-components'

import {
  imgBtnRec,
  imgBtnPlay,
  imgBtnChevRight,
  imgBtnSave,
  bgGraphArea,
  imgBtnChevLeft,
  resDubSingleSign,
  resDubFullSign,
} from '@utils/Assets'

import { convertTimeToSec } from '@utils/common'

import { SpeakMode } from '@pages/containers/DubbingContainer'

import useFFmpeg from '@hooks/useFFmpeg'
import useRecorder from '@hooks/useRecorder'

import { StyledSpeechBubble } from '@components/dubbing/SpeechBubble'

import Video from '@components/dubbing/Video'
import Visualizer from '@components/dubbing/Visualizer'
import LiveVisualizer from '@components/dubbing/LiveVisualizer'
import AlertBox from '@components/AlertBox'
import ModalTotalScore from '@components/modals/ModalTotalScore'
import CorrectionResult from '@components/dubbing/CorrectionResult'

type DubbingProps = {
  mode: SpeakMode
  timeStampArr: {
    text: string
    cls: string
    start: string
    end: string
  }[]
}

export default function Dubbing({ mode, timeStampArr }: DubbingProps) {
  const { audioList, playSound } = useSoundContext()

  const isWorking = useRef(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoPath =
    'https://wcfresource.a1edu.com/newsystem/aistudio/70100001.mp4'

  // 특정 구간부터 원하는 구간까지 재생시킬 떄 사용하는 변수
  const [limit, setLimit] = useState({
    isLimit: false,
    startTime: 0,
    endTime: 0,
  })

  const { recFiles, stream, startRecording } = useRecorder()
  const { outputFile, partFiles, trans, getPartFiles } = useFFmpeg()

  const audioRef = useRef<HTMLAudioElement>(null)
  const [recIndex, setRecIndex] = useState(0)

  const [showModalTotalScore, setShowModalTotalScore] = useState<boolean>(false)

  const [isShowResult, setIsShowResult] = useState(false)

  useEffect(() => {
    getPartFiles(videoPath, timeStampArr)
  }, [])

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
   * 녹음 완료 후 실행될 코드
   * @param isCorrect
   * @param duration
   */
  const onCompleteRecord = (isCorrect: boolean, duration: number) => {
    // 정답일 때
    setTimeout(() => {
      if (isCorrect) {
        playSound(audioList.launchSound, 0, 0.1)
      } else {
        playSound(audioList.powerDownSound, 0, 0.25)
      }

      setIsShowResult(true)
      setTimeout(() => setIsShowResult(false), 2000)
    }, duration)
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

  /**
   * 버튼 클릭 - 이전
   */
  const onClickPrev = () => {
    if (!isWorking.current) {
      const prevIndex = recIndex - 1

      if (prevIndex >= 0) {
        setRecIndex(prevIndex)
      } else {
        setRecIndex(timeStampArr.length - 1)
      }
    }
  }

  /**
   * 버튼 클릭 다음
   */
  const onClickNext = () => {
    if (!isWorking.current) {
      const nextIndex = recIndex + 1

      if (timeStampArr.length > nextIndex) {
        setRecIndex(nextIndex)
      } else {
        setRecIndex(0)
      }
    }
  }

  return (
    <>
      <StyledDubStudio>
        <div className="sign">
          {mode === 'single' ? (
            <img src={resDubSingleSign} alt="" height={80} />
          ) : (
            <img src={resDubFullSign} alt="" height={80} />
          )}
        </div>

        <div className="row-1st">
          <div className="graph-area">
            {/* 실시간 사용자 */}
            {stream && (
              <LiveVisualizer
                stream={stream}
                durationInSeconds={
                  convertTimeToSec(timeStampArr[recIndex].end) -
                  convertTimeToSec(timeStampArr[recIndex].start)
                }
                color={'#42d7f5'}
              />
            )}

            {/* 원어민 */}
            {partFiles && (
              <Visualizer audioFile={partFiles[recIndex]} color={'#616161'} />
            )}

            {recFiles[recIndex] &&
              recFiles[recIndex].index === recIndex &&
              !stream && (
                <Visualizer
                  audioFile={recFiles[recIndex].file}
                  color={'#fff'}
                />
              )}
          </div>
          <div className="dubbing-control-area">
            <div className="col-left">
              {/* 녹음 버튼 */}
              <div
                className="btn-rec attention"
                onClick={() => {
                  startRecord()
                }}
              >
                <img src={imgBtnRec} alt="" />
              </div>

              {/* 녹음된 문장 재생 */}
              <div className="btn-play btn-disabled">
                <img src={imgBtnPlay} alt="" />
              </div>
            </div>

            <div className="col-center">
              {/* 이전 문장 보기 버튼 */}
              <div
                className="btn-chev-left btn-disabled"
                onClick={() => onClickPrev()}
              >
                <img src={imgBtnChevLeft} alt="" />
              </div>

              {/* 현재 문장 */}
              <div className="sentence">{timeStampArr[recIndex].text}</div>

              {/* 다음 문장 보기 버튼 */}
              <div className="btn-chev-right" onClick={() => onClickNext()}>
                <img src={imgBtnChevRight} alt="" />
              </div>
            </div>

            <div className="col-right">
              {/* Save 버튼 */}
              <div
                className="btn-save btn-disabled"
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

      {isShowResult && <CorrectionResult isCorrect={true} />}

      <div style={{ display: 'none' }}>
        <AlertBox message="목록으로 나가시겠습니까?" />
      </div>

      {/* 토탈 스코어 보기 */}
      {showModalTotalScore && (
        <ModalTotalScore
          checkIsReview={false}
          thumbnail={''}
          dubDate="2025-05-30"
          level="KA"
          playTime="00:30"
          totalScore="50"
          dubSentence={30}
          dubWords={10}
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

  .sign {
    position: absolute;
    top: 15px;
    right: 25px;
    z-index: 1;
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

  .attention {
    -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
    animation: heartbeat 1.5s ease-in-out infinite both;
  }

  @keyframes heartbeat {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: center center;
      transform-origin: center center;
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    10% {
      -webkit-transform: scale(0.91);
      transform: scale(0.91);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    17% {
      -webkit-transform: scale(0.98);
      transform: scale(0.98);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    33% {
      -webkit-transform: scale(0.87);
      transform: scale(0.87);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    45% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }

  .btn-disabled {
    opacity: 0.4;
    pointer-events: none;
    cursor: not-allowed;
  }
`
