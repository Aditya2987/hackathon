import React, { useState, useEffect } from 'react'
import { Trophy, Star, Zap, Target, Award, Gift, Crown, Medal } from 'lucide-react'
import { useData } from '../contexts/DataContext'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  points: number
  unlocked: boolean
  progress: number
  maxProgress: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface UserLevel {
  level: number
  currentXP: number
  xpToNext: number
  title: string
}

export default function HealthGameification() {
  const { symptomLogs, habitLogs } = useData()
  const [userLevel, setUserLevel] = useState<UserLevel>({
    level: 1,
    currentXP: 0,
    xpToNext: 100,
    title: 'Health Novice'
  })

  const achievements: Achievement[] = [
    {
      id: 'first_log',
      title: 'First Steps',
      description: 'Log your first symptom entry',
      icon: Star,
      points: 50,
      unlocked: symptomLogs.length > 0,
      progress: Math.min(symptomLogs.length, 1),
      maxProgress: 1,
      rarity: 'common'
    },
    {
      id: 'week_streak',
      title: 'Week Warrior',
      description: 'Log symptoms for 7 consecutive days',
      icon: Trophy,
      points: 200,
      unlocked: symptomLogs.length >= 7,
      progress: Math.min(symptomLogs.length, 7),
      maxProgress: 7,
      rarity: 'rare'
    },
    {
      id: 'hydration_master',
      title: 'Hydration Master',
      description: 'Drink 8+ glasses of water for 5 days',
      icon: Zap,
      points: 150,
      unlocked: habitLogs.filter(log => log.water >= 8).length >= 5,
      progress: Math.min(habitLogs.filter(log => log.water >= 8).length, 5),
      maxProgress: 5,
      rarity: 'rare'
    },
    {
      id: 'sleep_champion',
      title: 'Sleep Champion',
      description: 'Get 8+ hours of sleep for 7 nights',
      icon: Crown,
      points: 300,
      unlocked: habitLogs.filter(log => log.sleep >= 8).length >= 7,
      progress: Math.min(habitLogs.filter(log => log.sleep >= 8).length, 7),
      maxProgress: 7,
      rarity: 'epic'
    },
    {
      id: 'perfect_month',
      title: 'Perfect Month',
      description: 'Complete all daily logs for 30 days',
      icon: Medal,
      points: 1000,
      unlocked: symptomLogs.length >= 30 && habitLogs.length >= 30,
      progress: Math.min(symptomLogs.length, habitLogs.length, 30),
      maxProgress: 30,
      rarity: 'legendary'
    }
  ]

  const calculateTotalXP = () => {
    return achievements.reduce((total, achievement) => {
      return total + (achievement.unlocked ? achievement.points : 0)
    }, 0)
  }

  const calculateLevel = (xp: number) => {
    let level = 1
    let xpRequired = 100
    let totalXP = 0

    while (totalXP + xpRequired <= xp) {
      totalXP += xpRequired
      level++
      xpRequired = Math.floor(xpRequired * 1.2) // Increase XP requirement by 20% each level
    }

    return {
      level,
      currentXP: xp - totalXP,
      xpToNext: xpRequired - (xp - totalXP),
      title: getLevelTitle(level)
    }
  }

  const getLevelTitle = (level: number) => {
    if (level >= 50) return 'Health Guru'
    if (level >= 40) return 'Wellness Master'
    if (level >= 30) return 'Health Expert'
    if (level >= 20) return 'Wellness Warrior'
    if (level >= 15) return 'Health Enthusiast'
    if (level >= 10) return 'Wellness Seeker'
    if (level >= 5) return 'Health Explorer'
    return 'Health Novice'
  }

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600'
      case 'rare': return 'from-blue-400 to-blue-600'
      case 'epic': return 'from-purple-400 to-purple-600'
      case 'legendary': return 'from-yellow-400 to-yellow-600'
    }
  }

  const getRarityBorder = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'border-gray-300'
      case 'rare': return 'border-blue-300'
      case 'epic': return 'border-purple-300'
      case 'legendary': return 'border-yellow-300'
    }
  }

  useEffect(() => {
    const totalXP = calculateTotalXP()
    setUserLevel(calculateLevel(totalXP))
  }, [symptomLogs, habitLogs])

  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0)

  return (
    <div className="space-y-8">
      {/* Level Progress */}
      <div className="card card-3d p-8 text-center gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Crown className="h-8 w-8 text-yellow-500 mr-3" />
            <h2 className="text-3xl font-bold text-foreground">Level {userLevel.level}</h2>
          </div>
          
          <div className="text-xl text-primary-600 dark:text-primary-400 font-semibold mb-6">
            {userLevel.title}
          </div>

          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{userLevel.currentXP} XP</span>
              <span>{userLevel.currentXP + userLevel.xpToNext} XP</span>
            </div>
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-1000"
                style={{ width: `${(userLevel.currentXP / (userLevel.currentXP + userLevel.xpToNext)) * 100}%` }}
              />
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {userLevel.xpToNext} XP to next level
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{unlockedAchievements.length}</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{Math.round((unlockedAchievements.length / achievements.length) * 100)}%</div>
              <div className="text-sm text-muted-foreground">Completion</div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div>
        <div className="flex items-center mb-6">
          <Trophy className="h-6 w-6 text-yellow-500 mr-3" />
          <h3 className="text-2xl font-semibold text-foreground">Achievements</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`card p-6 transition-all duration-300 ${
                achievement.unlocked 
                  ? `border-2 ${getRarityBorder(achievement.rarity)} shadow-glow hover:scale-105` 
                  : 'opacity-60 hover:opacity-80'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} flex items-center justify-center mr-4`}>
                  <achievement.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                  <div className="text-xs text-muted-foreground capitalize">{achievement.rarity}</div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{achievement.progress}/{achievement.maxProgress}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} transition-all duration-500`}
                    style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">
                  {achievement.points} XP
                </span>
                {achievement.unlocked && (
                  <div className="flex items-center text-green-600">
                    <Award className="h-4 w-4 mr-1" />
                    <span className="text-xs">Unlocked!</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Challenges */}
      <div className="card p-8 gradient-bg">
        <div className="flex items-center mb-6">
          <Target className="h-6 w-6 text-accent-500 mr-3" />
          <h3 className="text-2xl font-semibold text-foreground">Daily Challenges</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center mb-3">
              <Zap className="h-5 w-5 text-blue-500 mr-2" />
              <h4 className="font-semibold text-foreground">Hydration Goal</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Drink 8 glasses of water today</p>
            <div className="text-xs text-muted-foreground">Reward: 25 XP</div>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center mb-3">
              <Star className="h-5 w-5 text-purple-500 mr-2" />
              <h4 className="font-semibold text-foreground">Mood Tracking</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Log your mood and symptoms</p>
            <div className="text-xs text-muted-foreground">Reward: 20 XP</div>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center mb-3">
              <Gift className="h-5 w-5 text-green-500 mr-2" />
              <h4 className="font-semibold text-foreground">Mindfulness</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Complete a 5-minute meditation</p>
            <div className="text-xs text-muted-foreground">Reward: 30 XP</div>
          </div>
        </div>
      </div>
    </div>
  )
}