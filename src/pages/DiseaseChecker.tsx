import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, AlertTriangle, CheckCircle, Info, Heart, Stethoscope, Shield, Activity } from 'lucide-react'

interface Symptom {
  id: string
  name: string
  category: string
}

interface Disease {
  id: string
  name: string
  description: string
  commonSymptoms: string[]
  severity: 'low' | 'medium' | 'high'
  prevention: string[]
  whenToSeeDoctor: string[]
  homeRemedies: string[]
}

const symptoms: Symptom[] = [
  { id: '1', name: 'Fever', category: 'General' },
  { id: '2', name: 'Headache', category: 'Neurological' },
  { id: '3', name: 'Cough', category: 'Respiratory' },
  { id: '4', name: 'Sore Throat', category: 'Respiratory' },
  { id: '5', name: 'Runny Nose', category: 'Respiratory' },
  { id: '6', name: 'Body Aches', category: 'General' },
  { id: '7', name: 'Fatigue', category: 'General' },
  { id: '8', name: 'Nausea', category: 'Digestive' },
  { id: '9', name: 'Vomiting', category: 'Digestive' },
  { id: '10', name: 'Diarrhea', category: 'Digestive' },
  { id: '11', name: 'Stomach Pain', category: 'Digestive' },
  { id: '12', name: 'Dizziness', category: 'Neurological' },
  { id: '13', name: 'Chest Pain', category: 'Cardiovascular' },
  { id: '14', name: 'Shortness of Breath', category: 'Respiratory' },
  { id: '15', name: 'Skin Rash', category: 'Dermatological' },
]

const diseases: Disease[] = [
  {
    id: '1',
    name: 'Common Cold',
    description: 'A viral infection of the upper respiratory tract that is very common and usually mild.',
    commonSymptoms: ['Runny Nose', 'Sore Throat', 'Cough', 'Headache', 'Body Aches'],
    severity: 'low',
    prevention: [
      'Wash hands frequently with soap and water',
      'Avoid close contact with sick people',
      'Don\'t touch your face with unwashed hands',
      'Get adequate sleep and maintain a healthy diet',
      'Stay hydrated'
    ],
    whenToSeeDoctor: [
      'Symptoms last more than 10 days',
      'Fever higher than 101.3°F (38.5°C)',
      'Severe headache or sinus pain',
      'Difficulty breathing or wheezing'
    ],
    homeRemedies: [
      'Rest and get plenty of sleep',
      'Drink warm liquids like tea or soup',
      'Use a humidifier or breathe steam',
      'Gargle with salt water for sore throat',
      'Take over-the-counter pain relievers as needed'
    ]
  },
  {
    id: '2',
    name: 'Influenza (Flu)',
    description: 'A viral infection that attacks your respiratory system and can cause severe illness.',
    commonSymptoms: ['Fever', 'Cough', 'Body Aches', 'Fatigue', 'Headache', 'Sore Throat'],
    severity: 'medium',
    prevention: [
      'Get an annual flu vaccine',
      'Wash hands frequently',
      'Avoid touching your face',
      'Stay away from sick people',
      'Maintain good overall health'
    ],
    whenToSeeDoctor: [
      'Difficulty breathing or shortness of breath',
      'Chest pain or pressure',
      'Sudden dizziness or confusion',
      'Severe or persistent vomiting',
      'High fever that doesn\'t respond to medication'
    ],
    homeRemedies: [
      'Rest and stay home',
      'Drink plenty of fluids',
      'Take antiviral medications if prescribed early',
      'Use pain relievers for aches and fever',
      'Use a humidifier to ease congestion'
    ]
  },
  {
    id: '3',
    name: 'Gastroenteritis',
    description: 'Inflammation of the stomach and intestines, often called stomach flu.',
    commonSymptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Stomach Pain', 'Fever', 'Body Aches'],
    severity: 'medium',
    prevention: [
      'Wash hands thoroughly and frequently',
      'Avoid contaminated food and water',
      'Don\'t share personal items',
      'Clean and disinfect surfaces',
      'Practice food safety'
    ],
    whenToSeeDoctor: [
      'Signs of severe dehydration',
      'Blood in vomit or stool',
      'High fever (over 102°F)',
      'Severe abdominal pain',
      'Symptoms persist for more than a few days'
    ],
    homeRemedies: [
      'Stay hydrated with clear fluids',
      'Rest and avoid solid foods initially',
      'Try the BRAT diet (bananas, rice, applesauce, toast)',
      'Use oral rehydration solutions',
      'Gradually return to normal diet'
    ]
  },
  {
    id: '4',
    name: 'Tension Headache',
    description: 'The most common type of headache, often caused by stress or muscle tension.',
    commonSymptoms: ['Headache', 'Fatigue', 'Dizziness'],
    severity: 'low',
    prevention: [
      'Manage stress effectively',
      'Maintain regular sleep schedule',
      'Stay hydrated',
      'Exercise regularly',
      'Limit caffeine and alcohol'
    ],
    whenToSeeDoctor: [
      'Sudden, severe headache',
      'Headache with fever and stiff neck',
      'Headache after head injury',
      'Progressive worsening of headaches',
      'Headache with vision changes'
    ],
    homeRemedies: [
      'Apply cold or warm compress',
      'Practice relaxation techniques',
      'Get adequate sleep',
      'Stay hydrated',
      'Take over-the-counter pain relievers'
    ]
  }
]

export default function DiseaseChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [results, setResults] = useState<Disease[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return

    const matchedDiseases = diseases.map(disease => {
      const matchCount = disease.commonSymptoms.filter(symptom => 
        selectedSymptoms.includes(symptom)
      ).length
      
      return {
        ...disease,
        matchPercentage: Math.round((matchCount / selectedSymptoms.length) * 100)
      }
    }).filter(disease => disease.matchPercentage > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage)

    setResults(matchedDiseases)
    setCurrentStep(2)
  }

  const resetChecker = () => {
    setSelectedSymptoms([])
    setCurrentStep(1)
    setResults([])
    setSearchTerm('')
  }

  const filteredSymptoms = symptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-500'
      case 'medium': return 'text-yellow-500'
      case 'high': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
      case 'medium': return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
      case 'high': return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
      default: return 'bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800'
    }
  }

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
              <Stethoscope className="h-8 w-8 text-primary-500" />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-foreground">Disease Checker</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Health Assessment</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Disclaimer */}
        <div className="card p-6 mb-8 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Medical Disclaimer</h3>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">
                This tool provides general health information and should not replace professional medical advice. 
                Always consult with a healthcare provider for proper diagnosis and treatment. In case of emergency, 
                call your local emergency services immediately.
              </p>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="space-y-8">
            {/* Step 1: Symptom Selection */}
            <div className="card p-8">
              <div className="text-center mb-8">
                <Stethoscope className="h-16 w-16 text-primary-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-4">What symptoms are you experiencing?</h2>
                <p className="text-muted-foreground text-lg">
                  Select all symptoms that apply to you. The more accurate your selection, the better our assessment.
                </p>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search symptoms..."
                  className="input pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Selected Symptoms */}
              {selectedSymptoms.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Selected Symptoms ({selectedSymptoms.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
                      >
                        {symptom}
                        <button
                          onClick={() => toggleSymptom(symptom)}
                          className="ml-2 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Symptom Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                {filteredSymptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.name)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedSymptoms.includes(symptom.name)
                        ? 'bg-primary-500 text-white shadow-lg scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    {symptom.name}
                  </button>
                ))}
              </div>

              {/* Analyze Button */}
              <div className="text-center">
                <button
                  onClick={analyzeSymptoms}
                  disabled={selectedSymptoms.length === 0}
                  className="btn btn-primary btn-3d px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Analyze Symptoms
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            {/* Step 2: Results */}
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Assessment Results</h2>
                  <p className="text-muted-foreground">
                    Based on your symptoms: {selectedSymptoms.join(', ')}
                  </p>
                </div>
                <button
                  onClick={resetChecker}
                  className="btn btn-outline"
                >
                  Start Over
                </button>
              </div>

              {results.length === 0 ? (
                <div className="text-center py-12">
                  <Info className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No matches found</h3>
                  <p className="text-muted-foreground">
                    We couldn't find any conditions that match your symptoms. Consider consulting a healthcare provider.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {results.map((disease, index) => (
                    <div key={disease.id} className={`card p-6 ${getSeverityBg(disease.severity)}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">{disease.name}</h3>
                          <div className="flex items-center space-x-4 mb-3">
                            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                              {disease.matchPercentage}% match
                            </span>
                            <span className={`text-sm font-medium ${getSeverityColor(disease.severity)}`}>
                              {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)} severity
                            </span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{disease.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Prevention */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center">
                            <Shield className="h-5 w-5 mr-2 text-green-500" />
                            Prevention
                          </h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {disease.prevention.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Home Remedies */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center">
                            <Heart className="h-5 w-5 mr-2 text-blue-500" />
                            Home Care
                          </h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {disease.homeRemedies.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* When to See Doctor */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center">
                            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                            See a Doctor If
                          </h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {disease.whenToSeeDoctor.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="card p-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-foreground">What's Next?</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/dashboard/log" className="btn btn-primary">
                    <Activity className="mr-2 h-5 w-5" />
                    Log These Symptoms
                  </Link>
                  <button onClick={resetChecker} className="btn btn-outline">
                    Check Different Symptoms
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Remember: This is not a substitute for professional medical advice. 
                  Consult a healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}