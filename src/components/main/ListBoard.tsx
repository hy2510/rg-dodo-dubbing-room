import styled from 'styled-components'

export const StyledListBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 15px 10px;
  position: relative;
  z-index: 0;

  .thumbnail {
    cursor: pointer;
    position: relative;

    &:active {
      transform: scale(0.98);
    }

    .completed-mark-box {
      position: absolute;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      top: -10px;
      left: -5px;

      &::after {
        content: '';
        position: absolute;
        top: 10px;
        left: 5px;
        right: -5px;
        bottom: -10px;
        border-radius: 12px;
        background-color: rgba(0, 0, 0, 0.5);
      }

      &.d-none {
        display: none;
      }

      .single-mark {
        width: 60px;
        height: 60px;
        background-image: url('src/assets/images/home/res-ico-single_mode.png');
        background-size: auto 100%;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        z-index: 1;
      }

      .full-mark {
        width: 60px;
        height: 60px;
        background-image: url('src/assets/images/home/res-ico-full_cast_mode.png');
        background-size: auto 100%;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        z-index: 1;
      }
    }

    img {
      display: block;
      width: 100%;
      border-radius: 12px;
      -webkit-user-drag: none;
      user-select: none;
    }
  }
`
