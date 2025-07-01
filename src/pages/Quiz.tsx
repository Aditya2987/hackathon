import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Award, RefreshCw, Download, ArrowLeft, Home, User, Calendar, Trophy, Star } from 'lucide-react'
import { useData } from '../contexts/DataContext'

const quizQuestions = [
  {
    question: "How many glasses of water should you drink daily?",
    options: ["4-5 glasses", "6-7 glasses", "8-10 glasses", "12+ glasses"],
    correct: 2,
    category: "Hydration",
    explanation: "The general recommendation is 8-10 glasses (about 2-2.5 liters) of water daily, though individual needs may vary based on activity level, climate, and health conditions."
  },
  {
    question: "What is the recommended amount of sleep for adults?",
    options: ["5-6 hours", "7-9 hours", "10-12 hours", "4-5 hours"],
    correct: 1,
    category: "Sleep",
    explanation: "Adults should aim for 7-9 hours of quality sleep per night for optimal health, cognitive function, and immune system support."
  },
  {
    question: "How often should you wash your hands?",
    options: ["Once a day", "Only when dirty", "Frequently throughout the day", "Only before meals"],
    correct: 2,
    category: "Hygiene",
    explanation: "Frequent handwashing throughout the day is one of the most effective ways to prevent the spread of germs and infections."
  },
  {
    question: "What should you do first for a minor cut?",
    options: ["Apply bandage", "Clean the wound", "Apply antiseptic", "Leave it alone"],
    correct: 1,
    category: "First Aid",
    explanation: "Always clean the wound first with clean water to remove dirt and bacteria before applying any treatment or bandage."
  },
  {
    question: "How many servings of fruits and vegetables should you eat daily?",
    options: ["1-2 servings", "3-4 servings", "5-9 servings", "10+ servings"],
    correct: 2,
    category: "Nutrition",
    explanation: "Health experts recommend 5-9 servings of fruits and vegetables daily to ensure adequate vitamin, mineral, and fiber intake."
  },
  {
    question: "What is the recommended daily physical activity for adults?",
    options: ["10 minutes", "30 minutes", "60 minutes", "2 hours"],
    correct: 1,
    category: "Exercise",
    explanation: "Adults should aim for at least 30 minutes of moderate-intensity physical activity most days of the week for cardiovascular health."
  },
  {
    question: "How long should you wash your hands?",
    options: ["5 seconds", "10 seconds", "20 seconds", "30 seconds"],
    correct: 2,
    category: "Hygiene",
    explanation: "Washing hands for at least 20 seconds (about the time it takes to sing 'Happy Birthday' twice) ensures effective removal of germs."
  },
  {
    question: "What should you do if someone is choking?",
    options: ["Give them water", "Perform Heimlich maneuver", "Make them lie down", "Call for help only"],
    correct: 1,
    category: "First Aid",
    explanation: "The Heimlich maneuver (abdominal thrusts) is the most effective immediate response to help dislodge an object from someone's airway."
  }
]

export default function Quiz() {
  const { addQuizResult, quizResults } = useData()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userName, setUserName] = useState('')
  const [showNameInput, setShowNameInput] = useState(false)

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setShowExplanation(false)
  }

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    } else {
      finishQuiz()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowExplanation(false)
    }
  }

  const finishQuiz = () => {
    const score = selectedAnswers.reduce((total, answer, index) => {
      return total + (answer === quizQuestions[index].correct ? 1 : 0)
    }, 0)
    
    const today = new Date().toISOString().split('T')[0]
    addQuizResult({
      date: today,
      score,
      totalQuestions: quizQuestions.length,
      category: 'Health Awareness',
    })
    
    setShowResults(true)
  }

  const generateCertificate = () => {
    if (!userName.trim()) {
      setShowNameInput(true)
      return
    }

    const score = selectedAnswers.reduce((total, answer, index) => {
      return total + (answer === quizQuestions[index].correct ? 1 : 0)
    }, 0)
    
    const percentage = Math.round((score / quizQuestions.length) * 100)
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })

    // Create certificate HTML
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Health Awareness Certificate</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap');
          
          body {
            margin: 0;
            padding: 40px;
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .certificate {
            width: 800px;
            height: 600px;
            background: white;
            border: 20px solid #f8f9fa;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            position: relative;
            overflow: hidden;
          }
          
          .certificate::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
            opacity: 0.05;
          }
          
          .border-design {
            position: absolute;
            top: 30px;
            left: 30px;
            right: 30px;
            bottom: 30px;
            border: 3px solid #3b82f6;
            border-radius: 10px;
          }
          
          .content {
            position: relative;
            z-index: 2;
            text-align: center;
            padding: 60px 40px;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          
          .header {
            margin-bottom: 30px;
          }
          
          .logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
          }
          
          .title {
            font-family: 'Playfair Display', serif;
            font-size: 36px;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 10px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          }
          
          .subtitle {
            font-size: 18px;
            color: #6b7280;
            margin: 0 0 40px 0;
            font-weight: 500;
          }
          
          .recipient {
            margin-bottom: 30px;
          }
          
          .recipient-label {
            font-size: 16px;
            color: #6b7280;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 600;
          }
          
          .recipient-name {
            font-family: 'Playfair Display', serif;
            font-size: 42px;
            font-weight: 700;
            color: #1f2937;
            margin: 0;
            text-decoration: underline;
            text-decoration-color: #3b82f6;
            text-underline-offset: 8px;
          }
          
          .achievement {
            margin-bottom: 30px;
            line-height: 1.6;
          }
          
          .achievement-text {
            font-size: 18px;
            color: #374151;
            margin-bottom: 15px;
          }
          
          .score-badge {
            display: inline-block;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-size: 20px;
            font-weight: 700;
            margin: 10px 0;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          }
          
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: auto;
            padding-top: 30px;
            border-top: 2px solid #e5e7eb;
          }
          
          .date {
            font-size: 14px;
            color: #6b7280;
            font-weight: 500;
          }
          
          .signature {
            text-align: right;
          }
          
          .signature-line {
            width: 200px;
            height: 2px;
            background: #3b82f6;
            margin-bottom: 5px;
          }
          
          .signature-text {
            font-size: 14px;
            color: #6b7280;
            font-weight: 500;
          }
          
          .decorative-elements {
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            pointer-events: none;
          }
          
          .star {
            position: absolute;
            color: #fbbf24;
            font-size: 20px;
          }
          
          .star:nth-child(1) { top: 50px; left: 50px; }
          .star:nth-child(2) { top: 50px; right: 50px; }
          .star:nth-child(3) { bottom: 50px; left: 50px; }
          .star:nth-child(4) { bottom: 50px; right: 50px; }
          
          @media print {
            body { background: white; padding: 0; }
            .certificate { box-shadow: none; border: 2px solid #3b82f6; }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="border-design"></div>
          <div class="decorative-elements">
            <div class="star">★</div>
            <div class="star">★</div>
            <div class="star">★</div>
            <div class="star">★</div>
          </div>
          <div class="content">
            <div class="header">
              <div class="logo">❤️</div>
              <h1 class="title">Certificate of Achievement</h1>
              <p class="subtitle">Health Awareness Excellence</p>
            </div>
            
            <div class="recipient">
              <p class="recipient-label">This certifies that</p>
              <h2 class="recipient-name">${userName}</h2>
            </div>
            
            <div class="achievement">
              <p class="achievement-text">
                has successfully completed the <strong>SymptoTrack Health Awareness Quiz</strong><br>
                demonstrating excellent knowledge of health and wellness principles
              </p>
              <div class="score-badge">
                Score: ${score}/${quizQuestions.length} (${percentage}%)
              </div>
            </div>
            
            <div class="footer">
              <div class="date">
                <strong>Date:</strong> ${date}
              </div>
              <div class="signature">
                <div class="signature-line"></div>
                <p class="signature-text">SymptoTrack Health Platform</p>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Create and download the certificate
    const blob = new Blob([certificateHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Health_Certificate_${userName.replace(/\s+/g, '_')}_${new Date().getTime()}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setShowNameInput(false)
  }

  const getScoreMessage = () => {
    const score = selectedAnswers.reduce((total, answer, index) => {
      return total + (answer === quizQuestions[index].correct ? 1 : 0)
    }, 0)
    const percentage = (score / quizQuestions.length) * 100
    
    if (percentage >= 90) return { message: "Outstanding! You're a health expert! 🌟", color: "text-green-600", badge: "Expert Level" }
    if (percentage >= 70) return { message: "Excellent! You have solid health knowledge! 👏", color: "text-blue-600", badge: "Advanced Level" }
    if (percentage >= 50) return { message: "Good effort! Keep learning about health! 👍", color: "text-yellow-600", badge: "Intermediate Level" }
    return { message: "Keep learning! Every step counts! 📚", color: "text-orange-600", badge: "Beginner Level" }
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card shadow-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <div className="ml-6 flex items-center">
                <Brain className="h-8 w-8 text-accent-500" />
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-foreground">Health Quiz</h1>
                  <p className="text-sm text-muted-foreground">Test Your Health Knowledge</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Hero Section */}
          <div className="card p-12 text-center gradient-bg relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-10"></div>
            <div className="relative z-10">
              <div className="floating-element mb-6">
                <Brain className="h-20 w-20 text-accent-500 mx-auto" />
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4">Health Awareness Quiz</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Test your knowledge on important health topics including nutrition, exercise, hygiene, and first aid. 
                Complete the quiz to earn a personalized certificate and improve your health literacy!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={startQuiz} className="btn btn-primary btn-3d px-8 py-4 text-lg">
                  <Brain className="mr-2 h-6 w-6" />
                  Start Quiz
                </button>
                <Link to="/dashboard" className="btn btn-outline btn-3d px-8 py-4 text-lg">
                  <Home className="mr-2 h-6 w-6" />
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Quiz Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card p-6 text-center hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-primary-500 mb-2">{quizQuestions.length}</div>
              <div className="text-muted-foreground">Questions</div>
            </div>
            <div className="card p-6 text-center hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-secondary-500 mb-2">~5</div>
              <div className="text-muted-foreground">Minutes</div>
            </div>
            <div className="card p-6 text-center hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-accent-500 mb-2">🏆</div>
              <div className="text-muted-foreground">Certificate</div>
            </div>
            <div className="card p-6 text-center hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-green-500 mb-2">📊</div>
              <div className="text-muted-foreground">Progress Tracking</div>
            </div>
          </div>

          {/* Previous Results */}
          {quizResults.length > 0 && (
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-accent-500" />
                Your Achievement History
              </h3>
              <div className="space-y-3">
                {quizResults.slice(-5).reverse().map((result, index) => (
                  <div key={result.id} className="flex justify-between items-center py-3 px-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">
                        {new Date(result.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-foreground font-medium">
                        {result.score}/{result.totalQuestions}
                      </span>
                      <span className={`font-semibold px-2 py-1 rounded-full text-sm ${
                        Math.round((result.score / result.totalQuestions) * 100) >= 80 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : Math.round((result.score / result.totalQuestions) * 100) >= 60
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {Math.round((result.score / result.totalQuestions) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (showResults) {
    const score = selectedAnswers.reduce((total, answer, index) => {
      return total + (answer === quizQuestions[index].correct ? 1 : 0)
    }, 0)
    const scoreMessage = getScoreMessage()

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card shadow-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <div className="ml-6 flex items-center">
                <Award className="h-8 w-8 text-accent-500" />
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-foreground">Quiz Complete!</h1>
                  <p className="text-sm text-muted-foreground">Congratulations on completing the quiz</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Results Card */}
          <div className="card p-12 text-center gradient-bg relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-10"></div>
            <div className="relative z-10">
              <div className="floating-element mb-6">
                <Award className="h-20 w-20 text-accent-500 mx-auto" />
              </div>
              <div className="text-6xl font-bold text-primary-500 mb-4">{score}/{quizQuestions.length}</div>
              <div className={`text-2xl font-semibold mb-4 ${scoreMessage.color}`}>{scoreMessage.message}</div>
              <div className="inline-block px-4 py-2 bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 rounded-full text-lg font-medium mb-8">
                {scoreMessage.badge}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button onClick={generateCertificate} className="btn btn-primary btn-3d flex items-center justify-center px-8 py-3 text-lg">
                  <Download className="h-6 w-6 mr-2" />
                  Get Certificate
                </button>
                
                <button onClick={startQuiz} className="btn btn-secondary btn-3d flex items-center justify-center px-8 py-3 text-lg">
                  <RefreshCw className="h-6 w-6 mr-2" />
                  Take Again
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard" className="btn btn-outline">
                  <Home className="mr-2 h-5 w-5" />
                  Go to Dashboard
                </Link>
                <Link to="/" className="btn btn-outline">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>

          {/* Name Input Modal */}
          {showNameInput && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="card p-8 max-w-md w-full">
                <div className="text-center mb-6">
                  <User className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Certificate Details</h3>
                  <p className="text-muted-foreground">Enter your name to personalize your certificate</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your full name"
                      className="input w-full"
                      autoFocus
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowNameInput(false)}
                      className="btn btn-outline flex-1"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={generateCertificate}
                      disabled={!userName.trim()}
                      className="btn btn-primary flex-1 disabled:opacity-50"
                    >
                      Generate Certificate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Results */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Star className="h-6 w-6 mr-2 text-yellow-500" />
              Review Your Answers
            </h3>
            <div className="space-y-4">
              {quizQuestions.map((question, index) => {
                const userAnswer = selectedAnswers[index]
                const isCorrect = userAnswer === question.correct
                
                return (
                  <div key={index} className={`p-4 rounded-lg border-2 ${
                    isCorrect 
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
                      : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{index + 1}. {question.question}</h4>
                      <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                        isCorrect 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Your answer: <span className="font-medium">{question.options[userAnswer]}</span>
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Correct answer: <span className="font-medium text-green-600">{question.options[question.correct]}</span>
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground italic">{question.explanation}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const question = quizQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors mr-6">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <Brain className="h-8 w-8 text-accent-500" />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-foreground">Health Quiz</h1>
                <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {quizQuestions.length}</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="card p-6 mb-8">
          <div className="flex items-center mb-4">
            <span className="text-sm text-muted-foreground mr-3">{Math.round(progress)}%</span>
            <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
              <div 
                className="bg-accent-500 h-full rounded-full transition-all duration-500 glow-effect"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Category: <span className="font-medium text-accent-600 dark:text-accent-400">{question.category}</span>
          </div>
        </div>
        
        {/* Question Card */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-8 leading-relaxed">
            {question.question}
          </h2>
          
          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                className={`w-full p-6 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-primary/10 border-primary text-primary-700 dark:text-primary-300 shadow-lg scale-[1.02]'
                    : 'bg-muted/50 border-border text-foreground hover:bg-muted hover:border-muted-foreground/50 hover:scale-[1.01]'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-4 text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Show Explanation Button */}
          {selectedAnswers[currentQuestion] !== undefined && (
            <div className="mb-6">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="btn btn-outline text-sm"
              >
                {showExplanation ? 'Hide' : 'Show'} Explanation
              </button>
              
              {showExplanation && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}