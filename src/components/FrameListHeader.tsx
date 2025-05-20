import styled from 'styled-components'
import 'animate.css'

import {
  resContentsListHeaderLine,
  iconPointMark,
  resSingDodo,
  resSingDodoAni,
  resWatchDodoAni,
} from '@utils/Assets'
import { RoundedFont } from '@stylesheets/GlobalStyle'

import BtnBackTitle from '@components/BtnBackTitle'

type FrameListHeaderProps = {
  theme?: 'content' | 'movie'
  title?: string
  point?: number
  onClickBack?: () => void
}

export default function FrameListHeader({
  theme,
  title,
  point,
  onClickBack,
}: FrameListHeaderProps) {
  return (
    <StyledListHeader>
      <RoundedFont />
      <StyledPointsDisplay>{point ? point : 0}</StyledPointsDisplay>
      <BtnBackTitle title={title} onClick={onClickBack} />
      <StyledDodoSing>
        {theme === 'content' ? (
          <object data={resSingDodoAni} type="image/svg+xml" width="100%" />
        ) : (
          <object data={resWatchDodoAni} type="image/svg+xml" width="100%" />
        )}
      </StyledDodoSing>
    </StyledListHeader>
  )
}

// ========== Styled Components ==========

const StyledListHeader = styled.div`
  height: 190px;
  position: sticky;
  top: -1px;
  z-index: 1;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-image: url(${resContentsListHeaderLine});
    background-position: center;
    background-size: contain;
    z-index: 2;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #27179e 0%, #255fec 58.65%);
    z-index: 0;
  }
`

const StyledPointsDisplay = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 3;
  height: 40px;
  background-color: #002281;
  border: 3px solid #6893fa;
  border-radius: 999px;
  padding: 0 30px 0 60px;
  display: flex;
  align-items: center;
  color: #ffffff;
  &::after {
    position: absolute;
    top: -4px;
    left: -4px;
    z-index: 4;
    content: '';
    width: 50px;
    height: 50px;
    background-image: url(${iconPointMark});
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
`

const StyledDodoSing = styled.div`
  position: absolute;
  right: 122px;
  bottom: -10px;
  width: 418.74px;
  height: 196.02px;
  background-size: 100%;
  background-repeat: no-repeat;
  z-index: 1;
`
