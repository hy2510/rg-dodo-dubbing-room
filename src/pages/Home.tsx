import { useState } from 'react'
import { useSounds } from '@hooks/useSounds'
import styled from 'styled-components'
import FrameBody from '@components/FrameBody'
import Launcehr from './containers/Launcher'
import Intro from './containers/Intro'
import DubContentsList from './containers/DubContentsList'
import ModalGuide from '@components/ModalGuide'

export default function Home() {
  const [isScreenLock, setIsScreenLock] = useState(true)
  const [bgImageUrl, setBgImageUrl] = useState('')
  const [bgEffectSwitch, setBgEffectSwitch] = useState(false)
  const [showBtnBoom, setShowBtnBoom] = useState(true)
  const [popOut, setPopOut] = useState(false)
  const [viewRocket, setViewRocket] = useState(false)
  const [viewGuideModal, setViewGuideModal] = useState(false)
  const [viewContainer, setViewContainer] = useState<
    'intro' | 'contentsList' | 'myMovies'
  >('intro')

  const {
    refs,
    playSound,
    toggleBgMusic,
    renderAudioElements,
    // renderLoadingScreen,
    // isReady,
  } = useSounds()

  const enterFullscreen = (): void => {
    const elem = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>
      msRequestFullscreen?: () => void
    }
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(console.error)
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    }
  }

  const handleScreenUnlock = () => {
    enterFullscreen()

    setIsScreenLock(false)
    setViewRocket(true)

    playSound(refs.bgMusicRef, 0, 0.3)
    playSound(refs.showUpSoundRef)
  }

  const handleRocketClick = () => {
    playSound(refs.launchSoundRef)

    setTimeout(() => {
      setPopOut(true)
      setTimeout(() => {
        setBgImageUrl('src/assets/images/home/bg-main.png')
        setBgEffectSwitch(true)
        setShowBtnBoom(false)
        setPopOut(false)
        setTimeout(() => {
          playSound(refs.hiThereVoiceRef)
        }, 1000)
      }, 1000)
    }, 500)
  }

  return (
    <>
      {renderAudioElements()}
      {isScreenLock && <StyledScreenLock onClick={handleScreenUnlock} />}
      <FrameBody
        viewStarfield
        bgImage={bgImageUrl}
        activeFadeIn={bgEffectSwitch}
      >
        <StyledHome className={popOut ? 'screen-transition' : ''}>
          {showBtnBoom ? (
            <Launcehr
              viewRocket={viewRocket}
              popOut={popOut}
              onRocketClick={handleRocketClick}
            />
          ) : viewContainer === 'intro' ? (
            <Intro
              playSound={playSound}
              menuTapSoundRef={refs.menuTapSoundRef}
              onGuideClick={() => {
                setViewGuideModal(true)
                toggleBgMusic()
              }}
              onStartClick={() => {
                setViewContainer('contentsList')
              }}
              onMyMovieClick={() => {
                console.log('My Movies 클릭 시 화면 실행')
              }}
            />
          ) : (
            <DubContentsList
              onClick={() => {
                playSound(refs.menuTapSoundRef, 0.25, 0.8)
                setViewContainer('intro')
              }}
            />
          )}
        </StyledHome>

        {viewGuideModal && (
          <ModalGuide
            videoUrl="src/assets/movies/70101001.mp4"
            onClickClose={() => {
              playSound(refs.closeTapSoundRef)
              setTimeout(() => {
                setViewGuideModal(false)
                toggleBgMusic()
              }, 500)
            }}
          />
        )}
      </FrameBody>
    </>
  )
}

// ========== Styled Components ==========

const StyledScreenLock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  &::before {
    content: 'Ready? Tap to go!';
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }
`

const StyledHome = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &.screen-transition {
    background: linear-gradient(180deg, #27179e 0%, #255fec 58.65%);
  }
`
