import { useEffect } from 'react'

type VideoProps = {
  videoRef: React.RefObject<HTMLVideoElement>
  limit: {
    isLimit: boolean
    startTime: number
    endTime: number
  }
  path: string
  clearLimit: () => void
}

export default function Video({
  videoRef,
  limit,
  path,
  clearLimit,
}: VideoProps) {
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeupdateHandler = () => {
      if (limit.isLimit && video.currentTime >= limit.endTime) {
        video.pause()
      }
    }

    const onPlayHandler = () => {
      if (!video.paused && !video.seeking) {
        clearLimit()
      }
    }

    video.addEventListener('timeupdate', onTimeupdateHandler)
    video.addEventListener('play', onPlayHandler)

    if (limit.isLimit) {
      if (video.readyState >= 1) {
        video.currentTime = limit.startTime

        video.play().catch((err) => {
          console.warn('자동재생 실패:', err)
        })
      } else {
        const onLoaded = () => {
          video.currentTime = limit.startTime

          video.play().catch((err) => {
            console.warn('자동재생 실패:', err)
          })

          video.removeEventListener('loadedmetadata', onLoaded)
        }

        video.addEventListener('loadedmetadata', onLoaded)
      }
    }

    return () => {
      video.removeEventListener('timeupdate', onTimeupdateHandler)
      video.removeEventListener('play', onPlayHandler)
    }
  }, [limit, path])

  return (
    <video
      ref={videoRef}
      src={path}
      crossOrigin="anonymous"
      controls
      style={{ objectFit: 'fill', maxWidth: '500px' }}
    />
  )
}
