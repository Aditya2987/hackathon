import React, { useState, useEffect } from 'react'
import { Brain, Play, Pause, RotateCcw, Sparkles, Wind, Heart } from 'lucide-react'

interface Exercise {
  id: string
  name: string
  description: string
  duration: number
  type: 'breathing' | 'meditation' | 'visualization'
  instructions: string[]
}

const exercises: Exercise[] = [
  {
    id: '1',
    name: '4-7-8 Breathing',
    description: 'A powerful technique to reduce anxiety and promote relaxation',
    duration: 240,
    type: 'breathing',
    instructions: [
      'Sit comfortably with your back straight',
      'Place your tongue against the roof of your mouth',
      'Exhale completely through your mouth',
      'Inhale through your nose for 4 counts',
      'Hold your breath for 7 counts',
      'Exhale through your mouth for 8 counts',
      'Repeat this cycle 4 times'
    ]
  },
  {
    id: '2',
    name: 'Body Scan Meditation',
    description: 'Progressive relaxation to release tension and increase awareness',
    duration: 600,
    type: 'meditation',
    instructions: [
      'Lie down comfortably on your back',
      'Close your eyes and take three deep breaths',
      'Start by focusing on your toes',
      'Notice any sensations without judgment',
      'Slowly move your attention up through your body',
      'Spend 30 seconds on each body part',
      'End by taking three deep breaths'
    ]
  },
  {
    id: '3',
    name: 'Peaceful Garden Visualization',
    description: 'Imagine a serene place to reduce stress and anxiety',
    duration: 480,
    type: 'visualization',
    instructions: [
      'Sit or lie down in a comfortable position',
      'Close your eyes and breathe naturally',
      'Imagine walking into a beautiful garden',
      'Notice the colors, sounds, and scents around you',
      'Find a peaceful spot to sit and rest',
      'Feel the warmth of the sun on your skin',
      'Stay in this peaceful place as long as you need'
    ]
  }
]

export default function MindfulnessCenter() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false)
      alert('🎉 Great job! You completed the mindfulness exercise. How do you feel?')
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setTimeLeft(exercise.duration)
    setCurrentStep(0)
    setIsActive(true)
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(selectedExercise?.duration || 0)
    setCurrentStep(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getExerciseIcon = (type: string) => {
    switch (type) {
      case 'breathing': return <Wind className="h-6 w-6" />
      case 'meditation': return <Brain className="h-6 w-6" />
      case 'visualization': return <Sparkles className="h-6 w-6" />
      default: return <Heart className="h-6 w-6" />
    }
  }

  const getExerciseColor = (type: string) => {
    switch (type) {
      case 'breathing': return 'from-blue-500 to-cyan-500'
      case 'meditation': return 'from-purple-500 to-pink-500'
      case 'visualization': return 'from-green-500 to-emerald-500'
      default: return 'from-primary-500 to-primary-600'
    }
  }

  if (selectedExercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={() => setSelectedExercise(null)}
              className="btn btn-outline mb-6"
            >
              ← Back to Exercises
            </button>
            <h1 className="text-4xl font-bold text-foreground mb-4">{selectedExercise.name}</h1>
            <p className="text-xl text-muted-foreground">{selectedExercise.description}</p>
          </div>

          {/* Timer Circle */}
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-64">
              <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className="text-primary-500"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - (selectedExercise.duration - timeLeft) / selectedExercise.duration)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isActive ? 'In Progress' : 'Paused'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={toggleTimer}
              className="btn btn-primary btn-3d px-8 py-4 text-lg"
            >
              {isActive ? <Pause className="h-6 w-6 mr-2" /> : <Play className="h-6 w-6 mr-2" />}
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTimer}
              className="btn btn-outline btn-3d px-8 py-4 text-lg"
            >
              <RotateCcw className="h-6 w-6 mr-2" />
              Reset
            </button>
          </div>

          {/* Instructions */}
          <div className="card p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Instructions</h3>
            <div className="space-y-4">
              {selectedExercise.instructions.map((instruction, index) => (
                <div
                  key={index}
                  className={`flex items-start p-4 rounded-lg transition-all duration-300 ${
                    index === currentStep && isActive
                      ? 'bg-primary/10 border-2 border-primary scale-105'
                      : 'bg-muted/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold ${
                    index === currentStep && isActive
                      ? 'bg-primary text-white'
                      : 'bg-muted-foreground/20 text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <p className="text-foreground leading-relaxed">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="floating-element mb-6">
          <Brain className="h-16 w-16 text-primary-500 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Mindfulness Center</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Take a moment to breathe, relax, and center yourself with guided mindfulness exercises.
        </p>
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="card card-3d p-6 text-center group hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => startExercise(exercise)}
          >
            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getExerciseColor(exercise.type)} flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
              {getExerciseIcon(exercise.type)}
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">{exercise.name}</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">{exercise.description}</p>
            <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
              <span>{Math.floor(exercise.duration / 60)} minutes</span>
            </div>
            <button className="btn btn-primary w-full group-hover:shadow-glow transition-all duration-300">
              Start Exercise
            </button>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="card p-8 gradient-bg">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Benefits of Mindfulness</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="h-6 w-6 text-blue-500" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Reduces Stress</h4>
            <p className="text-sm text-muted-foreground">Lower cortisol levels and improved stress management</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="h-6 w-6 text-green-500" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Better Sleep</h4>
            <p className="text-sm text-muted-foreground">Improved sleep quality and faster sleep onset</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-6 w-6 text-purple-500" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Enhanced Focus</h4>
            <p className="text-sm text-muted-foreground">Improved concentration and mental clarity</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Wind className="h-6 w-6 text-orange-500" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Emotional Balance</h4>
            <p className="text-sm text-muted-foreground">Better emotional regulation and resilience</p>
          </div>
        </div>
      </div>
    </div>
  )
}