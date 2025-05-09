import { useState } from 'react'
import styled from 'styled-components'

import { MainView } from 'src/App'

import {
  imgBtnTabLevelA,
  imgBtnTabLevelAOn,
  imgBtnTabLevelB,
  imgBtnTabLevelBOn,
  imgBtnTabLevelC,
  imgBtnTabLevelCOn,
} from '@utils/Assets'

import { StyledTabBar } from '@components/main/TabBar'
import { StyledTags } from '@components/main/Tags'
import { StyledListBoard } from '@components/main/ListBoard'

import levelAData from '@assets/images/thumbnail/level_a/level_a_data.json'
import FrameListHeader from '@components/FrameListHeader'

type DubContentsListProps = {
  changeMainView: (view: MainView) => void
  onClick?: () => void
}

type LevelList = 'level_a' | 'level_b' | 'level_c'
type TagList = 'All' | 'Emotion' | 'Greeting'

export default function ContentsList({
  changeMainView,
  onClick,
}: DubContentsListProps) {
  const [currentTabView, setCurrentTabView] = useState<LevelList>('level_a')

  const [currentTagView, setCurrentTagView] = useState('All')
  const levelList: LevelList[] = ['level_a', 'level_b', 'level_c']
  const tagList: TagList[] = ['All', 'Emotion', 'Greeting']

  const renderTabItem = (level: LevelList) => {
    const isActive = currentTabView === level
    let imageComponent

    switch (level) {
      case 'level_a':
        imageComponent = isActive ? (
          <img src={imgBtnTabLevelAOn} />
        ) : (
          <img src={imgBtnTabLevelA} />
        )
        break
      case 'level_b':
        imageComponent = isActive ? (
          <img src={imgBtnTabLevelBOn} />
        ) : (
          <img src={imgBtnTabLevelB} />
        )
        break
      case 'level_c':
        imageComponent = isActive ? (
          <img src={imgBtnTabLevelCOn} />
        ) : (
          <img src={imgBtnTabLevelC} />
        )
        break
    }

    return (
      <div
        key={level}
        className="tab-menu-item"
        onClick={() => !isActive && setCurrentTabView(level)}
      >
        {imageComponent}
      </div>
    )
  }

  return (
    <StyledDubContentsList>
      <FrameListHeader title="DODO’s Dubbing Room" onClick={onClick} />

      {/* 레벨 셀렉터 */}
      <StyledTabBar>
        {levelList.map((level) => renderTabItem(level))}
      </StyledTabBar>

      {/* 콘텐츠 태그 셀렉터 */}
      <StyledTags>
        {tagList.map((tag: TagList) => (
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
          <div
            key={index}
            className="thumbnail"
            onClick={() => {
              changeMainView('dubbing')
            }}
          >
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
