import styled from 'styled-components'

import { imgBtnArrowRight } from '@utils/Assets'

import { RoundedFont } from '@stylesheets/GlobalStyle'

type BtnBackTitleProps = {
  title?: string
  onClick?: () => void
}

export default function BtnBackTitle({ title, onClick }: BtnBackTitleProps) {
  return (
    <StyledBtnBackTitle onClick={onClick}>
      <RoundedFont />
      {title}
    </StyledBtnBackTitle>
  )
}

// ========== Styled Components ==========

const StyledBtnBackTitle = styled.div`
  cursor: pointer;
  color: #ffffff;
  font-family: 'SDGdGulim', sans-serif;
  font-size: 1.4em;
  font-weight: 600;
  width: fit-content;
  min-width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  padding-left: calc(34px + 10px);
  background-image: url(${'"' + imgBtnArrowRight + '"'});
  background-size: auto 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 3;
`
