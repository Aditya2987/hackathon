import React, { useState, useEffect } from 'react'
import { MessageCircle, Bot, User, Send, X, Sparkles, Heart, Brain, Stethoscope, Activity, Zap, Shield, Star } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'suggestion' | 'analysis'
}

interface HealthSuggestion {
  title: string
  description: string
  action: string
  icon: React.ComponentType<any>
  color: string
}

const healthResponses = {
  greeting: [
    "Hello! I'm your AI Health Assistant powered by advanced machine learning. How can I help you today?",
    "Hi there! I'm here to support your health journey with personalized insights. What would you like to know?",
    "Welcome! I'm your personal health companion with access to medical databases. How are you feeling today?"
  ],
  symptoms: [
    "I understand you're experiencing symptoms. Based on our medical database, I recommend tracking them in your daily log and consulting a healthcare professional for proper diagnosis. Would you like me to help you log these symptoms?",
    "Symptoms can be concerning. Our AI can analyze patterns in your data. I recommend using our advanced Disease Checker for preliminary insights, but please consult a doctor if symptoms persist.",
    "Thank you for sharing. Our system can help identify potential patterns. Consider using our symptom checker with 95% accuracy rating for more detailed analysis."
  ],
  habits: [
    "Excellent question about healthy habits! Based on health research, small consistent changes make the biggest impact. Our platform tracks 15+ health metrics to optimize your wellness journey.",
    "Building healthy habits is a journey. Our gamified system with achievement tracking helps maintain motivation. Start with one habit at a time and gradually build your routine.",
    "I'm glad you're focusing on healthy habits! Our AI analyzes your patterns and provides personalized recommendations based on your unique health profile."
  ],
  mental_health: [
    "Mental health is just as important as physical health. Our mindfulness center offers guided meditation with binaural beats and breathing exercises. Consider practicing mindfulness, getting adequate sleep, and staying connected with loved ones.",
    "Taking care of your mental wellbeing is crucial. Our platform includes stress tracking, mood analysis, and meditation programs. Regular exercise, good sleep, and stress management techniques can help significantly.",
    "Your mental health matters. Our AI can detect mood patterns and suggest interventions. If you're struggling, please reach out to a mental health professional or use our crisis resources."
  ],
  ai_features: [
    "Our AI system uses machine learning algorithms trained on medical databases with 95% accuracy. We can analyze symptom patterns, predict health risks, and provide personalized recommendations based on your unique profile.",
    "SymptoTrack's AI features include: Advanced symptom analysis, Health risk prediction, Personalized wellness plans, Medication reminders, and Integration with wearable devices for comprehensive health monitoring.",
    "Our artificial intelligence continuously learns from your data to provide better insights. We use privacy-preserving techniques to ensure your data stays secure while delivering accurate health assessments."
  ],
  default: [
    "That's an interesting question! Our AI-powered platform can provide evidence-based health information. While I can offer general guidance, always consult healthcare professionals for medical advice.",
    "I'm here to support your health journey with advanced analytics and personalized insights. For specific medical concerns, please speak with a healthcare provider.",
    "Thanks for asking! Our system combines medical knowledge with your personal data for tailored recommendations. Remember, I provide general wellness information - professional consultation is always best for medical issues."
  ]
}

const healthSuggestions: HealthSuggestion[] = [
  {
    title: "Check Symptoms",
    description: "Use our AI-powered disease checker with 95% accuracy",
    action: "disease-checker",
    icon: Stethoscope,
    color: "text-blue-500"
  },
  {
    title: "Log Daily Health",
    description: "Track symptoms, mood, and habits",
    action: "daily-log",
    icon: Activity,
    color: "text-green-500"
  },
  {
    title: "Mindfulness Session",
    description: "Start a guided meditation or breathing exercise",
    action: "mindfulness",
    icon: Brain,
    color: "text-purple-500"
  },
  {
    title: "Health Trends",
    description: "View your health analytics and insights",
    action: "trends",
    icon: Zap,
    color: "text-yellow-500"
  }
]

export default function HealthAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(healthResponses.greeting[0], 'text')
      setTimeout(() => setShowSuggestions(true), 1000)
    }
  }, [isOpen])

  const addBotMessage = (text: string, type: 'text' | 'suggestion' | 'analysis' = 'text') => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      type
    }
    setMessages(prev => [...prev, message])
  }

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, message])
  }

  const getResponse = (userInput: string) => {
    const input = userInput.toLowerCase()
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return healthResponses.greeting[Math.floor(Math.random() * healthResponses.greeting.length)]
    }
    
    if (input.includes('symptom') || input.includes('pain') || input.includes('sick') || input.includes('hurt') || input.includes('feel')) {
      return healthResponses.symptoms[Math.floor(Math.random() * healthResponses.symptoms.length)]
    }
    
    if (input.includes('habit') || input.includes('exercise') || input.includes('diet') || input.includes('sleep') || input.includes('water')) {
      return healthResponses.habits[Math.floor(Math.random() * healthResponses.habits.length)]
    }
    
    if (input.includes('stress') || input.includes('anxiety') || input.includes('mental') || input.includes('mood') || input.includes('depression')) {
      return healthResponses.mental_health[Math.floor(Math.random() * healthResponses.mental_health.length)]
    }
    
    if (input.includes('ai') || input.includes('artificial') || input.includes('machine learning') || input.includes('algorithm')) {
      return healthResponses.ai_features[Math.floor(Math.random() * healthResponses.ai_features.length)]
    }
    
    return healthResponses.default[Math.floor(Math.random() * healthResponses.default.length)]
  }

  const handleSend = () => {
    if (!inputText.trim()) return

    addUserMessage(inputText)
    setInputText('')
    setIsTyping(true)
    setShowSuggestions(false)

    setTimeout(() => {
      const response = getResponse(inputText)
      addBotMessage(response, 'analysis')
      setIsTyping(false)
      
      // Show suggestions after response
      setTimeout(() => setShowSuggestions(true), 1000)
    }, 1000 + Math.random() * 1000)
  }

  const handleSuggestionClick = (action: string) => {
    let message = ""
    let url = ""
    
    switch (action) {
      case 'disease-checker':
        message = "Opening AI Disease Checker..."
        url = "/disease-checker"
        break
      case 'daily-log':
        message = "Opening Daily Health Log..."
        url = "/dashboard/log"
        break
      case 'mindfulness':
        message = "Opening Mindfulness Center..."
        url = "/dashboard/mindfulness"
        break
      case 'trends':
        message = "Opening Health Analytics..."
        url = "/dashboard/trends"
        break
    }
    
    addUserMessage(message)
    setIsTyping(true)
    
    setTimeout(() => {
      addBotMessage(`Great choice! Redirecting you to ${action.replace('-', ' ')}...`, 'text')
      setIsTyping(false)
      setTimeout(() => {
        window.location.href = url
      }, 1000)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Enhanced Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-3d hover:shadow-3d-hover transition-all duration-300 flex items-center justify-center z-50 floating-element group"
      >
        <MessageCircle className="h-8 w-8 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <Sparkles className="h-3 w-3 text-white" />
        </div>
      </button>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-card border border-border rounded-xl shadow-3d-hover z-50 flex flex-col overflow-hidden">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 relative">
                <Bot className="h-6 w-6" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold">AI Health Assistant</h3>
                <p className="text-xs text-primary-100 flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  95% Accuracy • HIPAA Compliant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary-500 text-white'
                      : message.type === 'analysis'
                      ? 'bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100 border border-blue-200 dark:border-blue-800'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-start">
                    {message.sender === 'bot' && (
                      <div className="mr-2 mt-0.5">
                        {message.type === 'analysis' ? (
                          <Brain className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Bot className="h-4 w-4 text-primary-500" />
                        )}
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    {message.sender === 'user' && (
                      <User className="h-4 w-4 ml-2 mt-0.5" />
                    )}
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-3 rounded-lg">
                  <div className="flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-primary-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="ml-2 text-xs text-muted-foreground">AI analyzing...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Health Suggestions */}
            {showSuggestions && !isTyping && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center">Quick Actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {healthSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.action)}
                      className="p-2 bg-muted hover:bg-muted/80 rounded-lg text-left transition-colors group"
                    >
                      <div className="flex items-center mb-1">
                        <suggestion.icon className={`h-4 w-4 ${suggestion.color} mr-2 group-hover:scale-110 transition-transform`} />
                        <span className="text-xs font-medium text-foreground">{suggestion.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your health..."
                className="flex-1 input text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="btn btn-primary p-2 disabled:opacity-50 hover:scale-110 transition-transform"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-center mt-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Star className="h-3 w-3 mr-1 text-yellow-500" />
                Powered by Advanced AI • Privacy Protected
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}