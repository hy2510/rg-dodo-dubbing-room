import { useState } from 'react'
import styled from 'styled-components'

import { useSoundContext } from '@contexts/SoundContext'

import levelAData from '@assets/images/thumbnail/level_a/level_a_data.json'

import { MainView } from '@pages/containers/WrapperContainer'

import FrameListHeader from '@components/FrameListHeader'
import { StyledListBoard } from '@components/main/ListBoard'
import Review from './Review'

type MyMoviesProps = {
  changeMainView: (view: MainView) => void
  onClickBack: () => void
}

// 마이 무비 리스트
export default function MyMovies({
  changeMainView,
  onClickBack,
}: MyMoviesProps) {
  const { isBgmMute, audioList, playSound, pauseSound, resumeSound } =
    useSoundContext()

  const [veiwMyMovieContents, setVeiwMyMovieContents] = useState<boolean>(false)
  const [movieUrl, setMovieUrl] = useState<string>('')

  /**
   * Review 영상 보기
   */
  const onClickReview = () => {
    if (!isBgmMute) {
      // 기존에 브금이 꺼져있지 않다면
      pauseSound(audioList.bgMusic)
    }

    playSound(audioList.menuTapSound, 0.25, 0.8)

    setMovieUrl('src/assets/movies/70101001.mp4')
    setVeiwMyMovieContents(true)
  }

  /**
   * Review 화면에서 뒤로 가기
   */
  const onClickBackReview = () => {
    if (!isBgmMute) {
      // 기존에 브금이 꺼져있지 않다면
      resumeSound(audioList.bgMusic)
    }

    setVeiwMyMovieContents(false)
    setMovieUrl('')
    playSound(audioList.menuTapSound, 0.25, 0.8)
  }

  return (
    <StyledMyMovie>
      <FrameListHeader
        title="My Movies"
        onClickBack={onClickBack}
        theme="movie"
      />

      {/* 콘텐츠 리스트 */}
      <StyledListBoard>
        {levelAData.map((item, index) => (
          <div key={index} className="thumbnail" onClick={onClickReview}>
            <div className="completed-mark-box review">
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

      {veiwMyMovieContents && (
        <Review movieUrl={movieUrl} onClickBack={onClickBackReview} />
      )}
    </StyledMyMovie>
  )
}

// ========== Styled Components ==========

const StyledMyMovie = styled.div`
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
