import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, TrendingUp, Brain, Activity, Heart, Droplets, Moon } from 'lucide-react'
import { useData } from '../contexts/DataContext'

const healthTips = [
  "💧 Drink 8 glasses of water daily to stay hydrated and energized.",
  "🚶‍♀️ Take a 10-minute walk after meals to aid digestion.",
  "😴 Maintain a consistent sleep schedule for better rest quality.",
  "🧘‍♀️ Practice deep breathing for 5 minutes to reduce stress.",
  "🥗 Include colorful vegetables in every meal for optimal nutrition.",
  "📱 Take regular breaks from screens to protect your eyes.",
  "🏃‍♂️ Aim for 30 minutes of physical activity most days.",
]

export default function Home() {
  const { getTodaysLogs, symptomLogs, habitLogs } = useData()
  const todaysLogs = getTodaysLogs()
  const todaysTip = healthTips[new Date().getDay()]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Good day! 👋</h1>
        <p className="text-primary-100 text-lg">Track. Learn. Stay Healthy.</p>
      </div>

      {/* Daily Health Tip */}
      <div className="card p-6">
        <div className="flex items-center mb-4">
          <Heart className="h-6 w-6 text-accent-500 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Daily Health Tip</h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{todaysTip}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/log"
          className="card p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex flex-col items-center text-center">
            <Calendar className="h-8 w-8 text-primary-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-medium text-gray-900 dark:text-white">Log Symptoms</h3>
          </div>
        </Link>
        
        <Link
          to="/trends"
          className="card p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex flex-col items-center text-center">
            <TrendingUp className="h-8 w-8 text-secondary-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-medium text-gray-900 dark:text-white">View Trends</h3>
          </div>
        </Link>
        
        <Link
          to="/quiz"
          className="card p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex flex-col items-center text-center">
            <Brain className="h-8 w-8 text-accent-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-medium text-gray-900 dark:text-white">Take Quiz</h3>
          </div>
        </Link>
        
        <Link
          to="/log"
          className="card p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex flex-col items-center text-center">
            <Activity className="h-8 w-8 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-medium text-gray-900 dark:text-white">Track Habits</h3>
          </div>
        </Link>
      </div>

      {/* Health Overview */}
      <div className="card p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="h-6 w-6 text-secondary-500 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Health Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-500 mb-1">{symptomLogs.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Logs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-500 mb-1">{habitLogs.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Habit Entries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-500 mb-1">
              {symptomLogs.length > 0 ? Math.round(symptomLogs.length / 7) : 0}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Week Streak</div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center">
            <Droplets 
              className={`h-6 w-6 mb-2 ${
                todaysLogs.habit ? 'text-secondary-500' : 'text-gray-400'
              }`}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {todaysLogs.habit ? 'Logged' : 'Not logged'}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Moon 
              className={`h-6 w-6 mb-2 ${
                todaysLogs.symptom ? 'text-secondary-500' : 'text-gray-400'
              }`}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {todaysLogs.symptom ? 'Tracked' : 'Track today'}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Activity 
              className={`h-6 w-6 mb-2 ${
                todaysLogs.habit?.steps > 0 ? 'text-secondary-500' : 'text-gray-400'
              }`}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {todaysLogs.habit?.steps > 0 ? 'Active' : 'Stay active'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}