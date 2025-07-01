import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { DataProvider } from './contexts/DataContext'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import Quiz from './pages/Quiz'
import DiseaseChecker from './pages/DiseaseChecker'

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/disease-checker" element={<DiseaseChecker />} />
          </Routes>
        </Router>
      </DataProvider>
    </ThemeProvider>
  )
}

export default App