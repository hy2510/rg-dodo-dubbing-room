import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import {
  bgModalTotalScore,
  imgBtnCloseModal,
  imgBtnCloseModalAct,
  imgBtnFinish,
} from '@utils/Assets'

import tempVideo from '@assets/movies/70101001.mp4'
import imgGraph from '@assets/images/common/sample-pentagon_graph.png'

type ModalTotalScoreProps = {
  dubDate?: string
  level?: string
  playTime?: string
  totalScore?: string
  dubTime?: string
  dubSentence?: number
  dubWords?: number
  onClickClose?: () => void
  onClickFinish?: () => void
  checkIsReview: boolean
}

export default function ModalTotalScore({
  dubDate,
  level,
  playTime,
  totalScore,
  dubTime,
  dubSentence,
  dubWords,
  onClickClose,
  onClickFinish,
  checkIsReview,
}: ModalTotalScoreProps) {
  const [isReview, setIsReview] = useState<boolean>(false)

  useEffect(() => {
    setIsReview(checkIsReview)
  }, [checkIsReview])

  return (
    <StyledModalTotalScore>
      <div className="modal-container">
        <div className="col-left">
          <div className="dub-info">
            <div className="row-1st">
              <video src={tempVideo} playsInline autoPlay loop controls />
            </div>
            <div className="row-2nd">
              <div>더빙날짜</div>
              <div>{dubDate}</div>
              <div>난이도</div>
              <div>{level}</div>
              <div>영상시간</div>
              <div>{playTime}</div>
            </div>
          </div>
        </div>
        <div className="col-right">
          <div className="row-1st">
            전체 스코어 <span>{totalScore}</span>점
          </div>
          <div className="row-2nd">
            <div className="dub-info-item">
              <div className="dub-info-label">소요 시간</div>
              <div className="dub-info-value">{dubTime}</div>
            </div>
            <div className="dub-info-item">
              <div className="dub-info-label">문장 개수</div>
              <div className="dub-info-value">{dubSentence}</div>
            </div>
            <div className="dub-info-item">
              <div className="dub-info-label">단어 개수</div>
              <div className="dub-info-value">{dubWords}</div>
            </div>
          </div>
          <div className="row-3rd">
            {/* 여기에 펜타곤 그래프 삽입 */}
            <img src={imgGraph} alt="" width={'auto'} height={'300px'} />
          </div>
        </div>
        {isReview ? (
          <StyledCloseButton onClick={onClickClose} />
        ) : (
          <StyledFinishButton onClick={onClickFinish} />
        )}
      </div>
    </StyledModalTotalScore>
  )
}

// ========== Styled Components ==========

const StyledModalTotalScore = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-container {
    width: 1170px;
    height: 630px;
    background-image: url(${bgModalTotalScore});
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    display: grid;
    grid-template-columns: 480px 1fr;
    gap: 30px;
    position: relative;

    .col-left {
      display: flex;
      height: calc(100% - 160px);
      padding: 80px 60px;
      padding-right: 0;
      align-items: center;
      gap: 50px;
      flex-shrink: 0;

      .dub-info {
        height: calc(100% - 40px);
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.2);
        padding: 20px;

        .row-1st {
          margin-bottom: 10px;

          video {
            display: block;
            width: 100%;
            border-radius: 15px;
          }
        }

        .row-2nd {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          padding: 20px;
          color: #ffffff;

          & > *:nth-child(even) {
            color: rgba(255, 255, 255, 0.6);
            text-align: right;
          }
        }
      }
    }

    .col-right {
      display: flex;
      flex-direction: column;
      height: calc(100% - 160px);
      padding: 80px 60px;
      padding-left: 0;
      align-items: center;
      gap: 20px;
      flex-shrink: 0;

      .row-1st {
        color: #ffffff;
        font-size: 1.6em;

        span {
          color: #ffdf00;
        }
      }

      .row-2nd {
        display: flex;
        gap: 20px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.2);
        padding: 20px 30px;

        .dub-info-item {
          display: flex;
          gap: 10px;

          .dub-info-label {
            color: #ffffff;
          }

          .dub-info-value {
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }
    }
  }
`

// ========== Styled Components ==========

const tapHighlightNone = css`
  -webkit-tap-highlight-color: transparent;
  outline: none;
`

const StyledCloseButton = styled.div`
  ${tapHighlightNone}
  cursor: pointer;
  position: absolute;
  top: -10px;
  right: -15px;
  width: 70px;
  height: 70px;
  background: url(${imgBtnCloseModal}) center / 70px no-repeat;

  &:active {
    background-image: url(${imgBtnCloseModalAct});
  }
`

const StyledFinishButton = styled.div`
  cursor: pointer;
  width: 238px;
  height: 73px;
  background-image: url(${imgBtnFinish});
  background-size: 100%;
  background-repeat: no-repeat;
  position: absolute;
  right: 0;
  bottom: 3px;

  &::after {
    content: 'Finish';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 1.2em;
    padding-top: 5px;
  }

  &:active {
    transform: scale(0.95);
    transform-origin: right bottom;
  }
`
