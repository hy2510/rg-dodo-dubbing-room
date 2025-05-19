import styled from 'styled-components'
import { MainView } from 'src/App'
import FrameListHeader from '@components/FrameListHeader'
import { StyledListBoard } from '@components/main/ListBoard'
import levelAData from '@assets/images/thumbnail/level_a/level_a_data.json'
import { useState } from 'react'
import MyReview from './MyReview'
import { useSoundsContext } from '@contexts/SoundsContext'

type MyMoviesProps = {
  changeMainView: (view: MainView) => void
  onClick?: () => void
}

// 마이 무비 리스트
export default function MyMovies({ onClick }: MyMoviesProps) {
  const [veiwMyMovieContents, setVeiwMyMovieContents] = useState<boolean>(false)
  const [movieUrl, setMovieUrl] = useState<string>('')
  const { isBgmMute, playSound, refs, toggleBgMusic } = useSoundsContext()

  return (
    <StyledMyMovie>
      <FrameListHeader title="My Movies" onClick={onClick} theme="movie" />

      {/* 콘텐츠 리스트 */}
      <StyledListBoard>
        {levelAData.map((item, index) => (
          <div
            key={index}
            className="thumbnail"
            onClick={() => {
              setVeiwMyMovieContents(true)
              setMovieUrl('src/assets/movies/70101001.mp4')
              playSound(refs.menuTapSoundRef, 0.25, 0.8)
              !isBgmMute && toggleBgMusic()
            }}
          >
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
              draggable="false"
            />
          </div>
        ))}
      </StyledListBoard>

      {veiwMyMovieContents && (
        <MyReview
          onClickBack={() => {
            setVeiwMyMovieContents(false)
            setMovieUrl('')
            playSound(refs.menuTapSoundRef, 0.25, 0.8)
            !isBgmMute && toggleBgMusic()
          }}
          movieUrl={movieUrl}
        />
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
