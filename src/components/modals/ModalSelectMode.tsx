import { useState } from 'react'
import styled, { css } from 'styled-components'

import {
  bgModalSelect,
  imgBtnCloseModal,
  imgBtnCloseModalAct,
  imgBtnFullMode,
  imgBtnFullModeAction,
  imgBtnSingleMode,
  imgBtnSingleModeAction,
  resTxtSingleMode,
  resTxtFullMode,
} from '@utils/Assets'
import { SpeakMode } from '@pages/containers/DubbingContainer'

import { useSoundContext } from '@contexts/SoundContext'

type ModalSelectModeProps = {
  selectSpeakMode: (mode: SpeakMode) => void
  onClickClose?: () => void
}

export default function ModalSelectMode({
  selectSpeakMode,
  onClickClose,
}: ModalSelectModeProps) {
  const { audioList, playSound } = useSoundContext()

  const [singleAction, setSingleAction] = useState<string>(imgBtnSingleMode)
  const [fullAction, setFullAction] = useState(imgBtnFullMode)

  /**
   *
   */
  const handleClose = () => {
    onClickClose?.()
    playSound(audioList.closeTapSound)
  }

  /**
   * 녹음 모드 선택
   * @param mode
   */
  const handleSelectMode = (mode: 'single' | 'full') => {
    playSound(audioList.menuTapSound, 0.25, 0.8)

    if (mode === 'single') {
      setSingleAction(imgBtnSingleModeAction)
    } else {
      setFullAction(imgBtnFullModeAction)
    }

    setTimeout(() => {
      selectSpeakMode(mode)
    }, 1500)
  }

  return (
    <StyledModalSelectMode>
      <div className="modal-container">
        <div className="buttons">
          <StyledModeButton
            txtImage={resTxtSingleMode}
            image={singleAction}
            onClick={() => handleSelectMode('single')}
          />
          <StyledModeButton
            txtImage={resTxtFullMode}
            image={fullAction}
            onClick={() => handleSelectMode('full')}
          />
        </div>
        <StyledCloseButton onClick={handleClose} />
      </div>
    </StyledModalSelectMode>
  )
}

// ========== Styled Components ==========

const tapHighlightNone = css`
  -webkit-tap-highlight-color: transparent;
  outline: none;
`

const activeEffect = css`
  &:active {
    opacity: 0.9;
  }
`

const StyledModalSelectMode = styled.div`
  ${tapHighlightNone}
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  .modal-container {
    position: relative;
    width: 793px;
    height: 553px;
    background: url(${bgModalSelect}) center / 100% no-repeat;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 100px 40px;
    height: calc(100% - 160px);
  }
`

const StyledModeButton = styled.div<{ txtImage: string; image: string }>`
  ${tapHighlightNone}
  ${activeEffect}
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-image: ${({ txtImage, image }) =>
    `url('${txtImage}'), url('${image}')`};
  background-position: top 50px center, center;
  background-size: 180px, auto 100%;
  background-repeat: no-repeat;
`

const StyledCloseButton = styled.div`
  ${tapHighlightNone}
  cursor: pointer;
  position: absolute;
  top: 0;
  right: -10px;
  width: 70px;
  height: 70px;
  background: url(${imgBtnCloseModal}) center / 70px no-repeat;

  &:active {
    background-image: url(${imgBtnCloseModalAct});
  }
`
