import styled from 'styled-components'

import { resRocketGo, resRocketStop } from '@utils/Assets'

import BtnBoom from '@components/BtnBoom'

type LauncherProps = {
  viewRocket: boolean
  popOut: boolean
  onRocketClick: () => void
}

export default function Launcher({
  viewRocket,
  popOut,
  onRocketClick,
}: LauncherProps) {
  const rocketImg = popOut ? resRocketGo : resRocketStop

  return (
    <StyledLauncherBox visible={viewRocket}>
      <BtnBoom bgColor="transparent" color="#fff" onClick={onRocketClick}>
        <img src={rocketImg} width={815} alt="rocket" />
      </BtnBoom>
    </StyledLauncherBox>
  )
}

// ========== Styled Components ==========

const scaleX = (window.innerWidth / 1280) * 5
const scaleY = (window.innerHeight / 720) * 5
const targetScale = Math.max(scaleX, scaleY)

const StyledLauncherBox = styled.div<{ visible: boolean }>`
  position: absolute;
  inset: 0;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  .pop-out {
    animation: popOut 1s forwards;
  }

  .rocket-shake {
    animation: vibrate 0.3s linear infinite both;
  }

  @keyframes popOut {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(${targetScale});
    }
  }

  @keyframes vibrate {
    0%,
    100% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
  }
`
