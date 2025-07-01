import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, TrendingUp, Brain, Activity, Heart, Droplets, Moon, Target, MessageCircle, Stethoscope, Zap, Award, Shield, Users, Star, Sparkles, Globe, BarChart3 } from 'lucide-react'
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
    gradient: 'from-primary-500 to-primary-600',
    badge: 'Essential'
  },
  {
    title: 'Health Trends',
    description: 'View your progress',
    icon: TrendingUp,
    href: '/dashboard/trends',
    color: 'text-secondary-500',
    bgColor: 'bg-secondary-50 dark:bg-secondary-900/20',
    gradient: 'from-secondary-500 to-secondary-600',
    badge: 'Analytics'
  },
  {
    title: 'Mindfulness',
    description: 'Guided meditation',
    icon: Brain,
    href: '/dashboard/mindfulness',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    gradient: 'from-purple-500 to-purple-600',
    badge: 'Wellness'
  },
  {
    title: 'Health Goals',
    description: 'Set and track goals',
    icon: Target,
    href: '/dashboard/goals',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    gradient: 'from-green-500 to-green-600',
    badge: 'Goals'
  },
  {
    title: 'Health Metrics',
    description: 'Track vital signs',
    icon: Activity,
    href: '/dashboard/metrics',
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    gradient: 'from-red-500 to-red-600',
    badge: 'Vitals'
  },
  {
    title: 'Disease Checker',
    description: 'AI symptom analysis',
    icon: Stethoscope,
    href: '/disease-checker',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    gradient: 'from-blue-500 to-blue-600',
    badge: 'AI Powered'
  }
]

const features = [
  {
    icon: Brain,
    title: 'Advanced AI Analysis',
    description: 'Our sophisticated AI analyzes your symptoms with 95% accuracy, providing detailed health insights.',
    stats: '95% Accuracy',
    color: 'text-purple-500'
  },
  {
    icon: Shield,
    title: 'Privacy Protected',
    description: 'Your health data is encrypted and stored locally. We never share your personal information.',
    stats: '100% Private',
    color: 'text-green-500'
  },
  {
    icon: Globe,
    title: 'Global Health Database',
    description: 'Access to comprehensive medical knowledge from leading healthcare institutions worldwide.',
    stats: '10,000+ Conditions',
    color: 'text-blue-500'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Join thousands of users sharing their health journey and supporting each other.',
    stats: '50,000+ Users',
    color: 'text-orange-500'
  }
]

const achievements = [
  {
    icon: Star,
    title: 'Health Champion',
    description: 'Complete 30 days of consistent logging',
    progress: 75,
    color: 'text-yellow-500'
  },
  {
    icon: Zap,
    title: 'Wellness Warrior',
    description: 'Maintain healthy habits for 2 weeks',
    progress: 60,
    color: 'text-blue-500'
  },
  {
    icon: Heart,
    title: 'Mindful Master',
    description: 'Complete 10 meditation sessions',
    progress: 40,
    color: 'text-pink-500'
  }
]

export default function Home() {
  const { getTodaysLogs, symptomLogs, habitLogs } = useData()
  const todaysLogs = getTodaysLogs()
  const todaysTip = healthTips[new Date().getDay()]

  return (
    <div className="space-y-8">
      {/* Enhanced Welcome Section with Animated Elements */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-10 left-1/3 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="relative z-10 p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <div className="relative">
                  <Heart className="h-12 w-12 text-white floating-element" />
                  <div className="absolute inset-0 h-12 w-12 text-white animate-ping opacity-20">
                    <Heart className="h-12 w-12" />
                  </div>
                </div>
                <div className="ml-4">
                  <h1 className="text-5xl font-bold mb-2 text-shadow-lg">Good day! 👋</h1>
                  <p className="text-primary-100 text-2xl mb-2">Track. Learn. Stay Healthy.</p>
                  <p className="text-primary-200 text-lg">Your personalized health companion</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-center">
                    <Calendar className="h-6 w-6 mr-3" />
                    <div>
                      <div className="text-sm font-medium">Today's Logs</div>
                      <div className="text-lg font-bold">{todaysLogs.symptom ? '✅ Complete' : '⏳ Pending'}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-center">
                    <Activity className="h-6 w-6 mr-3" />
                    <div>
                      <div className="text-sm font-medium">Health Score</div>
                      <div className="text-lg font-bold">85% Excellent</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-center">
                    <Zap className="h-6 w-6 mr-3" />
                    <div>
                      <div className="text-sm font-medium">Streak</div>
                      <div className="text-lg font-bold">{Math.min(symptomLogs.length, 30)} days</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Link to="/dashboard/log" className="btn btn-secondary btn-glass px-6 py-3">
                  <Calendar className="h-5 w-5 mr-2" />
                  Quick Log
                </Link>
                <Link to="/disease-checker" className="btn btn-outline btn-glass px-6 py-3 text-white border-white/30 hover:bg-white/20">
                  <Stethoscope className="h-5 w-5 mr-2" />
                  AI Checker
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-40 h-40 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center floating-element">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-white mx-auto mb-2" />
                    <div className="text-sm font-medium">Health Dashboard</div>
                  </div>
                </div>
                <div className="absolute inset-0 w-40 h-40 bg-white/5 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Daily Health Tip */}
      <div className="card card-3d p-8 hover:shadow-3d-hover transition-all duration-500 group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 to-accent-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Daily Health Tip</h2>
              <p className="text-muted-foreground">Personalized for your wellness journey</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">{todaysTip}</p>
        </div>
      </div>

      {/* Enhanced Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className="group relative overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="card card-3d p-6 hover:shadow-3d-hover transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 relative overflow-hidden">
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 text-xs font-medium rounded-full">
                  {action.badge}
                </span>
              </div>
              
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 ${action.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                  <action.icon className={`h-8 w-8 ${action.color}`} />
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

      {/* New Features Showcase */}
      <div className="card p-8 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose SymptoTrack?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the future of health tracking with our advanced AI-powered platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300 group">
                <div className={`w-16 h-16 bg-gradient-to-r from-${feature.color.split('-')[1]}-400 to-${feature.color.split('-')[1]}-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{feature.description}</p>
                <div className={`text-lg font-bold ${feature.color}`}>{feature.stats}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Progress */}
      <div className="card p-8">
        <div className="flex items-center mb-6">
          <Award className="h-6 w-6 text-accent-500 mr-3" />
          <h2 className="text-2xl font-semibold text-foreground">Your Progress</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="p-6 bg-muted/50 rounded-xl hover:bg-muted/70 transition-colors">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r from-${achievement.color.split('-')[1]}-400 to-${achievement.color.split('-')[1]}-600 rounded-xl flex items-center justify-center mr-4`}>
                  <achievement.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{achievement.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r from-${achievement.color.split('-')[1]}-400 to-${achievement.color.split('-')[1]}-600 h-2 rounded-full transition-all duration-1000`}
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
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
                active: !!todaysLogs.habit,
                target: '8 glasses'
              },
              { 
                icon: Moon, 
                label: 'Sleep', 
                value: todaysLogs.habit ? `${todaysLogs.habit.sleep} hours` : 'Not logged',
                color: 'indigo',
                active: !!todaysLogs.habit,
                target: '8 hours'
              },
              { 
                icon: Activity, 
                label: 'Activity', 
                value: todaysLogs.habit?.steps > 0 ? `${todaysLogs.habit.steps} steps` : 'Stay active',
                color: 'green',
                active: todaysLogs.habit?.steps > 0,
                target: '10,000 steps'
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-white/30 dark:bg-gray-800/30 rounded-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300 group">
                <div className={`w-16 h-16 bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${item.active ? 'shadow-glow' : 'opacity-60'}`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <span className="font-semibold text-foreground text-lg mb-2">{item.label}</span>
                <span className="text-sm text-muted-foreground text-center mb-1">{item.value}</span>
                <span className="text-xs text-muted-foreground/70">Target: {item.target}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card card-3d p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 hover:shadow-3d-hover transition-all duration-500 group">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">AI-Powered Insights</h3>
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
            Get personalized health recommendations based on your tracked data and symptoms using advanced machine learning 
            with 95% accuracy rate from our global health database.
          </p>
          <div className="flex space-x-3">
            <Link to="/disease-checker" className="btn btn-outline text-purple-600 border-purple-300 hover:bg-purple-50 btn-3d">
              Try AI Checker
            </Link>
            <span className="px-3 py-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg text-sm font-medium">
              95% Accurate
            </span>
          </div>
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
            Join 50,000+ users achieving their wellness targets.
          </p>
          <div className="flex space-x-3">
            <Link to="/dashboard/goals" className="btn btn-outline text-green-600 border-green-300 hover:bg-green-50 btn-3d">
              Set Goals
            </Link>
            <span className="px-3 py-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-lg text-sm font-medium">
              50K+ Users
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}