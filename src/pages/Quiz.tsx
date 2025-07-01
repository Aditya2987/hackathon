import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Award, RefreshCw, Download, ArrowLeft, Home } from 'lucide-react'
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

  const downloadCertificate = () => {
    const score = selectedAnswers.reduce((total, answer, index) => {
      return total + (answer === quizQuestions[index].correct ? 1 : 0)
    }, 0)
    
    const percentage = Math.round((score / quizQuestions.length) * 100)
    
    alert(
      `🎓 HEALTH AWARENESS CERTIFICATE 🎓\n\nCongratulations!\n\nThis certifies that you have successfully completed the SymptoTrack Health Awareness Quiz with a score of ${score}/${quizQuestions.length} (${percentage}%).\n\nDate: ${new Date().toLocaleDateString()}\n\nIn a real application, this would generate and download a personalized PDF certificate.`
    )
  }

  const getScoreMessage = () => {
    const score = selectedAnswers.reduce((total, answer, index) => {
      return total + (answer === quizQuestions[index].correct ? 1 : 0)
    }, 0)
    const percentage = (score / quizQuestions.length) * 100
    
    if (percentage >= 90) return { message: "Excellent! You're a health expert! 🌟", color: "text-green-600" }
    if (percentage >= 70) return { message: "Great job! You have solid health knowledge! 👏", color: "text-blue-600" }
    if (percentage >= 50) return { message: "Good effort! Keep learning about health! 👍", color: "text-yellow-600" }
    return { message: "Keep learning! Every step counts! 📚", color: "text-orange-600" }
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
          <div className="card p-12 text-center gradient-bg">
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

          {/* Quiz Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">{quizQuestions.length}</div>
              <div className="text-muted-foreground">Questions</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-secondary-500 mb-2">~5</div>
              <div className="text-muted-foreground">Minutes</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-accent-500 mb-2">🏆</div>
              <div className="text-muted-foreground">Certificate</div>
            </div>
          </div>

          {/* Previous Results */}
          {quizResults.length > 0 && (
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <Award className="h-6 w-6 mr-2 text-accent-500" />
                Your Previous Results
              </h3>
              <div className="space-y-3">
                {quizResults.slice(-5).reverse().map((result) => (
                  <div key={result.id} className="flex justify-between items-center py-3 px-4 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">
                      {new Date(result.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <div className="flex items-center space-x-4">
                      <span className="text-foreground font-medium">
                        {result.score}/{result.totalQuestions}
                      </span>
                      <span className="text-primary-600 dark:text-primary-400 font-semibold">
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
          <div className="card p-12 text-center gradient-bg">
            <div className="floating-element mb-6">
              <Award className="h-20 w-20 text-accent-500 mx-auto" />
            </div>
            <div className="text-6xl font-bold text-primary-500 mb-4">{score}/{quizQuestions.length}</div>
            <div className={`text-2xl font-semibold mb-8 ${scoreMessage.color}`}>{scoreMessage.message}</div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button onClick={downloadCertificate} className="btn btn-primary btn-3d flex items-center justify-center px-8 py-3 text-lg">
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

          {/* Detailed Results */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">Review Your Answers</h3>
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
                      <span className={`text-sm font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
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