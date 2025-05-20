import { useEffect, useMemo, useState } from 'react'
import { useSoundContext } from '@contexts/SoundContext'

import { bgMain } from '@utils/Assets'
import tempVideo from '@assets/movies/70101001.mp4'

import { MainSubView, MainView } from '@pages/containers/WrapperContainer'

import { WrapperHome } from '@components/main/WrapperHome'
import FrameBody from '@components/FrameBody'
import Launcher from '@components/main/Launcher'

import Intro from '@pages/Intro'
import ContentsList from '@pages/ContentsList'
import MyMovies from '@pages/MyMovies'

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
  const {
    isBgmMute,
    audioList,
    playSound,
    pauseSound,
    resumeSound,
    stopSound,
  } = useSoundContext()

  const [bgImageUrl, setBgImageUrl] = useState('')
  const [bgEffectSwitch, setBgEffectSwitch] = useState(false)
  const [popOut, setPopOut] = useState(false)
  const [viewGuideModal, setViewGuideModal] = useState(false)

  // 공통 효과음
  const playTapSound = () => {
    playSound(audioList.menuTapSound, 0.25, 0.8)
  }

  // 배경 이미지 상태 업데이트
  useEffect(() => {
    setBgImageUrl(isScreenLock || viewRocket ? '' : bgMain)
  }, [isScreenLock, viewRocket])

  // 로켓 이펙트
  const handleRocketClick = () => {
    playSound(audioList.launchSound)

    setTimeout(() => {
      setPopOut(true)

      setTimeout(() => {
        setPopOut(false)
        changeViewRocket(false)
        setBgEffectSwitch(true)
        changeMainSubView('intro')
      }, 1000)
    }, 500)
  }

  /**
   * 버튼 클릭 - Guide
   */
  const handleGuideOpen = () => {
    if (!isBgmMute) pauseSound(audioList.bgMusic)

    stopSound(audioList.hiThereVoice)
    playTapSound()

    setViewGuideModal(true)
  }

  /**
   * 버튼 클릭 - 가이드 닫기
   */
  const handleCloseGuide = () => {
    playSound(audioList.closeTapSound)

    setTimeout(() => {
      setViewGuideModal(false)

      if (!isBgmMute) resumeSound(audioList.bgMusic)
    }, 300)
  }

  /**
   *  버튼 클릭 - Start
   */
  const handleStart = () => {
    playTapSound()
    stopSound(audioList.hiThereVoice)

    changeMainSubView('contentsList')
  }

  /**
   * 버튼 클릭 - My Movies
   */
  const handleMyMovie = () => {
    playTapSound()
    stopSound(audioList.hiThereVoice)

    changeMainSubView('myMovies')
  }

  /**
   * 버튼 클릭 - 뒤로 가기
   */
  const handleBack = () => {
    playTapSound()

    changeMainSubView('intro')
  }

  const PageRouter = useMemo(() => {
    return {
      launcher: (
        <Launcher
          viewRocket={viewRocket}
          popOut={popOut}
          onRocketClick={handleRocketClick}
        />
      ),
      intro: (
        <Intro
          onClickGuide={handleGuideOpen}
          onClickStart={handleStart}
          onClickMyMovie={handleMyMovie}
        />
      ),
      contentsList: (
        <ContentsList
          changeMainView={changeMainView}
          onClickBack={handleBack}
        />
      ),
      myMovies: (
        <MyMovies changeMainView={changeMainView} onClickBack={handleBack} />
      ),
    } satisfies Record<MainSubView, JSX.Element>
  }, [
    viewRocket,
    popOut,
    isBgmMute,
    audioList,
    changeMainView,
    changeMainSubView,
  ])

  return (
    <FrameBody viewStarfield bgImage={bgImageUrl} activeFadeIn={bgEffectSwitch}>
      <WrapperHome className={popOut ? 'screen-transition' : ''}>
        {PageRouter[mainSubView]}
      </WrapperHome>

      {viewGuideModal && (
        <ModalGuide videoUrl={tempVideo} onClickClose={handleCloseGuide} />
      )}
    </FrameBody>
  )
}
