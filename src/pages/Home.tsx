import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, TrendingUp, Brain, Activity, Heart, Droplets, Moon, Target, MessageCircle, Stethoscope, Zap, Award } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import AdvancedAnalytics from '../components/AdvancedAnalytics'
import HealthGameification from '../components/HealthGameification'

const healthTips = [
  "💧 Drink 8 glasses of water daily to stay hydrated and energized.",
  "🚶‍♀️ Take a 10-minute walk after meals to aid digestion.",
  "😴 Maintain a consistent sleep schedule for better rest quality.",
  "🧘‍♀️ Practice deep breathing for 5 minutes to reduce stress.",
  "🥗 Include colorful vegetables in every meal for optimal nutrition.",
  "📱 Take regular breaks from screens to protect your eyes.",
  "🏃‍♂️ Aim for 30 minutes of physical activity most days.",
]

const quickActions = [
  {
    title: 'Daily Log',
    description: 'Track symptoms and habits',
    icon: Calendar,
    href: '/dashboard/log',
    color: 'text-primary-500',
    bgColor: 'bg-primary-50 dark:bg-primary-900/20',
    gradient: 'from-primary-500 to-primary-600'
  },
  {
    title: 'Health Trends',
    description: 'View your progress',
    icon: TrendingUp,
    href: '/dashboard/trends',
    color: 'text-secondary-500',
    bgColor: 'bg-secondary-50 dark:bg-secondary-900/20',
    gradient: 'from-secondary-500 to-secondary-600'
  },
  {
    title: 'Mindfulness',
    description: 'Guided meditation',
    icon: Brain,
    href: '/dashboard/mindfulness',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Health Goals',
    description: 'Set and track goals',
    icon: Target,
    href: '/dashboard/goals',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    gradient: 'from-green-500 to-green-600'
  },
  {
    title: 'Health Metrics',
    description: 'Track vital signs',
    icon: Activity,
    href: '/dashboard/metrics',
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    gradient: 'from-red-500 to-red-600'
  },
  {
    title: 'Disease Checker',
    description: 'AI symptom analysis',
    icon: Stethoscope,
    href: '/disease-checker',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    gradient: 'from-blue-500 to-blue-600'
  }
]

export default function Home() {
  const { getTodaysLogs, symptomLogs, habitLogs } = useData()
  const todaysLogs = getTodaysLogs()
  const todaysTip = healthTips[new Date().getDay()]

  return (
    <div className="space-y-8">
      {/* Welcome Section with 3D Elements */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent"></div>
        <div className="relative z-10 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-2 text-shadow-lg">Good day! 👋</h1>
              <p className="text-primary-100 text-2xl mb-6">Track. Learn. Stay Healthy.</p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                  <span className="text-sm font-medium">Today's Logs: {todaysLogs.symptom ? '✅' : '⏳'}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                  <span className="text-sm font-medium">Habits: {todaysLogs.habit ? '✅' : '⏳'}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                  <span className="text-sm font-medium">Health Score: 85%</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center floating-element">
                  <Heart className="h-16 w-16 text-white" />
                </div>
                <div className="absolute inset-0 w-32 h-32 bg-white/5 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Health Tip with 3D Card */}
      <div className="card card-3d p-8 hover:shadow-3d-hover transition-all duration-500 group">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Daily Health Tip</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg">{todaysTip}</p>
      </div>

      {/* Quick Actions Grid with Enhanced 3D Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className="group relative overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="card card-3d p-6 hover:shadow-3d-hover transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 relative overflow-hidden">
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`w-14 h-14 ${action.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                  <action.icon className={`h-7 w-7 ${action.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary-500 transition-colors text-lg">
                  {action.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{action.description}</p>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>
        ))}
      </div>

      {/* Advanced Analytics Section */}
      <AdvancedAnalytics />

      {/* Gamification Section */}
      <HealthGameification />

      {/* Enhanced Health Overview Dashboard */}
      <div className="card card-3d p-8 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mr-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Health Command Center</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Symptom Logs', value: symptomLogs.length, color: 'primary', icon: Calendar },
              { label: 'Habit Entries', value: habitLogs.length, color: 'secondary', icon: Activity },
              { label: 'Week Streak', value: symptomLogs.length > 0 ? Math.round(symptomLogs.length / 7) : 0, color: 'accent', icon: Zap },
              { label: 'Average Mood', value: symptomLogs.length > 0 ? Math.round(symptomLogs.reduce((acc, log) => acc + log.mood, 0) / symptomLogs.length) : 0, color: 'green', icon: Heart }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300 group">
                <div className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className={`text-4xl font-bold text-${stat.color}-500 mb-2`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Today's Status with Enhanced Visuals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: Droplets, 
                label: 'Hydration', 
                value: todaysLogs.habit ? `${todaysLogs.habit.water} glasses` : 'Not logged',
                color: 'blue',
                active: !!todaysLogs.habit
              },
              { 
                icon: Moon, 
                label: 'Sleep', 
                value: todaysLogs.habit ? `${todaysLogs.habit.sleep} hours` : 'Not logged',
                color: 'indigo',
                active: !!todaysLogs.habit
              },
              { 
                icon: Activity, 
                label: 'Activity', 
                value: todaysLogs.habit?.steps > 0 ? `${todaysLogs.habit.steps} steps` : 'Stay active',
                color: 'green',
                active: todaysLogs.habit?.steps > 0
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-white/30 dark:bg-gray-800/30 rounded-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300 group">
                <div className={`w-16 h-16 bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${item.active ? 'shadow-glow' : 'opacity-60'}`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <span className="font-semibold text-foreground text-lg mb-2">{item.label}</span>
                <span className="text-sm text-muted-foreground text-center">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Highlights with 3D Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card card-3d p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 hover:shadow-3d-hover transition-all duration-500 group">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">AI-Powered Insights</h3>
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
            Get personalized health recommendations based on your tracked data and symptoms using advanced machine learning.
          </p>
          <Link to="/disease-checker" className="btn btn-outline text-purple-600 border-purple-300 hover:bg-purple-50 btn-3d">
            Try Disease Checker
          </Link>
        </div>

        <div className="card card-3d p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 hover:shadow-3d-hover transition-all duration-500 group">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Goal Achievement</h3>
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
            Set meaningful health goals and track your progress with our comprehensive gamified goal system.
          </p>
          <Link to="/dashboard/goals" className="btn btn-outline text-green-600 border-green-300 hover:bg-green-50 btn-3d">
            Set Goals
          </Link>
        </div>
      </div>
    </div>
  )
}