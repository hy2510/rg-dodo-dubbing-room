import AlertBox from '@components/AlertBox'
import ModalDubResult from '@components/ModalDubResult'
import ModalTotalScore from '@components/ModalTotalScore'
import { useState } from 'react'
import styled from 'styled-components'

export default function DubStudio() {
  const [showDubResult, setShowDubResult] = useState<boolean>(false)
  const [showModalTotalScore, setShowModalTotalScore] = useState<boolean>(false)

  return (
    <>
      <StyledDubStudio>
        <div className="row-1st">
          <div className="graph-area">{/* 여기에 파형 그래프 표시 */}</div>
          <div className="dubbing-control-area">
            <div className="col-left">
              {/* 녹음 버튼 */}
              <div className="btn-rec">
                <img src="src/assets/images/dubbing/btn-rec.png" alt="" />
              </div>

              <div className="btn-play">
                <img src="src/assets/images/dubbing/btn-play.png" alt="" />
              </div>
            </div>

            <div className="col-center">
              {/* 이전 문장 보기 버튼 */}
              <div className="btn-chev-left">
                <img src="src/assets/images/dubbing/btn-chev_left.svg" alt="" />
              </div>

              {/* 현재 문장 */}
              <div className="sentence">Hey Guys</div>

              {/* 다음 문장 보기 버튼 */}
              <div className="btn-chev-right">
                <img
                  src="src/assets/images/dubbing/btn-chev_right.png"
                  alt=""
                />
              </div>
            </div>

            <div className="col-right">
              {/* Save 버튼 */}
              <div
                className="btn-save"
                onClick={() => {
                  setShowDubResult(true)
                }}
              >
                <img src="src/assets/images/dubbing/btn-save.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="row-2nd">
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
              },
              {
                cls: 'hold',
                text: 'Nice to meet you.',
              },
              {
                cls: '',
                text: "Hi I'm Baro1",
              },
              {
                cls: '',
                text: "Hi I'm Chello",
              },
              {
                cls: '',
                text: "Hi I'm Baro2",
              },
              {
                cls: '',
                text: "Hi I'm Millo",
              },
            ].map(({ cls, text }, idx) => (
              // cls는 현재 읽고 있는 문장과 읽지 않아도 되는 상태를 나타내는 부분이므로 클래스명만 참고하시오.
              <StyledSpeechBubble key={idx} className={cls}>
                <div className="character">
                  <img
                    src={`src/assets/images/character/aistudio_character_${text
                      .split(' ')[0]
                      .toLowerCase()}1.png`}
                    alt=""
                  />
                </div>
                <div className="text-box">{text}</div>
              </StyledSpeechBubble>
            ))}
          </div>
        </div>
      </StyledDubStudio>

      {/* 결과 보기 */}
      {showDubResult && (
        <ModalDubResult
          videoUrl="src/assets/movies/70101001.mp4"
          onClickTryAgain={() => {
            setShowDubResult(false)
          }}
          onClickSave={() => {
            setShowModalTotalScore(true)
          }}
        />
      )}

      <div style={{ display: 'none' }}>
        <AlertBox message="목록으로 나가시겠습니까?" />
      </div>

      {/* 토탈 스코어 보기 */}
      {showModalTotalScore && (
        <ModalTotalScore
          dubDate="2025-05-30"
          level="KA"
          playTime="00:30"
          totalScore="50"
          dubTime="00:30"
          dubSentence={30}
          dubWords={10}
          checkIsReview={false}
        />
      )}
    </>
  )
}

// ========== Styled Components ==========

const StyledDubStudio = styled.div`
  width: calc(100%);
  height: calc(100% - 100px);
  margin-top: 100px;

  img {
    -webkit-user-drag: none;
    user-select: none;
  }

  .row-1st {
    width: 100%;
    height: 334px;
    background-image: url('src/assets/images/dubbing/bg-graph_area.png');
    background-size: 100%;
    background-position: top;
    background-repeat: no-repeat;
    position: relative;

    .graph-area {
      position: absolute;
      top: 40px;
      left: 40px;
      width: calc(100% - 80px);
      height: 206px;
    }

    .dubbing-control-area {
      height: 70px;
      position: absolute;
      left: 130px;
      right: 130px;
      bottom: 6px;
      display: grid;
      grid-template-columns: 200px 1fr 100px;
      gap: 20px;

      .col-left {
        display: flex;
        align-items: center;
        gap: 10px;

        .btn-rec {
          cursor: pointer;
          width: 95px;
          height: fit-content;

          img {
            display: block;
            width: 100%;
          }
        }

        .btn-play {
          cursor: pointer;
          width: 95px;
          height: fit-content;

          img {
            display: block;
            width: 100%;
          }
        }
      }

      .col-center {
        display: grid;
        grid-template-columns: 80px 1fr 80px;
        align-items: center;
        justify-items: center;
        gap: 10px;
        text-align: center;
        font-size: 1.4em;
        color: #ffffff;

        .btn-chev-left {
          cursor: pointer;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            display: block;
            width: 100%;
          }
        }

        .btn-chev-right {
          cursor: pointer;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            display: block;
            width: 100%;
          }
        }
      }

      .col-right {
        display: flex;
        align-items: center;
        justify-content: end;

        .btn-save {
          cursor: pointer;
          width: 95px;
          height: fit-content;

          img {
            display: block;
            width: 100%;
          }
        }
      }
    }
  }

  .row-2nd {
    height: 246px;
    background-color: #1951d9;
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 30px;
    padding: 20px;

    .col-left video {
      width: 100%;
      border: 10px solid #002f9f;
      border-radius: 20px;
    }

    .col-right {
      display: flex;
      flex-direction: column;
      gap: 10px;
      height: 246px;
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
