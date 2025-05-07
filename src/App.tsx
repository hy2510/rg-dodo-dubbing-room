import React, { Suspense } from 'react'

import AppContextProvider from '@contexts/AppContext'

// 스타일
import './stylesheets/App.scss'

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const AIStudioContainer = React.lazy(
    () => import('@pages/containers/AIStudioContainer'),
  )
  const Home = React.lazy(() => import('@pages/Home'))
  const Dubbing = React.lazy(() => import('@pages/Dubbing'))

  return (
    <AppContextProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    </AppContextProvider>
  )
}
