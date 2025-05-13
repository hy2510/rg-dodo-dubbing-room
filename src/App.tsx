import { SoundsProvider } from '@contexts/SoundsContext'
import { Suspense, useState } from 'react'
import AppContextProvider from '@contexts/AppContext'

import ScreenBlock from '@pages/ScreenBlock'
import MainContainer from '@pages/containers/MainContainer'
import DubbingContainer from '@pages/containers/DubbingContainer'

// 스타일
import './stylesheets/App.scss'

export type MainView = 'main' | 'dubbing' | 'review'
export type MainSubView = 'launcher' | 'intro' | 'contentsList' | 'myMovies'

export default function App() {
  const [isScreenLock, setIsScreenLock] = useState(true)
  const [viewRocket, setViewRocket] = useState(false)

  const [mainView, setMainView] = useState<MainView>('main')
  const [mainSubView, setMainSubView] = useState<MainSubView>('launcher')

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

  /**
   * 스크린 제거
   */
  const removeScreenBlock = () => {
    enterFullscreen()

    setIsScreenLock(false)
    setViewRocket(true)
  }

  /**
   * 메인 화면 설정 - 메인 / 더빙
   * @param view
   */
  const changeMainView = (view: MainView) => {
    setMainView(view)
  }

  /**
   * 메인 화면의 서브 화면 설정 - 인트로 / 리스트 / 마이룸
   * @param view
   */
  const changeMainSubView = (view: MainSubView) => {
    setMainSubView(view)
  }

  /**
   * 더빙 화면의 서브 화면 설정 - 리허설 / 더빙
   * @param state
   */
  const changeViewRocket = (state: boolean) => {
    setViewRocket(state)
  }

  return (
    <AppContextProvider>
      <SoundsProvider>
        <Suspense fallback={<div>Loading...</div>}>
          {isScreenLock && <ScreenBlock onClick={removeScreenBlock} />}

          {mainView === 'main' ? (
            <MainContainer
              isScreenLock={isScreenLock}
              viewRocket={viewRocket}
              mainSubView={mainSubView}
              changeViewRocket={changeViewRocket}
              changeMainView={changeMainView}
              changeMainSubView={changeMainSubView}
            />
          ) : (
            <DubbingContainer changeMainView={changeMainView} />
          )}
        </Suspense>
      </SoundsProvider>
    </AppContextProvider>
  )
}
