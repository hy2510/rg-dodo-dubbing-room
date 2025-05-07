import { useState } from 'react'
import styled from 'styled-components'
import levelAData from 'src/assets/images/thumbnail/level_a/level_a_data.json'
import FrameListHeader from '@components/FrameListHeader'

type DubContentsListProps = {
  onClick?: () => void
}

export default function DubContentsList({ onClick }: DubContentsListProps) {
  const [currentTabView, setCurrentTabView] = useState<
    'level_a' | 'level_b' | 'level_c'
  >('level_a')

  const [currentTagView, setCurrentTagView] = useState('All')

  const renderTabItem = (level: 'level_a' | 'level_b' | 'level_c') => {
    const isActive = currentTabView === level
    const imageSrc = `src/assets/images/common/btn-tab-${level}${
      isActive ? '_on' : ''
    }.png`

    return (
      <div
        key={level}
        className="tab-menu-item"
        onClick={() => !isActive && setCurrentTabView(level)}
      >
        <img src={imageSrc} alt={level} />
      </div>
    )
  }

  return (
    <StyledDubContentsList>
      <FrameListHeader title="DODO’s Dubbing Room" onClick={onClick} />

      {/* 레벨 셀렉터 */}
      <StyledTabBar>
        {(['level_a', 'level_b', 'level_c'] as const).map(renderTabItem)}
      </StyledTabBar>

      {/* 콘텐츠 태그 셀렉터 */}
      <StyledTags>
        {(['All', 'Emotion', 'Greeting'] as const).map((tag) => (
          <div
            key={tag}
            className={`tag-item ${currentTagView == tag ? 'active' : ''}`}
            onClick={() => setCurrentTagView(tag)}
          >
            {tag}
          </div>
        ))}
      </StyledTags>

      {/* 콘텐츠 리스트 */}
      <StyledListBoard>
        {levelAData.map((item, index) => (
          <div className="thumbnail" key={index}>
            <div className="completed-mark-box ">
              {/* 싱글모드 완료시 표시되는 마크 */}
              <div className="single-mark"></div>
              {/* 풀캐스트모드 완료시 표시되는 마크 */}
              <div className="full-mark"></div>
            </div>
            {/* 썸네일 이미지 */}
            <img
              src={`src/assets/images/thumbnail/level_a/${item.image_name}`}
              alt={item.image_name}
            />
          </div>
        ))}
      </StyledListBoard>
    </StyledDubContentsList>
  )
}

// ========== Styled Components ==========

const StyledDubContentsList = styled.div`
  background-color: #255fec;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTabBar = styled.div`
  display: flex;
  gap: 10px;
  position: fixed;
  top: 127px;
  padding: 0 10px;
  z-index: 2;

  .tab-menu-item {
    cursor: pointer;

    img {
      width: 160px;
      height: auto;
      -webkit-user-drag: none;
      user-select: none;
    }
  }
`

const StyledTags = styled.div`
  display: flex;
  gap: 5px;
  padding-left: 20px;
  margin-top: 10px;

  .tag-item {
    cursor: pointer;
    background-color: #618cf5;
    color: #3a71f5;
    border-radius: 999px;
    padding: 8px 16px;

    &.active {
      background-color: #ffffff;
      color: #3b75ff;
    }
  }
`

const StyledListBoard = styled.div`
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
