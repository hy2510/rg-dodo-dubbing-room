import { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'

import { MainView } from '@pages/containers/WrapperContainer'
import { useSoundContext } from '@contexts/SoundContext'

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
import FrameListHeader from '@components/FrameListHeader'

import levelAData from '@assets/images/thumbnail/level_a/level_a_data.json'

type DubContentsListProps = {
  changeMainView: (view: MainView) => void
  onClickBack: () => void
}

type LevelList = 'level_a' | 'level_b' | 'level_c'
type TagList = 'All' | 'Emotion' | 'Greeting'

export default function ContentsList({
  changeMainView,
  onClickBack,
}: DubContentsListProps) {
  const { isBgmMute, audioList, playSound, pauseSound } = useSoundContext()
  const [currentTabView, setCurrentTabView] = useState<LevelList>('level_a')
  const [currentTagView, setCurrentTagView] = useState<TagList>('All')

  const levelList: LevelList[] = ['level_a', 'level_b', 'level_c']
  const tagList: TagList[] = ['All', 'Emotion', 'Greeting']

  const levelImgMap = useMemo(
    () => ({
      level_a: { on: imgBtnTabLevelAOn, off: imgBtnTabLevelA },
      level_b: { on: imgBtnTabLevelBOn, off: imgBtnTabLevelB },
      level_c: { on: imgBtnTabLevelCOn, off: imgBtnTabLevelC },
    }),
    [],
  )

  /**
   * 버튼 클릭 - Level A/B/C
   */
  const handleChangeLevel = useCallback(
    (level: LevelList) => {
      if (level !== currentTabView) {
        playSound(audioList.closeTapSound)

        setCurrentTabView(level)
      }
    },
    [currentTabView, playSound, audioList.closeTapSound],
  )

  /**
   * 버튼 클릭 - Tag
   */
  const handleChangeTag = useCallback(
    (tag: TagList) => {
      playSound(audioList.closeTapSound)

      setCurrentTagView(tag)
    },
    [playSound, audioList.closeTapSound],
  )

  /**
   * 버튼 클릭 - Contents
   */
  const handleClickContent = useCallback(() => {
    if (!isBgmMute) pauseSound(audioList.bgMusic)

    playSound(audioList.menuTapSound, 0.25, 0.8)

    changeMainView('dubbing')
  }, [changeMainView, playSound, pauseSound, isBgmMute, audioList])

  return (
    <StyledDubContentsList>
      <FrameListHeader
        title="DODO’s Dubbing Room"
        theme="content"
        onClickBack={onClickBack}
      />

      {/* 레벨 셀렉터 */}
      <StyledTabBar>
        {levelList.map((level) => {
          const isActive = currentTabView === level
          const imgSrc = isActive
            ? levelImgMap[level].on
            : levelImgMap[level].off
          return (
            <div
              key={level}
              className="tab-menu-item"
              onClick={() => handleChangeLevel(level)}
            >
              <img src={imgSrc} alt={level} />
            </div>
          )
        })}
      </StyledTabBar>

      {/* 태그 필터 */}
      <StyledTags>
        {tagList.map((tag) => (
          <div
            key={tag}
            className={`tag-item ${currentTagView === tag ? 'active' : ''}`}
            onClick={() => handleChangeTag(tag)}
          >
            {tag}
          </div>
        ))}
      </StyledTags>

      {/* 콘텐츠 리스트 */}
      <StyledListBoard>
        {levelAData.map((item, index) => (
          <div key={index} className="thumbnail" onClick={handleClickContent}>
            <div className="completed-mark-box">
              <div className="single-mark" />
              <div className="full-mark" />
            </div>
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
