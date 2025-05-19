import { useSoundsContext } from '@contexts/SoundsContext'
import styled from 'styled-components'

import {
  resRotatingSign,
  resMixingConsole,
  resDodo,
  resSynth,
  resPlatformRing,
  imgBtnGuide,
  imgBtnGuideAct,
  imgBtnStart,
  imgBtnStartAct,
  imgBtnMyRoom,
  imgBtnMyRoomAct,
  resPlatform,
} from '@utils/Assets'

type IntroProps = {
  onBgmMuteClick: () => void
  onGuideClick: () => void
  onStartClick: () => void
  onMyMovieClick: () => void
}

export default function Intro({
  onBgmMuteClick,
  onGuideClick,
  onStartClick,
  onMyMovieClick,
}: IntroProps) {
  const { isBgmMute, playSound, refs } = useSoundsContext()

  return (
    <StyledIntro>
      <div className="intro-header">
        <div className="btn-exit" />
        <div
          className={`btn-mute ${isBgmMute ? 'on' : ''}`}
          onClick={onBgmMuteClick}
        />
      </div>
      <div className="rotating-sign">
        <object type="image/svg+xml" data={resRotatingSign} width="100%" />
      </div>
      <div className="mixing-console">
        <object type="image/svg+xml" data={resMixingConsole} width="100%" />
      </div>
      <div className="dodo">
        <object type="image/svg+xml" data={resDodo} width="100%" />
      </div>
      <div className="synth">
        <object type="image/svg+xml" data={resSynth} width="100%" />
      </div>
      <div
        className="btn-guide"
        onClick={() => {
          playSound(refs.menuTapSoundRef, 0.25, 0.8)
          setTimeout(onGuideClick, 300)
        }}
      />
      <div
        className="btn-start"
        onClick={() => {
          playSound(refs.menuTapSoundRef, 0.25, 0.8)
          onStartClick()
        }}
      />
      <div
        className="btn-my-movie"
        onClick={() => {
          playSound(refs.menuTapSoundRef, 0.25, 0.8)
          onMyMovieClick()
        }}
      />
      <div className="platform">
        <div className="platform-ring">
          <object type="image/svg+xml" data={resPlatformRing} width="100%" />
        </div>
      </div>
    </StyledIntro>
  )
}

// ========== Styled Components ==========

const StyledIntro = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .intro-header {
    position: absolute;
    top: 0;
    width: calc(100% - 40px);
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn-exit,
    .btn-mute {
      cursor: pointer;
      width: 55px;
      height: 55px;
      border-radius: 100px;
      border: 3px solid #96e3ed;
      background-color: #002281;
      background-position: center;
      background-size: 24px;
      background-repeat: no-repeat;
    }

    .btn-mute {
      background-image: url('src/assets/images/home/btn-mute_n.svg');

      &.on {
        background-image: url('src/assets/images/home/btn-mute_y.svg');
      }
    }

    .btn-exit {
      background-image: url('src/assets/images/home/btn-exit.svg');
    }
  }

  .rotating-sign,
  .mixing-console,
  .dodo,
  .synth,
  .btn-guide,
  .btn-start,
  .btn-my-movie,
  .platform {
    position: absolute;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .rotating-sign {
    top: 0;
    left: 418px;
    width: 439px;
    height: 205px;
    z-index: 2;
  }

  .mixing-console {
    left: 103px;
    bottom: 222px;
    width: 286.05px;
    height: 90.69px;
    z-index: 1;
  }

  .dodo {
    left: 490px;
    bottom: 160px;
    width: 290px;
    height: fit-content;
    z-index: 2;
  }

  .synth {
    right: 78px;
    bottom: 215px;
    width: 352.42px;
    height: 101.93px;
    z-index: 1;
  }

  .btn-guide,
  .btn-start,
  .btn-my-movie {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    z-index: 2;
  }

  .btn-guide {
    left: 364px;
    bottom: 77px;
    width: 165.5px;
    height: 112px;
    background-image: url(${imgBtnGuide});
    &:active {
      background-image: url(${imgBtnGuideAct});
    }
  }

  .btn-start {
    left: 530px;
    bottom: 65px;
    width: 226px;
    height: 136px;
    background-image: url(${imgBtnStart});
    &:active {
      background-image: url(${imgBtnStartAct});
    }
  }

  .btn-my-movie {
    left: 753px;
    bottom: 66px;
    width: 168px;
    height: 136px;
    background-image: url(${imgBtnMyRoom});
    &:active {
      background-image: url(${imgBtnMyRoomAct});
    }
  }

  .platform {
    left: 363.5px;
    bottom: 45px;
    width: 555px;
    height: 221px;
    background-image: url(${resPlatform});
    z-index: 1;

    .platform-ring {
      width: 420px;
      height: auto;
      position: absolute;
      top: 23px;
      left: 70px;
    }
  }
`
