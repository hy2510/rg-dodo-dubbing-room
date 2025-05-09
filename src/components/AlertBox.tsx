import styled from 'styled-components'

import {
  bgAlertBox,
  imgBtnAlertBoxLeft,
  imgBtnAlertBoxRight,
} from '@utils/Assets'

type AlertBoxProps = {
  message?: string
  onClickCancel?: () => void
  onClickOK?: () => void
}

export default function AlertBox({
  message,
  onClickCancel,
  onClickOK,
}: AlertBoxProps) {
  return (
    <StyledAlertBox>
      <div className="alert-container">
        <div className="txt-message">{message}</div>
        <div className="btn-group">
          <div className="btn-left" onClick={onClickCancel}>
            Cancel
          </div>
          <div className="btn-right" onClick={onClickOK}>
            OK
          </div>
        </div>
      </div>
    </StyledAlertBox>
  )
}

// ========== Styled Components ==========

const StyledAlertBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  .alert-container {
    width: 560px;
    height: 305px;
    background-image: url(${bgAlertBox});
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;

    .txt-message {
      margin: auto;
      width: calc(100% - 60px);
      height: 170px;
      overflow-y: auto;
      margin-top: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 1.2em;
    }

    .btn-group {
      display: flex;
      position: absolute;
      bottom: 0;
      .btn-left,
      .btn-right {
        cursor: pointer;
        width: 280px;
        height: 78px;
        background-size: 100%;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        -webkit-user-select: none;
        user-select: none;

        &:active {
          transform: scale(0.99);
        }
      }
      .btn-left {
        background-image: url(${imgBtnAlertBoxLeft});
      }
      .btn-right {
        background-image: url(${imgBtnAlertBoxRight});
      }
    }
  }
`
