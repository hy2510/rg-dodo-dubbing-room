import React, { Suspense } from 'react'

import AppContextProvider from '@contexts/AppContext'

// 스타일
import './stylesheets/App.scss'

export default function App() {
  const AIStudioContainer = React.lazy(
    () => import('@pages/containers/AIStudioContainer'),
  )
  return (
    <AppContextProvider>
      <Suspense fallback={<div></div>}>
        <AIStudioContainer />
      </Suspense>
    </AppContextProvider>
  )
}
