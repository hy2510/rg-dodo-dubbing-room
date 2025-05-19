import { useSoundsContext } from '@contexts/SoundsContext'

import { useEffect, useState } from 'react'

import { bgMain } from '@utils/Assets'

import tempVideo from '@assets/movies/70101001.mp4'

import { MainView, MainSubView } from 'src/App'

import { WrapperHome } from '@components/main/WrapperHome'

import Launcher from '@components/main/Launcher'
import Intro from '@pages/Intro'

import FrameBody from '@components/FrameBody'
import ContentsList from '@pages/ContentsList'
import ModalGuide from '@components/modals/ModalGuide'
import MyMovies from '@pages/MyMovies'

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

  const { isBgmMute, setIsBgmMute, playSound, stopSound, toggleBgMusic, refs } =
    useSoundsContext()

  useEffect(() => {
    if (isScreenLock || viewRocket) {
      setBgImageUrl('')
    } else {
      setBgImageUrl(bgMain)
    }
  }, [viewRocket, isScreenLock])

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
        playSound(refs.hiThereVoiceRef)
      }, 2300)
    }, 500)
  }

  let component

  switch (mainSubView) {
    case 'intro':
      component = (
        <Intro
          onBgmMuteClick={() => {
            if (isBgmMute) {
              setIsBgmMute(false)
              playSound(refs.bgMusicRef, 0, 0.3)
            } else {
              setIsBgmMute(true)
              stopSound(refs.bgMusicRef)
            }
          }}
          onGuideClick={() => {
            setViewGuideModal(true)
            if (!isBgmMute) {
              setIsBgmMute(false)
              toggleBgMusic()
            }
          }}
          onStartClick={() => {
            changeMainSubView('contentsList')
          }}
          onMyMovieClick={() => {
            changeMainSubView('myMovies')
          }}
        />
      )
      break

    case 'myMovies':
      component = (
        <MyMovies
          changeMainView={changeMainView}
          onClick={() => {
            playSound(refs.menuTapSoundRef, 0.25, 0.8)
            changeMainSubView('intro')
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
    <FrameBody viewStarfield bgImage={bgImageUrl} activeFadeIn={bgEffectSwitch}>
      <WrapperHome>{component}</WrapperHome>

      {viewGuideModal && (
        <ModalGuide
          videoUrl={tempVideo}
          onClickClose={() => {
            playSound(refs.closeTapSoundRef)
            setTimeout(() => {
              setViewGuideModal(false)
              !isBgmMute && toggleBgMusic()
            }, 500)
          }}
        />
      )}
    </FrameBody>
  )
}
