import React, { useState, useEffect } from 'react'
import { Target, Plus, Check, X, Trophy, Calendar, TrendingUp, Star } from 'lucide-react'

interface Goal {
  id: string
  title: string
  description: string
  category: 'fitness' | 'nutrition' | 'mental' | 'sleep' | 'habits'
  target: number
  current: number
  unit: string
  deadline: string
  completed: boolean
  createdAt: string
}

const goalTemplates = [
  { title: 'Drink 8 glasses of water daily', category: 'nutrition', target: 8, unit: 'glasses' },
  { title: 'Walk 10,000 steps daily', category: 'fitness', target: 10000, unit: 'steps' },
  { title: 'Sleep 8 hours nightly', category: 'sleep', target: 8, unit: 'hours' },
  { title: 'Meditate 10 minutes daily', category: 'mental', target: 10, unit: 'minutes' },
  { title: 'Exercise 5 times per week', category: 'fitness', target: 5, unit: 'sessions' },
]

export default function HealthGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'fitness' as Goal['category'],
    target: 0,
    unit: '',
    deadline: ''
  })

  useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = () => {
    try {
      const saved = localStorage.getItem('healthGoals')
      if (saved) {
        setGoals(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Error loading goals:', error)
    }
  }

  const saveGoals = (updatedGoals: Goal[]) => {
    setGoals(updatedGoals)
    localStorage.setItem('healthGoals', JSON.stringify(updatedGoals))
  }

  const addGoal = () => {
    if (!newGoal.title || !newGoal.target || !newGoal.deadline) return

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      target: newGoal.target,
      current: 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      completed: false,
      createdAt: new Date().toISOString()
    }

    saveGoals([...goals, goal])
    setNewGoal({
      title: '',
      description: '',
      category: 'fitness',
      target: 0,
      unit: '',
      deadline: ''
    })
    setShowAddForm(false)
  }

  const updateProgress = (goalId: string, newCurrent: number) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const completed = newCurrent >= goal.target
        return { ...goal, current: newCurrent, completed }
      }
      return goal
    })
    saveGoals(updatedGoals)
  }

  const deleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId)
    saveGoals(updatedGoals)
  }

  const useTemplate = (template: typeof goalTemplates[0]) => {
    setNewGoal({
      title: template.title,
      description: '',
      category: template.category as Goal['category'],
      target: template.target,
      unit: template.unit,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })
    setShowAddForm(true)
  }

  const getCategoryColor = (category: Goal['category']) => {
    switch (category) {
      case 'fitness': return 'bg-blue-500'
      case 'nutrition': return 'bg-green-500'
      case 'mental': return 'bg-purple-500'
      case 'sleep': return 'bg-indigo-500'
      case 'habits': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryIcon = (category: Goal['category']) => {
    switch (category) {
      case 'fitness': return '💪'
      case 'nutrition': return '🥗'
      case 'mental': return '🧠'
      case 'sleep': return '😴'
      case 'habits': return '✨'
      default: return '🎯'
    }
  }

  const completedGoals = goals.filter(goal => goal.completed).length
  const totalGoals = goals.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="floating-element mb-6">
          <Target className="h-16 w-16 text-primary-500 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Health Goals</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Set meaningful health goals and track your progress towards a healthier lifestyle.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 text-center">
          <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-foreground mb-1">{completedGoals}</div>
          <div className="text-muted-foreground">Goals Completed</div>
        </div>
        <div className="card p-6 text-center">
          <Target className="h-8 w-8 text-primary-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-foreground mb-1">{totalGoals}</div>
          <div className="text-muted-foreground">Total Goals</div>
        </div>
        <div className="card p-6 text-center">
          <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-foreground mb-1">
            {totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0}%
          </div>
          <div className="text-muted-foreground">Success Rate</div>
        </div>
      </div>

      {/* Add Goal Button */}
      <div className="text-center">
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary btn-3d px-8 py-4 text-lg"
        >
          <Plus className="h-6 w-6 mr-2" />
          Add New Goal
        </button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <div className="card p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-foreground">Create New Goal</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Goal Templates */}
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Quick Templates</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {goalTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => useTemplate(template)}
                  className="p-3 text-left bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{getCategoryIcon(template.category as Goal['category'])}</span>
                    <span className="text-sm font-medium text-foreground">{template.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Goal Title</label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="input w-full"
                placeholder="e.g., Walk 10,000 steps daily"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as Goal['category'] })}
                className="input w-full"
              >
                <option value="fitness">Fitness</option>
                <option value="nutrition">Nutrition</option>
                <option value="mental">Mental Health</option>
                <option value="sleep">Sleep</option>
                <option value="habits">Habits</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Target</label>
              <input
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 0 })}
                className="input w-full"
                placeholder="10000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Unit</label>
              <input
                type="text"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                className="input w-full"
                placeholder="steps, glasses, hours, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Deadline</label>
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description (Optional)</label>
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                className="input w-full min-h-[80px] resize-none"
                placeholder="Additional details about your goal..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowAddForm(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              onClick={addGoal}
              className="btn btn-primary"
            >
              Create Goal
            </button>
          </div>
        </div>
      )}

      {/* Goals List */}
      {goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-10 h-10 ${getCategoryColor(goal.category)} rounded-full flex items-center justify-center text-white mr-3`}>
                    <span className="text-lg">{getCategoryIcon(goal.category)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{goal.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {goal.description && (
                <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
              )}

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      goal.completed ? 'bg-green-500' : 'bg-primary-500'
                    }`}
                    style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.round((goal.current / goal.target) * 100)}% complete
                </div>
              </div>

              {/* Update Progress */}
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="number"
                  value={goal.current}
                  onChange={(e) => updateProgress(goal.id, parseInt(e.target.value) || 0)}
                  className="input flex-1 text-sm"
                  placeholder="Current progress"
                />
                <span className="text-sm text-muted-foreground">{goal.unit}</span>
              </div>

              {/* Deadline */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  Due: {new Date(goal.deadline).toLocaleDateString()}
                </div>
                {goal.completed && (
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-1" />
                    Completed!
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Goals Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start your health journey by setting your first goal!
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Your First Goal
          </button>
        </div>
      )}
    </div>
  )
}