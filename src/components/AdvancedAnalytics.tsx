import React, { useState } from 'react'
import { TrendingUp, Brain, Target, AlertTriangle, CheckCircle, Zap, Award } from 'lucide-react'
import { useData } from '../contexts/DataContext'

interface HealthInsight {
  id: string
  type: 'positive' | 'warning' | 'neutral'
  title: string
  description: string
  recommendation: string
  confidence: number
}

export default function AdvancedAnalytics() {
  const { symptomLogs, habitLogs } = useData()
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month')

  const generateInsights = (): HealthInsight[] => {
    const insights: HealthInsight[] = []

    // Analyze symptom patterns
    if (symptomLogs.length > 0) {
      const recentLogs = symptomLogs.slice(-7)
      const avgMood = recentLogs.reduce((sum, log) => sum + log.mood, 0) / recentLogs.length

      if (avgMood >= 2.5) {
        insights.push({
          id: '1',
          type: 'positive',
          title: 'Positive Mood Trend',
          description: `Your average mood score is ${avgMood.toFixed(1)}/3, indicating good emotional wellbeing.`,
          recommendation: 'Keep up the great work! Continue your current wellness practices.',
          confidence: 85
        })
      } else {
        insights.push({
          id: '2',
          type: 'warning',
          title: 'Mood Attention Needed',
          description: `Your average mood score is ${avgMood.toFixed(1)}/3, which may indicate stress or fatigue.`,
          recommendation: 'Consider incorporating more relaxation techniques and ensure adequate sleep.',
          confidence: 78
        })
      }
    }

    // Analyze habit consistency
    if (habitLogs.length > 0) {
      const recentHabits = habitLogs.slice(-7)
      const avgWater = recentHabits.reduce((sum, log) => sum + log.water, 0) / recentHabits.length
      const avgSleep = recentHabits.reduce((sum, log) => sum + log.sleep, 0) / recentHabits.length

      if (avgWater >= 8) {
        insights.push({
          id: '3',
          type: 'positive',
          title: 'Excellent Hydration',
          description: `You're averaging ${avgWater.toFixed(1)} glasses of water daily - fantastic!`,
          recommendation: 'Your hydration habits are excellent. This supports optimal body function.',
          confidence: 92
        })
      } else if (avgWater < 6) {
        insights.push({
          id: '4',
          type: 'warning',
          title: 'Hydration Improvement Needed',
          description: `Your average water intake is ${avgWater.toFixed(1)} glasses daily.`,
          recommendation: 'Aim for 8+ glasses daily. Set hourly reminders to drink water.',
          confidence: 88
        })
      }

      if (avgSleep >= 7 && avgSleep <= 9) {
        insights.push({
          id: '5',
          type: 'positive',
          title: 'Optimal Sleep Pattern',
          description: `Your average sleep duration is ${avgSleep.toFixed(1)} hours - within the ideal range.`,
          recommendation: 'Maintain this excellent sleep schedule for continued health benefits.',
          confidence: 90
        })
      }
    }

    return insights
  }

  const insights = generateInsights()

  const getHealthScore = () => {
    let score = 50 // Base score
    
    // Mood contribution (30%)
    if (symptomLogs.length > 0) {
      const recentMood = symptomLogs.slice(-7).reduce((sum, log) => sum + log.mood, 0) / Math.min(symptomLogs.length, 7)
      score += (recentMood / 3) * 30
    }

    // Habits contribution (40%)
    if (habitLogs.length > 0) {
      const recentHabits = habitLogs.slice(-7)
      const avgWater = recentHabits.reduce((sum, log) => sum + log.water, 0) / recentHabits.length
      const avgSleep = recentHabits.reduce((sum, log) => sum + log.sleep, 0) / recentHabits.length
      
      score += Math.min((avgWater / 8) * 20, 20) // Water score (max 20)
      score += Math.min((avgSleep / 8) * 20, 20) // Sleep score (max 20)
    }

    // Consistency bonus (20%)
    const consistencyDays = Math.min(symptomLogs.length, habitLogs.length, 7)
    score += (consistencyDays / 7) * 20

    return Math.round(Math.min(score, 100))
  }

  const healthScore = getHealthScore()

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500'
    if (score >= 60) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  return (
    <div className="space-y-8">
      {/* AI Health Score */}
      <div className="card card-3d p-8 text-center gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Brain className="h-8 w-8 text-primary-500 mr-3" />
            <h2 className="text-2xl font-bold text-foreground">AI Health Score</h2>
          </div>
          
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted opacity-20"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - healthScore / 100)}`}
                className="transition-all duration-2000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className="stop-primary" />
                  <stop offset="100%" className="stop-secondary" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-5xl font-bold ${getScoreColor(healthScore)} mb-2`}>
                  {healthScore}
                </div>
                <div className="text-sm text-muted-foreground">Health Score</div>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-lg">
            {healthScore >= 80 && "Excellent! You're maintaining great health habits."}
            {healthScore >= 60 && healthScore < 80 && "Good progress! Some areas could use improvement."}
            {healthScore < 60 && "Let's work together to improve your health metrics."}
          </p>
        </div>
      </div>

      {/* Time Frame Selector */}
      <div className="flex justify-center">
        <div className="bg-muted rounded-xl p-1 flex">
          {(['week', 'month', 'quarter'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedTimeframe(period)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedTimeframe === period
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <Zap className="h-6 w-6 text-accent-500 mr-3" />
          <h3 className="text-2xl font-semibold text-foreground">AI-Powered Insights</h3>
        </div>

        {insights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`card p-6 border-l-4 ${
                  insight.type === 'positive'
                    ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10'
                    : insight.type === 'warning'
                    ? 'border-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/10'
                    : 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    {insight.type === 'positive' && <CheckCircle className="h-6 w-6 text-green-500 mr-3" />}
                    {insight.type === 'warning' && <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" />}
                    {insight.type === 'neutral' && <TrendingUp className="h-6 w-6 text-blue-500 mr-3" />}
                    <h4 className="font-semibold text-foreground">{insight.title}</h4>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {insight.confidence}% confidence
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {insight.description}
                </p>
                
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium text-foreground mb-1">💡 Recommendation:</p>
                  <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-foreground mb-2">Building Your Health Profile</h4>
            <p className="text-muted-foreground">
              Keep logging your symptoms and habits to unlock personalized AI insights and recommendations.
            </p>
          </div>
        )}
      </div>

      {/* Achievement System */}
      <div className="card p-8 gradient-bg">
        <div className="flex items-center mb-6">
          <Award className="h-6 w-6 text-accent-500 mr-3" />
          <h3 className="text-2xl font-semibold text-foreground">Health Achievements</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Consistency Champion</h4>
            <p className="text-sm text-muted-foreground">Log data for 7 consecutive days</p>
            <div className="mt-3 text-xs text-muted-foreground">
              Progress: {Math.min(symptomLogs.length, 7)}/7 days
            </div>
          </div>

          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Hydration Hero</h4>
            <p className="text-sm text-muted-foreground">Maintain 8+ glasses daily for a week</p>
            <div className="mt-3 text-xs text-muted-foreground">
              In Progress...
            </div>
          </div>

          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Wellness Warrior</h4>
            <p className="text-sm text-muted-foreground">Achieve 80+ health score</p>
            <div className="mt-3 text-xs text-muted-foreground">
              {healthScore >= 80 ? 'Unlocked! 🎉' : `Progress: ${healthScore}/80`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}