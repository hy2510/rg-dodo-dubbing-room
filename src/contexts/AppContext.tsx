import { createContext, useState } from 'react'
import { IStudyInfo } from '../interfaces/IStudyInfo'

type AppContextProviderProps = {
  children: React.ReactNode
}

type contextValueProps = {
  studyInfo: IStudyInfo
}

const defaultContextValue: {
  studyInfo: IStudyInfo
} = {
  studyInfo: {
    studyId: '',
    studentId: '',
    studentHistoryId: '',
  },
}

const AppContext = createContext(defaultContextValue)

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [studyInfo, setStudyInfo] = useState<IStudyInfo>({
    studyId: '',
    studentId: '',
    studentHistoryId: '',
  })

  const contextValue: contextValueProps | null = {
    studyInfo,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
