import { useSoundsContext } from '@contexts/SoundsContext'
import styled from 'styled-components'

type ScreenBlockProps = {
  onClick: () => void
}

export default function ScreenBlock({ onClick }: ScreenBlockProps) {
  const { playSound, refs } = useSoundsContext()

  const handleClick = () => {
    playSound(refs.bgMusicRef, 0, 0.3)
    playSound(refs.showUpSoundRef)
    onClick()
  }

  return <StyledScreenBlock onClick={handleClick} />
}

const StyledScreenBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  &::before {
    content: 'Ready? Tap to go!';
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }
`
