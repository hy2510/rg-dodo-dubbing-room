import React, { Suspense } from 'react'

import AppContextProvider from '@contexts/AppContext'
import { SoundProvider } from '@contexts/SoundContext'

import './stylesheets/App.scss'

import Loading from '@components/Loading'

const WrapperContainer = React.lazy(
  () => import('@pages/containers/WrapperContainer'),
)

export default function App() {
  return (
    <AppContextProvider>
      <SoundProvider>
        <Suspense fallback={<Loading />}>
          <WrapperContainer />
        </Suspense>
      </SoundProvider>
    </AppContextProvider>
  )
}
