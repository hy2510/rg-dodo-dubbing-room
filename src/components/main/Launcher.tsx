import styled from 'styled-components'

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
  return (
    <StyledLauncherBox>
      <div
        className={
          viewRocket ? 'animate__animated animate__fadeInUpBig' : 'd-none'
        }
      >
        <BtnBoom
          bgColor="transparent"
          color="#fff"
          className={popOut ? 'pop-out' : 'res-rocket-ani'}
          onClick={onRocketClick}
        >
          <img
            src="src/assets/images/home/res-flying_rocket.svg"
            alt=""
            width={250}
          />
        </BtnBoom>
      </div>
    </StyledLauncherBox>
  )
}

// ========== Styled Components ==========

const scaleX = (window.innerWidth / 1280) * 5
const scaleY = (window.innerHeight / 720) * 5
const targetScale = Math.max(scaleX, scaleY)

const StyledLauncherBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
  padding-top: 165px;

  &.screen-transition {
    background: linear-gradient(180deg, #27179e 0%, #255fec 58.65%);
  }

  .d-none {
    display: none;
  }

  .pop-out {
    animation: popOut 1s forwards;
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
  .res-rocket-ani {
    animation: vibrate 0.3s linear infinite both;
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
