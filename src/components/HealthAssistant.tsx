import React, { useState, useEffect } from 'react'
import { MessageCircle, Bot, User, Send, X, Sparkles, Heart, Brain } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const healthResponses = {
  greeting: [
    "Hello! I'm your AI Health Assistant. How can I help you today?",
    "Hi there! I'm here to support your health journey. What would you like to know?",
    "Welcome! I'm your personal health companion. How are you feeling today?"
  ],
  symptoms: [
    "I understand you're experiencing symptoms. While I can provide general information, please consult a healthcare professional for proper diagnosis.",
    "Symptoms can be concerning. I recommend tracking them in your daily log and speaking with a doctor if they persist.",
    "Thank you for sharing. Remember, consistent tracking helps identify patterns. Consider using our symptom checker for more insights."
  ],
  habits: [
    "Great question about healthy habits! Small consistent changes make the biggest impact on your health.",
    "Building healthy habits is a journey. Start with one habit at a time and gradually build your routine.",
    "I'm glad you're focusing on healthy habits! They're the foundation of long-term wellness."
  ],
  mental_health: [
    "Mental health is just as important as physical health. Consider practicing mindfulness, getting adequate sleep, and staying connected with loved ones.",
    "Taking care of your mental wellbeing is crucial. Regular exercise, good sleep, and stress management techniques can help significantly.",
    "Your mental health matters. If you're struggling, please reach out to a mental health professional or trusted friend."
  ],
  default: [
    "That's an interesting question! While I can provide general health information, always consult healthcare professionals for medical advice.",
    "I'm here to support your health journey with general guidance. For specific medical concerns, please speak with a healthcare provider.",
    "Thanks for asking! Remember, I provide general wellness information. For medical issues, professional consultation is always best."
  ]
}

export default function HealthAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(healthResponses.greeting[0])
    }
  }, [isOpen])

  const addBotMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date()
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
    
    if (input.includes('symptom') || input.includes('pain') || input.includes('sick') || input.includes('hurt')) {
      return healthResponses.symptoms[Math.floor(Math.random() * healthResponses.symptoms.length)]
    }
    
    if (input.includes('habit') || input.includes('exercise') || input.includes('diet') || input.includes('sleep') || input.includes('water')) {
      return healthResponses.habits[Math.floor(Math.random() * healthResponses.habits.length)]
    }
    
    if (input.includes('stress') || input.includes('anxiety') || input.includes('mental') || input.includes('mood') || input.includes('depression')) {
      return healthResponses.mental_health[Math.floor(Math.random() * healthResponses.mental_health.length)]
    }
    
    return healthResponses.default[Math.floor(Math.random() * healthResponses.default.length)]
  }

  const handleSend = () => {
    if (!inputText.trim()) return

    addUserMessage(inputText)
    setInputText('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getResponse(inputText)
      addBotMessage(response)
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-3d hover:shadow-3d-hover transition-all duration-300 flex items-center justify-center z-50 floating-element"
      >
        <MessageCircle className="h-8 w-8" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-card border border-border rounded-xl shadow-3d-hover z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Health Assistant</h3>
                <p className="text-xs text-primary-100">Always here to help</p>
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
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-start">
                    {message.sender === 'bot' && (
                      <Bot className="h-4 w-4 mr-2 mt-0.5 text-primary-500" />
                    )}
                    <p className="text-sm">{message.text}</p>
                    {message.sender === 'user' && (
                      <User className="h-4 w-4 ml-2 mt-0.5" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-3 rounded-lg">
                  <div className="flex items-center">
                    <Bot className="h-4 w-4 mr-2 text-primary-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your health..."
                className="flex-1 input text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="btn btn-primary p-2 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}