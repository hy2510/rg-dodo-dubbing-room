import styled from 'styled-components'

type IntroProps = {
  onGuideClick: () => void
  onStartClick: () => void
  onMyMovieClick: () => void
  playSound: (
    ref: React.RefObject<HTMLAudioElement>,
    startTime?: number,
    volume?: number,
  ) => void
  menuTapSoundRef: React.RefObject<HTMLAudioElement>
}

export default function Intro({
  onGuideClick,
  onStartClick,
  onMyMovieClick,
  playSound,
  menuTapSoundRef,
}: IntroProps) {
  return (
    <StyledIntro>
      <div className="rotating-sign">
        <object
          type="image/svg+xml"
          data="src/assets/images/home/res-rotating_sign.svg"
          width="100%"
        />
      </div>
      <div className="mixing-console">
        <object
          type="image/svg+xml"
          data="src/assets/images/home/res-mixing_console.svg"
          width="100%"
        />
      </div>
      <div className="dodo">
        <object
          type="image/svg+xml"
          data="src/assets/images/home/res-dodo.svg"
          width="100%"
        />
      </div>
      <div className="synth">
        <object
          type="image/svg+xml"
          data="src/assets/images/home/res-synth.svg"
          width="100%"
        />
      </div>
      <div
        className="btn-guide"
        onClick={() => {
          playSound(menuTapSoundRef, 0.25, 0.8)
          setTimeout(onGuideClick, 300)
        }}
      />
      <div
        className="btn-start"
        onClick={() => {
          playSound(menuTapSoundRef, 0.25, 0.8)
          onStartClick()
        }}
      />
      <div
        className="btn-my-movie"
        onClick={() => {
          playSound(menuTapSoundRef, 0.25, 0.8)
          onMyMovieClick()
        }}
      />
      <div className="platform">
        <div className="platform-ring">
          <object
            type="image/svg+xml"
            data="src/assets/images/home/res-platform_ring.svg"
            width="100%"
          />
        </div>
      </div>
    </StyledIntro>
  )
}

// Styled
const StyledIntro = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

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
    /* background-image: url('src/assets/images/home/res-rotating_sign.png'); */
    z-index: 2;
  }

  .mixing-console {
    left: 103px;
    bottom: 222px;
    width: 286.05px;
    height: 90.69px;
    /* background-image: url('src/assets/images/home/res-mixing_console.png'); */
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
    /* background-image: url('src/assets/images/home/res-synth.png'); */
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
    background-image: url('src/assets/images/home/btn-guide.png');
    &:active {
      background-image: url('src/assets/images/home/btn-guide-act.png');
    }
  }

  .btn-start {
    left: 530px;
    bottom: 65px;
    width: 226px;
    height: 136px;
    background-image: url('src/assets/images/home/btn-start.png');
    &:active {
      background-image: url('src/assets/images/home/btn-start-act.png');
    }
  }

  .btn-my-movie {
    left: 753px;
    bottom: 66px;
    width: 168px;
    height: 136px;
    background-image: url('src/assets/images/home/btn-my_movies.png');
    &:active {
      background-image: url('src/assets/images/home/btn-my_movies-act.png');
    }
  }

  .platform {
    left: 363.5px;
    bottom: 45px;
    width: 555px;
    height: 221px;
    background-image: url('src/assets/images/home/res-platform.png');
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
