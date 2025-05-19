import { useEffect, useState } from 'react'

import { MainView } from 'src/App'

import Rehearsal from '@pages/Rehearsal'
import FrameBody from '@components/FrameBody'
import BtnBackTitle from '@components/BtnBackTitle'
import Dubbing from '@pages/Dubbing'
import { useSoundsContext } from '@contexts/SoundsContext'

type DubbingContainerProps = {
  changeMainView: (view: MainView) => void
}

export type DubbingViewProps = 'rehearsal' | 'speak'
export type SpeakMode = 'single' | 'full'

export default function DubbingContainer({
  changeMainView,
}: DubbingContainerProps) {
  const [dubbingView, setDubbingView] = useState<DubbingViewProps>('rehearsal')
  const [speakMode, setSpeakMode] = useState<SpeakMode>('single')
  const { isBgmMute, playSound, refs, toggleBgMusic } = useSoundsContext()

  useEffect(() => {}, [dubbingView])

  const selectSpeakMode = (mode: SpeakMode) => {
    setSpeakMode(mode)
    setDubbingView('speak')
  }

  let component

  switch (dubbingView) {
    case 'rehearsal':
      component = <Rehearsal selectSpeakMode={selectSpeakMode} />
      break
    case 'speak':
      component = <Dubbing mode={speakMode} />
      break
  }

  return (
    <FrameBody bgColor="#3B75FF">
      <BtnBackTitle
        title="Alligator's Apples"
        onClick={() => {
          changeMainView('main')
          playSound(refs.menuTapSoundRef, 0.25, 0.8)
          !isBgmMute && toggleBgMusic()
        }}
      />

      {component}
    </FrameBody>
  )
}
