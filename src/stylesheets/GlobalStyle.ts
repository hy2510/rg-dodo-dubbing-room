import { createGlobalStyle } from 'styled-components'

// font
import SDGdGulimTTF from '@assets/fonts/SDGdGulimTTF.ttf'

const RoundedFont = createGlobalStyle`
  @font-face {
    font-family: 'SDGdGulim';
    src: url(${SDGdGulimTTF}) format('truetype');
    font-style: normal;
    font-weight: normal;
  }

  div {
    margin: 0;
    padding: 0;
    font-family: 'SDGdGulim', sans-serif;
  }
`

const TouchTransparent = createGlobalStyle`
  div {
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
`

export { RoundedFont, TouchTransparent }
