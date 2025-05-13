import { useState } from 'react'
import styled, { css } from 'styled-components'

import { resSpeakers, bgContentsArea, imgBtnSpeak } from '@utils/Assets'

import tempVideo from '@assets/movies/70101001.mp4'

import ModalSelectMode from '@components/modals/ModalSelectMode'
import { SpeakMode } from './containers/DubbingContainer'
import { StyledSpeechBubble } from '@components/dubbing/SpeechBubble'

type RehearsalProps = {
  selectSpeakMode: (mode: SpeakMode) => void
}

export default function Rehearsal({ selectSpeakMode }: RehearsalProps) {
  const [viewSelectMode, setViewSelectMode] = useState<boolean>(false)

  return (
    <>
      <StyledDubRehearsal>
        <div className="row-1st">
          <div className="col-left">
            <video src={tempVideo} playsInline autoPlay loop controls />
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
                    draggable="false"
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
          selectSpeakMode={selectSpeakMode}
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
  background: url(${resSpeakers}) center bottom 50px / 80% no-repeat,
    url(${bgContentsArea}) center / 100% no-repeat;
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
      background: url(${imgBtnSpeak}) center / 100% no-repeat;
    }
  }
`
