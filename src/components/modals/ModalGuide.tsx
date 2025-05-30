import styled from 'styled-components'

import {
  bgModalGuide,
  imgBtnCloseModal,
  imgBtnCloseModalAct,
} from '@utils/Assets'

type ModalGuideProps = {
  videoUrl: string
  onClickClose: () => void
}

export default function ModalGuide({
  videoUrl,
  onClickClose,
}: ModalGuideProps) {
  return (
    <>
      <StyledGuideModal>
        <div className="btn-close-modal" onClick={onClickClose} />
        <video src={videoUrl} playsInline autoPlay loop controls />
      </StyledGuideModal>

      <StyledLightBox />
    </>
  )
}

// ========== Styled Components ==========

const StyledGuideModal = styled.div`
  width: 793px;
  height: 553px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-image: url(${bgModalGuide});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;

  .btn-close-modal {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    width: 70px;
    height: 70px;
    position: absolute;
    top: 0;
    right: -10px;
    background-image: url(${imgBtnCloseModal});
    background-size: 70px;
    background-repeat: no-repeat;

    &:active {
      background-image: url(${imgBtnCloseModalAct});
    }
  }

  video {
    width: calc(100% - 200px);
    height: auto;
    border-radius: 30px;
    position: absolute;
    top: calc(50% + 10px);
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const StyledLightBox = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 998;
`
