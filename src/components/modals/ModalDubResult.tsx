import styled from 'styled-components'

import { bgModalResult, imgBtnBasicBlue, imgBtnBasicRed } from '@utils/Assets'

type ModalDubResultProps = {
  videoUrl: string
  onClickTryAgain: () => void
  onClickSave: () => void
}

export default function ModalDubResult({
  videoUrl,
  onClickTryAgain,
  onClickSave,
}: ModalDubResultProps) {
  return (
    <StyledDubResult>
      <div className="modal-container">
        <div className="row-1st">
          <video src={videoUrl} playsInline autoPlay loop controls />
        </div>
        <div className="row-2nd">
          <div className="btn-try_again" onClick={onClickTryAgain}>
            Try Again
          </div>
          <div className="btn-complete" onClick={onClickSave}>
            Save
          </div>
        </div>
      </div>
    </StyledDubResult>
  )
}

// ========== Styled Components ==========

const StyledDubResult = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 999;

  .modal-container {
    width: 793px;
    height: 633px;
    background-image: url(${bgModalResult});
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;

    .row-1st {
      display: flex;
      justify-content: center;
      margin-top: 100px;

      video {
        width: 600px;
        border-radius: 20px;
      }
    }

    .row-2nd {
      margin-top: 40px;
      display: flex;
      justify-content: center;
      gap: 20px;

      .btn-try_again {
        cursor: pointer;
        width: 210px;
        height: 76px;
        background-image: url(${imgBtnBasicRed});
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 1.2em;

        &:active {
          transform: scale(0.95);
        }
      }
      .btn-complete {
        cursor: pointer;
        width: 210px;
        height: 76px;
        background-image: url(${imgBtnBasicBlue});
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 1.2em;

        &:active {
          transform: scale(0.95);
        }
      }
    }
  }
`
