import React, { useState, useEffect } from 'react'
import { Mic, MicOff, Volume2, VolumeX, Brain, Zap, Shield } from 'lucide-react'

interface VoiceCommand {
  command: string
  action: () => void
  description: string
  category: string
}

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const [confidence, setConfidence] = useState(0)
  const [lastCommand, setLastCommand] = useState('')

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    setIsSupported(!!SpeechRecognition)
  }, [])

  const voiceCommands: VoiceCommand[] = [
    {
      command: 'log symptoms',
      action: () => window.location.href = '/dashboard/log',
      description: 'Navigate to symptom logging',
      category: 'Health Tracking'
    },
    {
      command: 'show trends',
      action: () => window.location.href = '/dashboard/trends',
      description: 'View health trends and analytics',
      category: 'Analytics'
    },
    {
      command: 'start meditation',
      action: () => window.location.href = '/dashboard/mindfulness',
      description: 'Open mindfulness center',
      category: 'Wellness'
    },
    {
      command: 'check symptoms',
      action: () => window.location.href = '/disease-checker',
      description: 'Open AI disease checker',
      category: 'AI Diagnosis'
    },
    {
      command: 'health goals',
      action: () => window.location.href = '/dashboard/goals',
      description: 'Manage health goals',
      category: 'Goal Setting'
    },
    {
      command: 'track vitals',
      action: () => window.location.href = '/dashboard/metrics',
      description: 'Record vital signs',
      category: 'Health Metrics'
    },
    {
      command: 'take quiz',
      action: () => window.location.href = '/quiz',
      description: 'Start health knowledge quiz',
      category: 'Education'
    },
    {
      command: 'dashboard',
      action: () => window.location.href = '/dashboard',
      description: 'Go to main dashboard',
      category: 'Navigation'
    }
  ]

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.1
      utterance.volume = 0.8
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if (!isSupported) {
      speak("Sorry, voice recognition is not supported in your browser.")
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 3

    recognition.onstart = () => {
      setIsListening(true)
      speak("I'm listening. How can I help with your health today?")
    }

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1]
      const command = result[0].transcript.toLowerCase()
      const confidenceScore = result[0].confidence
      
      setTranscript(command)
      setConfidence(confidenceScore)
      
      if (result.isFinal) {
        // Find matching command with fuzzy matching
        const matchedCommand = voiceCommands.find(cmd => {
          const cmdWords = cmd.command.toLowerCase().split(' ')
          const inputWords = command.split(' ')
          
          // Check if at least 70% of command words are present
          const matchCount = cmdWords.filter(word => 
            inputWords.some(inputWord => 
              inputWord.includes(word) || word.includes(inputWord)
            )
          ).length
          
          return (matchCount / cmdWords.length) >= 0.7
        })

        if (matchedCommand) {
          setLastCommand(matchedCommand.command)
          speak(`Understood. ${matchedCommand.description}. Opening now.`)
          setTimeout(() => matchedCommand.action(), 1500)
        } else {
          // Try partial matches for common health terms
          if (command.includes('help') || command.includes('what can you do')) {
            speak("I can help you log symptoms, check health trends, start meditation, analyze symptoms with AI, manage goals, track vitals, take health quizzes, or navigate to your dashboard. Just say what you need!")
          } else if (command.includes('pain') || command.includes('hurt') || command.includes('sick')) {
            speak("I detected you mentioned symptoms. Opening the symptom checker to help analyze your condition.")
            setTimeout(() => window.location.href = '/disease-checker', 1500)
          } else if (command.includes('stress') || command.includes('anxious') || command.includes('calm')) {
            speak("I understand you need relaxation. Opening the mindfulness center for guided meditation.")
            setTimeout(() => window.location.href = '/dashboard/mindfulness', 1500)
          } else {
            speak(`I heard "${command}" but didn't recognize that command. Try saying 'log symptoms', 'show trends', 'start meditation', 'check symptoms', 'health goals', 'track vitals', 'take quiz', or 'dashboard'.`)
          }
        }
      }
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      if (event.error === 'no-speech') {
        speak("I didn't hear anything. Please try again.")
      } else if (event.error === 'network') {
        speak("Network error. Please check your connection and try again.")
      } else {
        speak("Sorry, I couldn't process that. Please try again.")
      }
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
      setTranscript('')
    }

    recognition.start()
  }

  const stopListening = () => {
    setIsListening(false)
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <div className="fixed bottom-24 left-6 z-50">
      <div className="relative">
        {/* Enhanced Voice Assistant Button */}
        <button
          onClick={isListening ? stopListening : startListening}
          className={`w-16 h-16 rounded-full shadow-3d hover:shadow-3d-hover transition-all duration-300 flex items-center justify-center group ${
            isListening 
              ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse' 
              : 'bg-gradient-to-r from-purple-500 to-purple-600'
          }`}
        >
          {isListening ? (
            <MicOff className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
          ) : (
            <Mic className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
          )}
        </button>

        {/* AI Badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <Brain className="h-3 w-3 text-white" />
        </div>

        {/* Speaking Indicator */}
        {isSpeaking && (
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
            <Volume2 className="h-4 w-4 text-white" />
          </div>
        )}

        {/* Enhanced Listening Indicator */}
        {isListening && (
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-4 py-3 shadow-lg min-w-[200px]">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-foreground font-medium">Listening...</span>
              <Zap className="h-4 w-4 text-yellow-500" />
            </div>
            {confidence > 0 && (
              <div className="text-xs text-muted-foreground">
                Confidence: {Math.round(confidence * 100)}%
              </div>
            )}
          </div>
        )}

        {/* Enhanced Transcript Display */}
        {transcript && (
          <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-4 py-3 shadow-lg max-w-xs">
            <div className="flex items-center mb-2">
              <Brain className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-xs font-medium text-foreground">Processing...</span>
            </div>
            <p className="text-sm text-foreground">"{transcript}"</p>
            {confidence > 0 && (
              <div className="mt-2 w-full bg-muted rounded-full h-1">
                <div 
                  className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${confidence * 100}%` }}
                />
              </div>
            )}
          </div>
        )}

        {/* Last Command Confirmation */}
        {lastCommand && !isListening && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg px-3 py-2 shadow-lg">
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-xs text-green-800 dark:text-green-200">✓ {lastCommand}</span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Help Tooltip */}
      <div className="absolute bottom-20 left-0 bg-card border border-border rounded-lg p-4 shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300 w-80 pointer-events-none hover:pointer-events-auto">
        <div className="flex items-center mb-3">
          <Brain className="h-5 w-5 text-purple-500 mr-2" />
          <h4 className="font-semibold text-foreground">AI Voice Commands</h4>
        </div>
        <div className="space-y-2">
          {voiceCommands.slice(0, 6).map((cmd, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-xs text-foreground font-medium">"{cmd.command}"</span>
              <span className="text-xs text-muted-foreground">{cmd.category}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-border">
          <div className="flex items-center text-xs text-muted-foreground">
            <Zap className="h-3 w-3 mr-1 text-yellow-500" />
            Advanced AI • Natural Language Processing
          </div>
        </div>
      </div>
    </div>
  )
}