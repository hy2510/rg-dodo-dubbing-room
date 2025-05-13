import { useEffect, useState } from 'react'

import { bgMain } from '@utils/Assets'

import tempVideo from '@assets/movies/70101001.mp4'

import { useSounds } from '@hooks/useSounds'

import { MainView, MainSubView } from 'src/App'

import { WrapperHome } from '@components/main/WrapperHome'

import Launcher from '@components/main/Launcher'
import Intro from '@pages/Intro'

import FrameBody from '@components/FrameBody'
import ContentsList from '@pages/ContentsList'
import ModalGuide from '@components/modals/ModalGuide'

type MainContainerProps = {
  isScreenLock: boolean
  viewRocket: boolean
  mainSubView: MainSubView
  changeViewRocket: (state: boolean) => void
  changeMainView: (view: MainView) => void
  changeMainSubView: (view: MainSubView) => void
}

export default function MainContainer({
  isScreenLock,
  viewRocket,
  mainSubView,
  changeViewRocket,
  changeMainView,
  changeMainSubView,
}: MainContainerProps) {
  const [bgImageUrl, setBgImageUrl] = useState('')
  const [bgEffectSwitch, setBgEffectSwitch] = useState(false)
  const [popOut, setPopOut] = useState(false)
  const [viewGuideModal, setViewGuideModal] = useState(false)

  useEffect(() => {
    // playSound(refs.bgMusicRef, 0, 0.3)
    // playSound(refs.showUpSoundRef)

    if (isScreenLock || viewRocket) {
      setBgImageUrl('')
    } else {
      setBgImageUrl(bgMain)
    }
  }, [viewRocket])

  const {
    refs,
    playSound,
    toggleBgMusic,
    renderAudioElements,
    // renderLoadingScreen,
    // isReady,
  } = useSounds()

  /**
   * 로켓 작동 함수
   */
  const handleRocketClick = () => {
    playSound(refs.launchSoundRef)

    setTimeout(() => {
      setPopOut(true)

      setTimeout(() => {
        changeViewRocket(false)
        setBgEffectSwitch(true)
        setPopOut(false)
        changeMainSubView('intro')
      }, 1000)
    }, 500)
  }

  let component

  switch (mainSubView) {
    case 'intro':
      component = (
        <Intro
          playSound={playSound}
          menuTapSoundRef={refs.menuTapSoundRef}
          onGuideClick={() => {
            setViewGuideModal(true)
            toggleBgMusic()
          }}
          onStartClick={() => {
            changeMainSubView('contentsList')
          }}
          onMyMovieClick={() => {
            console.log('My Movies 클릭 시 화면 실행')
          }}
        />
      )
      break
    case 'contentsList':
      component = (
        <ContentsList
          changeMainView={changeMainView}
          onClick={() => {
            playSound(refs.menuTapSoundRef, 0.25, 0.8)
            changeMainSubView('intro')
          }}
        />
      )
      break

    default:
      component = (
        <Launcher
          viewRocket={viewRocket}
          popOut={popOut}
          onRocketClick={handleRocketClick}
        />
      )
  }

  return (
    <>
      {renderAudioElements()}
      <FrameBody
        viewStarfield
        bgImage={bgImageUrl}
        activeFadeIn={bgEffectSwitch}
      >
        <WrapperHome className={popOut ? 'screen-transition' : ''}>
          {component}
        </WrapperHome>

        {viewGuideModal && (
          <ModalGuide
            videoUrl={tempVideo}
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
