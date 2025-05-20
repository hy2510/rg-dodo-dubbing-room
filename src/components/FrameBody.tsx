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
    <OuterWrapper>
      <ScaledContainer scale={scale} bgColor={bgColor}>
        <BackgroundLayer />
        {viewStarfield && <StyledStarField {...starFieldOptions} />}
        <ContentLayer
          className={`animate__animated ${
            activeFadeIn ? 'animate__fadeIn' : ''
          }`}
          $bgImage={bgImage}
        >
          {children}
        </ContentLayer>
      </ScaledContainer>
    </OuterWrapper>
  )
}

// ====== StarField Options ======
const starFieldOptions = {
  numStars: 1500,
  minSpeed: 3,
  maxSpeed: 5,
  trails: true,
  pauseOnBlur: false,
}

// ====== Styled Components ======

const OuterWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ScaledContainer = styled.div<{ scale: number; bgColor?: string }>`
  position: relative;
  width: ${BASE_WIDTH}px;
  height: ${BASE_HEIGHT}px;
  transform: scale(${(props) => props.scale});
  transform-origin: center;
  overflow: hidden;

  background: ${(props) =>
    props.bgColor ?? 'linear-gradient(180deg, #27179e 0%, #255fec 58.65%)'};
`

const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`

const StyledStarField = styled(StarField)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const ContentLayer = styled.div<{ $bgImage?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0.9;
  background-image: ${(props) =>
    props.$bgImage ? `url(${props.$bgImage})` : 'none'};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`
