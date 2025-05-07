import ModalSelectMode from '@components/ModalSelectMode'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'

export default function DubRehearsal() {
  const [viewSelectMode, setViewSelectMode] = useState<boolean>(false)

  return (
    <>
      <StyledDubRehearsal>
        <div className="row-1st">
          <div className="col-left">
            <video
              src="src/assets/movies/70101001.mp4"
              playsInline
              autoPlay
              loop
              controls
            />
          </div>
          <div className="col-right">
            {[
              {
                cls: 'highlight',
                text: 'Gino how is the weather?',
                imgSrc: 'aistudio_character_gino1',
              },
              {
                cls: 'hold',
                text: 'Nice to meet you.',
                imgSrc: 'aistudio_character_dodo1',
              },
              {
                cls: '',
                text: "Hi I'm Baro1",
                imgSrc: 'aistudio_character_baro1',
              },
              {
                cls: '',
                text: "Hi I'm Chello",
                imgSrc: 'aistudio_character_chello1',
              },
              {
                cls: '',
                text: "Hi I'm Baro2",
                imgSrc: 'aistudio_character_baro2',
              },
              {
                cls: '',
                text: "Hi I'm Millo",
                imgSrc: 'aistudio_character_millo1',
              },
            ].map(({ cls, text, imgSrc }, idx) => (
              // cls는 현재 읽고 있는 문장과 읽지 않아도 되는 상태를 나타내는 부분이므로 클래스명만 참고하시오.
              <StyledSpeechBubble key={idx} className={cls}>
                <div className="character">
                  <img
                    src={`src/assets/images/character/${imgSrc}.png`}
                    alt=""
                  />
                </div>
                <div className="text-box">{text}</div>
              </StyledSpeechBubble>
            ))}
          </div>
        </div>
        <div className="row-2nd">
          <div
            className="btn-start"
            onClick={() => {
              setViewSelectMode(true)
            }}
          >
            Let's Speak
          </div>
        </div>
      </StyledDubRehearsal>

      {/* 모드 선택 모달 */}
      {viewSelectMode && (
        <ModalSelectMode
          onClickClose={() => {
            setViewSelectMode(false)
          }}
        />
      )}
    </>
  )
}

// ========== Styled Components ==========

const tapHighlightNone = css`
  -webkit-tap-highlight-color: transparent;
  outline: none;
`

const activeEffect = css`
  &:active {
    transform: scale(0.95);
    opacity: 0.9;
  }
`

const StyledDubRehearsal = styled.div`
  width: calc(100% - 160px);
  height: calc(100% - 180px);
  margin-top: 100px;
  padding: 80px 80px 0;
  background: url('src/assets/images/dubbing/res-speakers.png') center bottom
      50px / 80% no-repeat,
    url('src/assets/images/dubbing/bg-contents_area.png') center / 100%
      no-repeat;
  background-color: #1750da;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 48px;

  .row-1st {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 50px;

    .col-left video {
      width: 100%;
      border: 10px solid #002f9f;
      border-radius: 20px;
    }

    .col-right {
      display: flex;
      flex-direction: column;
      gap: 10px;
      height: 320px;
      padding-bottom: 40px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 999px;
      }
    }
  }

  .row-2nd {
    display: flex;
    justify-content: center;

    .btn-start {
      ${tapHighlightNone}
      ${activeEffect}
      cursor: pointer;
      width: 300px;
      height: 110px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4em;
      color: #fff;
      background: url('src/assets/images/dubbing/btn-start_button.png') center /
        100% no-repeat;
    }
  }
`

const StyledSpeechBubble = styled.div`
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
      background: url('src/assets/images/dubbing/res-bubble_tail_ready.svg')
        center / 100% no-repeat;
    }
  }

  &.highlight {
    .character,
    .text-box {
      border: 3px solid #ffdf00;
    }
    .text-box {
      &::after {
        background-image: url('src/assets/images/dubbing/res-bubble_tail_highlight.svg');
      }
    }
  }

  &.hold {
    .text-box {
      background-color: #314c98;
      color: rgba(255, 255, 255, 0.5);
      &::after {
        background-image: url('src/assets/images/dubbing/res-bubble_tail_hold.svg');
      }
    }
  }
`
