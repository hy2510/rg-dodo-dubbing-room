import { createGlobalStyle } from 'styled-components'

const RoundedFont = createGlobalStyle`
  @font-face {
    font-family: 'SDGdGulim';
    src: url('src/assets/fonts/SDGdGulimTTF.ttf') format('truetype');
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
