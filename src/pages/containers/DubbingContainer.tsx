import { useCallback, useState } from 'react'
import { useSoundContext } from '@contexts/SoundContext'

import { MainView } from '@pages/containers/WrapperContainer'

import Rehearsal from '@pages/Rehearsal'
import Dubbing from '@pages/Dubbing'

import FrameBody from '@components/FrameBody'
import BtnBackTitle from '@components/BtnBackTitle'

type DubbingContainerProps = {
  changeMainView: (view: MainView) => void
}

export type DubbingView = 'rehearsal' | 'speak'
export type SpeakMode = 'single' | 'full'

const timeStampArr = [
  { text: 'Hey, guys!', cls: 'highlight', start: '00:00.5', end: '00:02.8' },
  {
    text: "Hello! What's your name?",
    cls: 'hold',
    start: '00:04.2',
    end: '00:07.1',
  },
  { text: 'My name is Leoni.', cls: '', start: '00:08.2', end: '00:10.3' },
]

export default function DubbingContainer({
  changeMainView,
}: DubbingContainerProps) {
  const { isBgmMute, audioList, resumeSound } = useSoundContext()

  const [view, setView] = useState<DubbingView>('rehearsal')
  const [mode, setMode] = useState<SpeakMode>('single')

  /**
   * 버튼 클릭 - 뒤로 가기
   */
  const handleBackToMain = () => {
    if (!isBgmMute) resumeSound(audioList.bgMusic)
    changeMainView('main')
  }

  /**
   * 버튼 클릭 - Let's Speak
   * single / full 선택용
   * @param selected single / full
   */
  const handleSelectMode = (selected: SpeakMode) => {
    setMode(selected)
    setView('speak')
  }

  const renderView = () => {
    switch (view) {
      case 'rehearsal':
        return (
          <Rehearsal
            timeStampArr={timeStampArr}
            selectSpeakMode={handleSelectMode}
          />
        )
      case 'speak':
        return <Dubbing mode={mode} timeStampArr={timeStampArr} />
    }
  }

  return (
    <FrameBody bgColor="#3B75FF">
      <BtnBackTitle title="Alligator's Apples" onClick={handleBackToMain} />
      {renderView()}
    </FrameBody>
  )
}
