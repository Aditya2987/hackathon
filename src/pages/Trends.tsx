import React, { useState } from 'react'
import { TrendingUp, Calendar, BarChart3, Activity, AlertTriangle } from 'lucide-react'
import { useData } from '../contexts/DataContext'

export default function Trends() {
  const { symptomLogs, habitLogs } = useData()
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week')

  const getFilteredLogs = () => {
    const now = new Date()
    const daysBack = selectedPeriod === 'week' ? 7 : 30
    const cutoffDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000)
    
    return {
      symptoms: symptomLogs.filter(log => new Date(log.date) >= cutoffDate),
      habits: habitLogs.filter(log => new Date(log.date) >= cutoffDate),
    }
  }

  const { symptoms, habits } = getFilteredLogs()

  const getSymptomFrequency = () => {
    const frequency: Record<string, number> = {}
    symptoms.forEach(log => {
      log.symptoms.forEach(symptom => {
        frequency[symptom] = (frequency[symptom] || 0) + 1
      })
    })
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
  }

  const getAverageHabits = () => {
    if (habits.length === 0) return { water: 0, sleep: 0, steps: 0 }
    
    const totals = habits.reduce((acc, log) => ({
      water: acc.water + log.water,
      sleep: acc.sleep + log.sleep,
      steps: acc.steps + log.steps,
    }), { water: 0, sleep: 0, steps: 0 })

    return {
      water: Math.round(totals.water / habits.length),
      sleep: Math.round(totals.sleep / habits.length),
      steps: Math.round(totals.steps / habits.length),
    }
  }

  const getInsights = () => {
    const insights = []
    const mostCommonSymptoms = getSymptomFrequency()
    
    if (mostCommonSymptoms.length > 0 && mostCommonSymptoms[0][1] >= 3) {
      insights.push(`⚠️ "${mostCommonSymptoms[0][0]}" appears frequently. Consider consulting a healthcare provider.`)
    }
    
    const avgHabits = getAverageHabits()
    if (avgHabits.water < 6) {
      insights.push('💧 Your water intake is below recommended. Try to drink more throughout the day.')
    }
    if (avgHabits.sleep < 7) {
      insights.push('😴 You may need more sleep. Aim for 7-9 hours per night.')
    }
    if (avgHabits.steps < 5000) {
      insights.push('🚶‍♀️ Consider increasing your daily activity to reach 10,000 steps.')
    }

    return insights
  }

  const symptomFrequency = getSymptomFrequency()
  const averageHabits = getAverageHabits()
  const insights = getInsights()

  if (symptoms.length === 0 && habits.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Health Trends 📊</h1>
          <p className="text-secondary-100 text-lg">Insights from your data</p>
        </div>
        
        <div className="card p-12 text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Start logging your symptoms and habits to see trends and insights here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Health Trends 📊</h1>
        <p className="text-secondary-100 text-lg">Insights from your data</p>
      </div>

      {/* Period Selector */}
      <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 w-fit">
        <button
          onClick={() => setSelectedPeriod('week')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedPeriod === 'week'
              ? 'bg-primary-500 text-white'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => setSelectedPeriod('month')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedPeriod === 'month'
              ? 'bg-primary-500 text-white'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          This Month
        </button>
      </div>

      {/* Overview Stats */}
      <div className="card p-6">
        <div className="flex items-center mb-6">
          <Calendar className="h-6 w-6 text-primary-500 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-500 mb-1">{symptoms.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Symptom Logs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-500 mb-1">{habits.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Habit Logs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-500 mb-1">
              {symptoms.length > 0 ? Math.round(symptoms.reduce((acc, log) => acc + log.mood, 0) / symptoms.length) : 0}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Avg Mood</div>
          </div>
        </div>
      </div>

      {/* Most Common Symptoms */}
      {symptomFrequency.length > 0 && (
        <div className="card p-6">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Common Symptoms</h2>
          </div>
          
          <div className="space-y-4">
            {symptomFrequency.map(([symptom, count]) => (
              <div key={symptom} className="flex items-center">
                <div className="w-20 text-sm text-gray-600 dark:text-gray-400">{symptom}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-red-500 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${(count / (symptomFrequency[0]?.[1] || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="w-8 text-sm font-medium text-gray-900 dark:text-white text-right">{count}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Habit Averages */}
      {habits.length > 0 && (
        <div className="card p-6">
          <div className="flex items-center mb-6">
            <Activity className="h-6 w-6 text-secondary-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Habit Averages</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-20 text-sm text-gray-600 dark:text-gray-400">Water</div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-primary-500 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((averageHabits.water / 10) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="w-8 text-sm font-medium text-gray-900 dark:text-white text-right">{averageHabits.water}</div>
            </div>
            
            <div className="flex items-center">
              <div className="w-20 text-sm text-gray-600 dark:text-gray-400">Sleep</div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-accent-500 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((averageHabits.sleep / 12) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="w-8 text-sm font-medium text-gray-900 dark:text-white text-right">{averageHabits.sleep}h</div>
            </div>
            
            <div className="flex items-center">
              <div className="w-20 text-sm text-gray-600 dark:text-gray-400">Steps</div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-secondary-500 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((averageHabits.steps / 10000) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="w-8 text-sm font-medium text-gray-900 dark:text-white text-right">{averageHabits.steps}</div>
            </div>
          </div>
        </div>
      )}

      {/* Health Insights */}
      {insights.length > 0 && (
        <div className="card p-6">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-6 w-6 text-accent-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Health Insights</h2>
          </div>
          
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <p
                key={index}
                className={`text-sm leading-relaxed ${
                  insight.includes('⚠️') 
                    ? 'text-red-600 dark:text-red-400 font-medium' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {insight}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}