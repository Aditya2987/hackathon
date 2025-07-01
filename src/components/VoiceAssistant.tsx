import React, { useState, useEffect } from 'react'
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react'

interface VoiceCommand {
  command: string
  action: () => void
  description: string
}

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    setIsSupported(!!SpeechRecognition)
  }, [])

  const voiceCommands: VoiceCommand[] = [
    {
      command: 'log symptoms',
      action: () => window.location.href = '/dashboard/log',
      description: 'Navigate to symptom logging'
    },
    {
      command: 'show trends',
      action: () => window.location.href = '/dashboard/trends',
      description: 'View health trends'
    },
    {
      command: 'start meditation',
      action: () => window.location.href = '/dashboard/mindfulness',
      description: 'Open mindfulness center'
    },
    {
      command: 'check symptoms',
      action: () => window.location.href = '/disease-checker',
      description: 'Open disease checker'
    }
  ]

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
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
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
      speak("I'm listening. How can I help with your health today?")
    }

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase()
      setTranscript(command)
      
      // Find matching command
      const matchedCommand = voiceCommands.find(cmd => 
        command.includes(cmd.command.toLowerCase())
      )

      if (matchedCommand) {
        speak(`Opening ${matchedCommand.description}`)
        setTimeout(() => matchedCommand.action(), 1000)
      } else {
        speak("I didn't understand that command. Try saying 'log symptoms', 'show trends', 'start meditation', or 'check symptoms'.")
      }
    }

    recognition.onerror = () => {
      speak("Sorry, I couldn't hear you clearly. Please try again.")
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
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
        {/* Voice Assistant Button */}
        <button
          onClick={isListening ? stopListening : startListening}
          className={`w-16 h-16 rounded-full shadow-3d hover:shadow-3d-hover transition-all duration-300 flex items-center justify-center ${
            isListening 
              ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse' 
              : 'bg-gradient-to-r from-purple-500 to-purple-600'
          }`}
        >
          {isListening ? (
            <MicOff className="h-8 w-8 text-white" />
          ) : (
            <Mic className="h-8 w-8 text-white" />
          )}
        </button>

        {/* Speaking Indicator */}
        {isSpeaking && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
            <Volume2 className="h-4 w-4 text-white" />
          </div>
        )}

        {/* Listening Indicator */}
        {isListening && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-4 py-2 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-foreground">Listening...</span>
            </div>
          </div>
        )}

        {/* Transcript Display */}
        {transcript && (
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-4 py-2 shadow-lg max-w-xs">
            <p className="text-sm text-foreground">"{transcript}"</p>
          </div>
        )}
      </div>

      {/* Help Tooltip */}
      <div className="absolute bottom-20 left-0 bg-card border border-border rounded-lg p-4 shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300 w-64">
        <h4 className="font-semibold text-foreground mb-2">Voice Commands:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• "Log symptoms"</li>
          <li>• "Show trends"</li>
          <li>• "Start meditation"</li>
          <li>• "Check symptoms"</li>
        </ul>
      </div>
    </div>
  )
}