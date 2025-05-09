import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

import sndGiggle from '@assets/sounds/bg-cosmic-giggle-odyssey.mp3'
import sndShowUp from '@assets/sounds/res-show_up.mp3'
import sndLaunch from '@assets/sounds/res-launch_sound.mp3'
import sndHiThere from '@assets/sounds/res-hi_captain_voice.mp3'
import sndMenuTab from '@assets/sounds/btn-menu_tap.mp3'
import sndClose from '@assets/sounds/btn-close.mp3'

interface SoundItem {
  ref: React.RefObject<HTMLAudioElement>
  src: string
  loop?: boolean
  preload?: 'auto' | 'metadata' | 'none'
}

export function useSounds() {
  const bgMusicRef = useRef<HTMLAudioElement>(null)
  const showUpSoundRef = useRef<HTMLAudioElement>(null)
  const launchSoundRef = useRef<HTMLAudioElement>(null)
  const hiThereVoiceRef = useRef<HTMLAudioElement>(null)
  const menuTapSoundRef = useRef<HTMLAudioElement>(null)
  const closeTapSoundRef = useRef<HTMLAudioElement>(null)

  const sounds: Record<string, SoundItem> = {
    bgMusic: {
      ref: bgMusicRef,
      src: sndGiggle,
      loop: true,
      preload: 'auto',
    },
    showUpSound: {
      ref: showUpSoundRef,
      src: sndShowUp,
      preload: 'auto',
    },
    launchSound: {
      ref: launchSoundRef,
      src: sndLaunch,
      preload: 'auto',
    },
    hiThereVoice: {
      ref: hiThereVoiceRef,
      src: sndHiThere,
      preload: 'auto',
    },
    menuTapSound: {
      ref: menuTapSoundRef,
      src: sndMenuTab,
      preload: 'auto',
    },
    closeTapSound: {
      ref: closeTapSoundRef,
      src: sndClose,
      preload: 'auto',
    },
  }

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const audioElements = Object.values(sounds)
      .map((sound) => sound.ref.current)
      .filter((el): el is HTMLAudioElement => el !== null)

    if (audioElements.length === 0) return

    let loadedCount = 0

    const handleCanPlayThrough = () => {
      loadedCount++

      if (loadedCount === audioElements.length) {
        setIsReady(true)
      }
    }

    audioElements.forEach((audio) => {
      audio.addEventListener('canplaythrough', handleCanPlayThrough, {
        once: true,
      })

      audio.load() // 강제 로드 시작 (ios 대응)
    })

    return () => {
      audioElements.forEach((audio) => {
        audio.removeEventListener('canplaythrough', handleCanPlayThrough)
      })
    }
  }, [])

  const playSound = (
    ref: React.RefObject<HTMLAudioElement>,
    startTime = 0,
    volume = 1,
  ) => {
    const audio = ref.current

    if (audio) {
      audio.currentTime = startTime
      audio.volume = volume
      audio.play().catch(console.error)
    }
  }

  const toggleBgMusic = () => {
    const audio = bgMusicRef.current

    if (audio) {
      audio.volume = audio.volume > 0 ? 0 : 0.3
    }
  }

  const renderAudioElements = (): JSX.Element[] =>
    Object.entries(sounds).map(([key, { ref, src, loop, preload }]) => (
      <audio key={key} ref={ref} src={src} loop={loop} preload={preload} />
    ))

  const renderLoadingScreen = () => (
    <StyledLoadingScreen>Loading Sounds...</StyledLoadingScreen>
  )

  return {
    refs: {
      bgMusicRef,
      showUpSoundRef,
      launchSoundRef,
      hiThereVoiceRef,
      menuTapSoundRef,
      closeTapSoundRef,
    },
    playSound,
    toggleBgMusic,
    renderAudioElements,
    renderLoadingScreen,
    isReady,
  }
}

const StyledLoadingScreen = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`
