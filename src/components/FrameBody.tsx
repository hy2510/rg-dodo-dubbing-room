import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import 'animate.css'
import { StarField } from '@kevzzsk/react-star-field-canvas'

const BASE_WIDTH = 1280
const BASE_HEIGHT = 720

type FrameBodyProps = {
  children?: React.ReactNode
  bgImage?: string
  bgColor?: string
  viewStarfield?: boolean
  activeFadeIn?: boolean
}

export default function FrameBody({
  children,
  bgImage,
  bgColor,
  viewStarfield,
  activeFadeIn,
}: FrameBodyProps) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / BASE_WIDTH
      const scaleY = window.innerHeight / BASE_HEIGHT
      setScale(
        window.innerWidth / window.innerHeight >= BASE_WIDTH / BASE_HEIGHT
          ? scaleY
          : scaleX,
      )
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <StyledFrameBody>
      <StyledContainer bgImage={bgImage} scale={scale} bgColor={bgColor}>
        <div
          className={`container animate__animated ${
            activeFadeIn ? 'animate__fadeIn' : ''
          }`}
        >
          {children}
        </div>
        {viewStarfield && (
          <StarField
            numStars={800}
            minSpeed={3}
            maxSpeed={10}
            pauseOnBlur={false}
            className="star-field"
          />
        )}
        <div className="star-field-bg" />
      </StyledContainer>
    </StyledFrameBody>
  )
}

// ========== Styled Components ==========

type StyledContainerProps = {
  scale: number
  bgImage?: string
  bgColor?: string
}

const StyledFrameBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledContainer = styled.div<StyledContainerProps>`
  width: ${BASE_WIDTH}px;
  height: ${BASE_HEIGHT}px;
  transform: scale(${(props) => props.scale});
  transform-origin: center;
  position: relative;
  overflow: hidden;

  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${(props) => props.bgImage});
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 2;
    opacity: 0.9;
  }

  .star-field {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  .star-field-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${(props) =>
      props.bgColor
        ? props.bgColor
        : 'linear-gradient(180deg, #27179e 0%, #255fec 58.65%)'};
    z-index: 0;
  }
`
