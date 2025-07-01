import React from 'react'
import { Settings as SettingsIcon, Moon, Sun, Trash2, Info, Heart, Shield } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useData } from '../contexts/DataContext'

export default function Settings() {
  const { isDark, toggleTheme } = useTheme()
  const { clearAllData } = useData()

  const handleClearData = () => {
    if (confirm('Are you sure you want to delete all your health data? This action cannot be undone.')) {
      clearAllData()
      alert('All data has been cleared.')
    }
  }

  const showAbout = () => {
    alert(
      'About SymptoTrack\n\nSymptoTrack helps you monitor your health by tracking symptoms, habits, and providing educational content. Always consult healthcare professionals for medical advice.'
    )
  }

  const showPrivacy = () => {
    alert(
      'Privacy Policy\n\nYour health data is stored locally in your browser. We do not collect or share your personal health information with third parties.'
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Settings ⚙️</h1>
        <p className="text-primary-100 text-lg">Customize your experience</p>
      </div>

      {/* App Info */}
      <div className="card p-8 text-center">
        <Heart className="h-12 w-12 text-primary-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">SymptoTrack</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">Track. Learn. Stay Healthy.</p>
        <p className="text-sm text-gray-500 dark:text-gray-500">Version 1.0.0</p>
      </div>

      {/* Appearance Settings */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h3>
        </div>
        
        <button
          onClick={toggleTheme}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center">
            {isDark ? (
              <Moon className="h-6 w-6 text-primary-500 mr-4" />
            ) : (
              <Sun className="h-6 w-6 text-accent-500 mr-4" />
            )}
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">Dark Mode</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              </div>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors ${isDark ? 'bg-primary-500' : 'bg-gray-300'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ${isDark ? 'translate-x-6 ml-1' : 'translate-x-0 ml-0.5'}`} />
          </div>
        </button>
      </div>

      {/* Information */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Information</h3>
        </div>
        
        <button
          onClick={showAbout}
          className="w-full p-6 flex items-center border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Info className="h-6 w-6 text-primary-500 mr-4" />
          <div className="text-left">
            <div className="font-medium text-gray-900 dark:text-white">About</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Learn more about SymptoTrack</div>
          </div>
        </button>
        
        <button
          onClick={showPrivacy}
          className="w-full p-6 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Shield className="h-6 w-6 text-secondary-500 mr-4" />
          <div className="text-left">
            <div className="font-medium text-gray-900 dark:text-white">Privacy Policy</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">How we protect your data</div>
          </div>
        </button>
      </div>

      {/* Data Management */}
      <button
        onClick={handleClearData}
        className="w-full bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
      >
        <Trash2 className="h-5 w-5 mr-2" />
        Clear All Data
      </button>
    </div>
  )
}