import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

import sndGiggle from '@assets/sounds/bg-cosmic-giggle-odyssey.mp3'
import sndShowUp from '@assets/sounds/res-show_up.mp3'
import sndLaunch from '@assets/sounds/res-launch_sound.mp3'
import sndHiThere from '@assets/sounds/res-hi_captain_voice.mp3'
import sndMenuTab from '@assets/sounds/btn-menu_tap.mp3'
import sndClose from '@assets/sounds/btn-close.mp3'
import sndPowerDown from '@assets/sounds/res-power_down.mp3'

interface SoundItem {
  ref: React.RefObject<HTMLAudioElement>
  src: string
  loop?: boolean
  preload?: 'auto' | 'metadata' | 'none'
}

export type AudioList = {
  bgMusic: React.RefObject<HTMLAudioElement>
  showUpSound: React.RefObject<HTMLAudioElement>
  launchSound: React.RefObject<HTMLAudioElement>
  hiThereVoice: React.RefObject<HTMLAudioElement>
  menuTapSound: React.RefObject<HTMLAudioElement>
  closeTapSound: React.RefObject<HTMLAudioElement>
  powerDownSound: React.RefObject<HTMLAudioElement>
}

export function useSounds() {
  const [isBgmMute, setIsBgmMute] = useState(false)
  const bgMusicRef = useRef<HTMLAudioElement>(null)
  const showUpSoundRef = useRef<HTMLAudioElement>(null)
  const launchSoundRef = useRef<HTMLAudioElement>(null)
  const hiThereVoiceRef = useRef<HTMLAudioElement>(null)
  const menuTapSoundRef = useRef<HTMLAudioElement>(null)
  const closeTapSoundRef = useRef<HTMLAudioElement>(null)
  const powerDownSoundRef = useRef<HTMLAudioElement>(null)

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
    powerDownSound: {
      ref: powerDownSoundRef,
      src: sndPowerDown,
      preload: 'auto',
    },
  }

  const [isReady, setIsReady] = useState(false)
  const [isMuteBGM, setIsMuteBGM] = useState(false)

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

  /**
   * 오디오 재생
   * @param ref
   * @param startTime
   * @param volume
   */
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

  /**
   * 오디오 일시 중지
   * @param ref
   */
  const pauseSound = (ref: React.RefObject<HTMLAudioElement>) => {
    const audio = ref.current

    if (audio) {
      audio.pause()
    }
  }

  /**
   * 오디오 다시 시작
   * @param ref
   */
  const resumeSound = (ref: React.RefObject<HTMLAudioElement>) => {
    const audio = ref.current

    if (audio) {
      audio.play()
    }
  }

  /**
   * 오디오 중지
   * @param ref
   */
  const stopSound = (ref: React.RefObject<HTMLAudioElement>) => {
    const audio = ref.current

    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }

  /**
   * BGM 토글
   */
  const toggleBGM = () => {
    if (isBgmMute) {
      setIsBgmMute(false)
      resumeSound(audioList.bgMusic)
    } else {
      setIsBgmMute(true)
      pauseSound(audioList.bgMusic)
    }
    const audio = bgMusicRef.current

    if (audio) {
      audio.volume = audio.volume > 0 ? 0 : 0.3
    }
  }

  const renderAudioElements = (): JSX.Element[] => {
    return Object.entries(sounds).map(([key, { ref, src, loop, preload }]) => (
      <audio key={key} ref={ref} src={src} loop={loop} preload={preload} />
    ))
  }

  const renderLoadingScreen = () => (
    <StyledLoadingScreen>Loading Sounds...</StyledLoadingScreen>
  )

  const changeBGMMute = (state: boolean) => {
    setIsBgmMute(state)
  }

  const audioList: AudioList = {
    bgMusic: bgMusicRef,
    showUpSound: showUpSoundRef,
    launchSound: launchSoundRef,
    hiThereVoice: hiThereVoiceRef,
    menuTapSound: menuTapSoundRef,
    closeTapSound: closeTapSoundRef,
    powerDownSound: powerDownSoundRef,
  }

  return {
    isReady,
    isBgmMute,
    audioList,
    playSound,
    pauseSound,
    resumeSound,
    stopSound,
    toggleBGM,
    changeBGMMute,
    renderAudioElements,
    renderLoadingScreen,
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
