import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import ModalTotalScore from '@components/modals/ModalTotalScore'
import { useIsMobile } from '@hooks/useIsMobile'
import { RoundedFont } from '@stylesheets/GlobalStyle'
import {
  imgBtnExitReview,
  imgBtnGoTotalScore,
  imgBtnPause,
  imgBtnPlayMovie,
  imgBtnVolumeOff,
  imgBtnVolumeOn,
  resCaption,
} from '@utils/Assets'

type MyReviewProps = {
  onClickBack: () => void
  movieUrl: string
}

export default function MyReview({ onClickBack, movieUrl }: MyReviewProps) {
  const [showTotalScore, setShowTotalScore] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showCaption, setShowCaption] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [hideButton, setHideButton] = useState(false)
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null)

  // 모바일 여부 체크
  const isMobile = useIsMobile()

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
      setHideButton(false)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    } else {
      videoRef.current.play()
      setIsPlaying(true)

      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)

      if (isMobile) {
        // 모바일은 플레이할 때 기본 버튼 숨김
        setHideButton(true)
      } else {
        hideTimerRef.current = setTimeout(() => {
          setHideButton(true)
        }, 3000)
      }
    }
  }

  const showControls = () => {
    setHideButton(false)

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)

    if (isPlaying) {
      hideTimerRef.current = setTimeout(() => {
        setHideButton(true)
      }, 3000)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setHideButton(false) // 재생이 끝나면 버튼은 항상 보이게
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
  }

  useEffect(() => {
    const handleMouseMove = () => {
      if (!isMobile) {
        showControls()
      }
    }

    const handleTouchStart = () => {
      if (isMobile) {
        showControls()
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchstart', handleTouchStart)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouchStart)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [isPlaying])

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const current = videoRef.current.currentTime
    const duration = videoRef.current.duration
    setProgress((current / duration) * 100)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return
    const newTime = (Number(e.target.value) / 100) * videoRef.current.duration
    videoRef.current.currentTime = newTime
  }

  return (
    <>
      <RoundedFont />
      <StyledMyReview>
        <div className="player-container">
          <video
            ref={videoRef}
            src={movieUrl}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            className="video-element"
            preload="metadata"
          />

          <div style={{ display: hideButton ? 'none' : 'block' }}>
            <div className="top-buttons">
              <div className="btn-go-list" onClick={onClickBack}>
                <img src={imgBtnExitReview} alt="" draggable="false" />
              </div>
              <div
                className="btn-go-total-score"
                onClick={() => setShowTotalScore(true)}
              >
                <img src={imgBtnGoTotalScore} alt="" draggable="false" />
              </div>
            </div>

            <div className="controls">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="progress-bar"
              />

              <div className="buttons">
                <button onClick={toggleMute} className="btn-mute">
                  {isMuted ? (
                    <img src={imgBtnVolumeOff} draggable="false" width={50} />
                  ) : (
                    <img src={imgBtnVolumeOn} draggable="false" width={50} />
                  )}
                </button>

                <button onClick={togglePlay} className="btn-play">
                  {isPlaying ? (
                    <img
                      src={imgBtnPause}
                      alt=""
                      draggable="false"
                      width={60}
                    />
                  ) : (
                    <img
                      src={imgBtnPlayMovie}
                      alt=""
                      draggable="false"
                      width={60}
                    />
                  )}
                </button>

                <button
                  className="btn-caption"
                  onClick={() => {
                    showCaption ? setShowCaption(false) : setShowCaption(true)
                  }}
                >
                  <img src={resCaption} alt="" draggable="false" width={40} />
                  <span>{showCaption ? 'On' : 'Off'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {showTotalScore && (
          <ModalTotalScore
            dubDate="2025-05-30"
            level="KA"
            playTime="00:30"
            totalScore="50"
            dubTime="00:30"
            dubSentence={30}
            dubWords={10}
            checkIsReview={true}
            thumbnail="src/assets/images/thumbnail/level_a/70100002.jpg"
            onClickClose={() => {
              setShowTotalScore(false)
            }}
          />
        )}
      </StyledMyReview>
    </>
  )
}

// ========== Styled Components ==========

const StyledMyReview = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .player-container {
    background-color: #000;
    overflow: hidden;
    position: relative;
  }

  .video-element {
    width: 100%;
    display: block;
  }

  .top-buttons {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 60px;

    .btn-go-list,
    .btn-go-total-score {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 37px;
      width: 60px;
      height: 60px;

      img {
        display: block;
        width: 54px;
        height: 54px;
      }
    }

    .btn-go-list {
      left: 37px;
    }
    .btn-go-total-score {
      right: 37px;
    }
  }

  .progress-bar,
  .volume-bar {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 100px;
    outline: none;
  }

  .controls {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
    padding: 37px;
    padding-top: 10px;
    padding-bottom: 15px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: calc(100% - 74px);
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .progress-bar,
  .volume-bar {
    width: 100%;
    border-radius: 100px;
    background-color: transparent;

    &::-webkit-slider-runnable-track {
      height: 10px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 100px;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      margin-top: -10px;
      width: 30px;
      height: 30px;
      background: #ffffff;
      border-radius: 100px;
      cursor: pointer;
      border: none;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
    }
  }

  .buttons {
    display: grid;
    grid-template-columns: 150px 1fr 150px;
    align-items: center;
    justify-items: center;

    .btn-mute,
    .btn-play,
    .btn-caption {
      border: none;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-mute {
      margin-left: 5px;
      margin-right: auto;
    }

    .btn-caption {
      display: flex;
      align-items: center;
      justify-content: end;
      width: fit-content;
      margin-left: auto;
      gap: 10px;

      span {
        width: 50px;
        text-align: start;
        font-size: 1.5em;
        color: #ffffff;
      }
    }
  }

  button {
    cursor: pointer;
    width: fit-content;
    padding: 0;
    border: none;
    background: transparent;
    font-family: 'SDGdGulim', sans-serif;
  }

  .volume-bar {
    width: 100px;
    height: 4px;
    border-radius: 100px;
    appearance: none;
  }
`
