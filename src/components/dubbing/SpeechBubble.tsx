import styled from 'styled-components'

import {
  resBubbleTailReady,
  resBubbleTailHighlight,
  resBubbleTailHold,
} from '@utils/Assets'

export const StyledSpeechBubble = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .character {
    width: 60px;
    height: 60px;
    border-radius: 50%;

    img {
      width: 100%;
      display: block;
    }
  }

  .text-box {
    position: relative;
    flex: 1;
    padding: 8px 16px;
    border-radius: 999px;
    background-color: #3b75ff;
    color: #fff;
    font-size: 1.2em;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -8px;
      width: 19px;
      height: 14px;
      background: url(${resBubbleTailReady}) center / 100% no-repeat;
    }
  }

  &.highlight {
    .character,
    .text-box {
      border: 3px solid #ffdf00;
    }

    .text-box {
      &::after {
        background-image: url(${resBubbleTailHighlight});
      }
    }
  }

  &.hold {
    .text-box {
      background-color: #314c98;
      color: rgba(255, 255, 255, 0.5);

      &::after {
        background-image: url(${resBubbleTailHold});
      }
    }
  }
`
