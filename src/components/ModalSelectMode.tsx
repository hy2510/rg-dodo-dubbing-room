import styled, { css } from 'styled-components'

type ModalSelectModeProps = {
  onClickClose?: () => void
  onClickSingleMode?: () => void
  onClickFullCastMode?: () => void
}

export default function ModalSelectMode({
  onClickClose,
  onClickSingleMode,
  onClickFullCastMode,
}: ModalSelectModeProps) {
  return (
    <StyledModalSelectMode>
      <div className="modal-container">
        <div className="buttons">
          <StyledModeButton
            image="src/assets/images/dubbing/btn-single_mode.png"
            onClick={onClickSingleMode}
          />
          <StyledModeButton
            image="src/assets/images/dubbing/btn-full_cast_mode.png"
            onClick={onClickFullCastMode}
          />
        </div>
        <StyledCloseButton onClick={onClickClose} />
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
    transform: scale(0.95);
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
    background: url('src/assets/images/dubbing/bg-select_mode_modal.png') center /
      100% no-repeat;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 100px 40px;
    height: calc(100% - 160px);
  }
`

const StyledModeButton = styled.div<{ image: string }>`
  ${tapHighlightNone}
  ${activeEffect}
  cursor: pointer;
  width: 100%;
  height: 100%;
  background: ${({ image }) => `url('${image}') center / auto 100% no-repeat`};
`

const StyledCloseButton = styled.div`
  ${tapHighlightNone}
  cursor: pointer;
  position: absolute;
  top: 0;
  right: -10px;
  width: 70px;
  height: 70px;
  background: url('src/assets/images/home/btn-close_modal.png') center / 70px
    no-repeat;

  &:active {
    background-image: url('src/assets/images/home/btn-close_modal-act.png');
  }
`
