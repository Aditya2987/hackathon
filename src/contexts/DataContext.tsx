import React, { createContext, useContext, useState, useEffect } from 'react'

export interface SymptomLog {
  id: string
  date: string
  symptoms: string[]
  mood: number
  notes: string
}

export interface HabitLog {
  id: string
  date: string
  water: number
  sleep: number
  steps: number
  medication: boolean
}

export interface QuizResult {
  id: string
  date: string
  score: number
  totalQuestions: number
  category: string
}

interface DataContextType {
  symptomLogs: SymptomLog[]
  habitLogs: HabitLog[]
  quizResults: QuizResult[]
  addSymptomLog: (log: Omit<SymptomLog, 'id'>) => void
  addHabitLog: (log: Omit<HabitLog, 'id'>) => void
  addQuizResult: (result: Omit<QuizResult, 'id'>) => void
  getTodaysLogs: () => { symptom?: SymptomLog; habit?: HabitLog }
  clearAllData: () => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([])
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([])
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    try {
      const symptoms = localStorage.getItem('symptomLogs')
      const habits = localStorage.getItem('habitLogs')
      const quiz = localStorage.getItem('quizResults')

      if (symptoms) setSymptomLogs(JSON.parse(symptoms))
      if (habits) setHabitLogs(JSON.parse(habits))
      if (quiz) setQuizResults(JSON.parse(quiz))
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const addSymptomLog = (log: Omit<SymptomLog, 'id'>) => {
    const newLog = { ...log, id: Date.now().toString() }
    const updatedLogs = [...symptomLogs, newLog]
    setSymptomLogs(updatedLogs)
    localStorage.setItem('symptomLogs', JSON.stringify(updatedLogs))
  }

  const addHabitLog = (log: Omit<HabitLog, 'id'>) => {
    const newLog = { ...log, id: Date.now().toString() }
    const updatedLogs = [...habitLogs, newLog]
    setHabitLogs(updatedLogs)
    localStorage.setItem('habitLogs', JSON.stringify(updatedLogs))
  }

  const addQuizResult = (result: Omit<QuizResult, 'id'>) => {
    const newResult = { ...result, id: Date.now().toString() }
    const updatedResults = [...quizResults, newResult]
    setQuizResults(updatedResults)
    localStorage.setItem('quizResults', JSON.stringify(updatedResults))
  }

  const getTodaysLogs = () => {
    const today = new Date().toISOString().split('T')[0]
    const symptom = symptomLogs.find(log => log.date === today)
    const habit = habitLogs.find(log => log.date === today)
    return { symptom, habit }
  }

  const clearAllData = () => {
    setSymptomLogs([])
    setHabitLogs([])
    setQuizResults([])
    localStorage.removeItem('symptomLogs')
    localStorage.removeItem('habitLogs')
    localStorage.removeItem('quizResults')
  }

  return (
    <DataContext.Provider value={{
      symptomLogs,
      habitLogs,
      quizResults,
      addSymptomLog,
      addHabitLog,
      addQuizResult,
      getTodaysLogs,
      clearAllData,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}