import { createContext, useContext, ReactNode } from 'react'
import { useSounds } from '@hooks/useSounds'

const SoundsContext = createContext<ReturnType<typeof useSounds> | null>(null)

type SoundsProviderProps = {
  children: ReactNode
}

export function SoundsProvider({ children }: SoundsProviderProps) {
  const sounds = useSounds()

  return (
    <SoundsContext.Provider value={sounds}>
      <>
        {sounds.renderAudioElements()}
        {children}
      </>
    </SoundsContext.Provider>
  )
}

export function useSoundsContext() {
  const context = useContext(SoundsContext)
  if (!context) {
    throw new Error('useSoundsContext must be used within a SoundsProvider')
  }
  return context
}
