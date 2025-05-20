import { useEffect, useState } from 'react'
import { useSoundContext } from '@contexts/SoundContext'

import { ScreenBlock } from '@pages/ScreenBlock'
import MainContainer from '@pages/containers/MainContainer'
import DubbingContainer from '@pages/containers/DubbingContainer'

export type MainView = 'main' | 'dubbing' | 'review'
export type MainSubView = 'launcher' | 'intro' | 'contentsList' | 'myMovies'

export default function WrapperContainer() {
  const { playSound, audioList } = useSoundContext()

  const [isScreenLock, setIsScreenLock] = useState(true)
  const [viewRocket, setViewRocket] = useState(false)

  const [mainView, setMainView] = useState<MainView>('main')
  const [mainSubView, setMainSubView] = useState<MainSubView>('launcher')

  // 최초 진입 음원 재생
  const introSounds = () => {
    if (!isScreenLock && mainView === 'main') {
      if (mainSubView === 'launcher') {
        playSound(audioList.showUpSound)
      } else if (mainSubView === 'intro') {
        playSound(audioList.hiThereVoice)
      }
    }
  }

  // 뷰 변경 음원 재생
  const initialSound = () => {
    if (mainView === 'main' && !isScreenLock) {
      playSound(audioList.bgMusic, 0, 0.3)
      playSound(audioList.showUpSound)
    }
  }

  // 최초 화면 진입 시
  useEffect(() => {
    initialSound()
  }, [viewRocket, isScreenLock])

  // 뷰 변경 시 효과음
  useEffect(() => {
    introSounds()
  }, [mainView, mainSubView])

  /**
   * 전체 화면
   */
  const enterFullscreen = () => {
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

  /**
   * 화면 잠금 해제
   */
  const removeScreenBlock = () => {
    // enterFullscreen()
    setIsScreenLock(false)
    setViewRocket(true)
  }

  /**
   * 뷰 전환 핸들러
   */
  const changeMainView = (view: MainView) => setMainView(view)
  const changeMainSubView = (view: MainSubView) => setMainSubView(view)
  const changeViewRocket = (state: boolean) => setViewRocket(state)

  const renderView = () => {
    if (mainView === 'main') {
      return (
        <MainContainer
          isScreenLock={isScreenLock}
          viewRocket={viewRocket}
          mainSubView={mainSubView}
          changeMainView={changeMainView}
          changeMainSubView={changeMainSubView}
          changeViewRocket={changeViewRocket}
        />
      )
    }

    return <DubbingContainer changeMainView={changeMainView} />
  }

  return (
    <>
      {isScreenLock && <ScreenBlock onClick={removeScreenBlock} />}
      {renderView()}
    </>
  )
}
