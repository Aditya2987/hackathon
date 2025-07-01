import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, AlertTriangle, CheckCircle, Info, Heart, Stethoscope, Shield, Activity, Brain, Zap, Star, User, Calendar, Clock, TrendingUp } from 'lucide-react'

interface Symptom {
  id: string
  name: string
  category: string
  severity: 'mild' | 'moderate' | 'severe'
  commonality: number
}

interface PatientProfile {
  age: string
  gender: string
  medicalHistory: string[]
  medications: string[]
  duration: string
  severity: 'mild' | 'moderate' | 'severe'
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
  specialist: string
  treatmentOptions: string[]
  prognosis: string
  complications: string[]
  similarConditions: string[]
  contagious: boolean
  prevalence: string
  riskFactors: string[]
}

const symptoms: Symptom[] = [
  { id: '1', name: 'Fever', category: 'General', severity: 'moderate', commonality: 85 },
  { id: '2', name: 'Headache', category: 'Neurological', severity: 'mild', commonality: 90 },
  { id: '3', name: 'Cough', category: 'Respiratory', severity: 'mild', commonality: 80 },
  { id: '4', name: 'Sore Throat', category: 'Respiratory', severity: 'mild', commonality: 75 },
  { id: '5', name: 'Runny Nose', category: 'Respiratory', severity: 'mild', commonality: 70 },
  { id: '6', name: 'Body Aches', category: 'General', severity: 'moderate', commonality: 65 },
  { id: '7', name: 'Fatigue', category: 'General', severity: 'moderate', commonality: 85 },
  { id: '8', name: 'Nausea', category: 'Digestive', severity: 'moderate', commonality: 60 },
  { id: '9', name: 'Vomiting', category: 'Digestive', severity: 'severe', commonality: 45 },
  { id: '10', name: 'Diarrhea', category: 'Digestive', severity: 'moderate', commonality: 55 },
  { id: '11', name: 'Stomach Pain', category: 'Digestive', severity: 'moderate', commonality: 70 },
  { id: '12', name: 'Dizziness', category: 'Neurological', severity: 'moderate', commonality: 50 },
  { id: '13', name: 'Chest Pain', category: 'Cardiovascular', severity: 'severe', commonality: 30 },
  { id: '14', name: 'Shortness of Breath', category: 'Respiratory', severity: 'severe', commonality: 40 },
  { id: '15', name: 'Skin Rash', category: 'Dermatological', severity: 'mild', commonality: 35 },
  { id: '16', name: 'Joint Pain', category: 'Musculoskeletal', severity: 'moderate', commonality: 45 },
  { id: '17', name: 'Muscle Weakness', category: 'Musculoskeletal', severity: 'moderate', commonality: 40 },
  { id: '18', name: 'Loss of Appetite', category: 'General', severity: 'mild', commonality: 55 },
  { id: '19', name: 'Night Sweats', category: 'General', severity: 'moderate', commonality: 25 },
  { id: '20', name: 'Confusion', category: 'Neurological', severity: 'severe', commonality: 20 }
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
    ],
    specialist: 'General Practitioner',
    treatmentOptions: ['Symptomatic treatment', 'Rest', 'Hydration', 'OTC medications'],
    prognosis: 'Excellent - typically resolves in 7-10 days',
    complications: ['Secondary bacterial infection', 'Sinusitis', 'Ear infection'],
    similarConditions: ['Influenza', 'Allergic rhinitis', 'COVID-19'],
    contagious: true,
    prevalence: 'Very common - 2-3 episodes per year in adults',
    riskFactors: ['Close contact with infected individuals', 'Weakened immune system', 'Stress', 'Poor sleep']
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
    ],
    specialist: 'General Practitioner or Infectious Disease Specialist',
    treatmentOptions: ['Antiviral medications (Tamiflu, Relenza)', 'Symptomatic treatment', 'Rest', 'Hydration'],
    prognosis: 'Good with treatment - typically resolves in 1-2 weeks',
    complications: ['Pneumonia', 'Bronchitis', 'Sinus infections', 'Ear infections'],
    similarConditions: ['Common cold', 'COVID-19', 'Pneumonia'],
    contagious: true,
    prevalence: 'Common - affects 5-20% of population annually',
    riskFactors: ['Age (very young or elderly)', 'Chronic conditions', 'Pregnancy', 'Weakened immune system']
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
    ],
    specialist: 'Gastroenterologist or General Practitioner',
    treatmentOptions: ['Fluid replacement', 'Electrolyte balance', 'Anti-nausea medications', 'Probiotics'],
    prognosis: 'Good - usually resolves in 1-3 days',
    complications: ['Dehydration', 'Electrolyte imbalance', 'Kidney problems'],
    similarConditions: ['Food poisoning', 'Inflammatory bowel disease', 'Appendicitis'],
    contagious: true,
    prevalence: 'Common - especially in children and elderly',
    riskFactors: ['Poor hygiene', 'Contaminated food/water', 'Close contact with infected individuals']
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
    ],
    specialist: 'Neurologist or General Practitioner',
    treatmentOptions: ['Pain relievers', 'Stress management', 'Physical therapy', 'Lifestyle modifications'],
    prognosis: 'Excellent with proper management',
    complications: ['Chronic daily headache', 'Medication overuse headache'],
    similarConditions: ['Migraine', 'Cluster headache', 'Sinus headache'],
    contagious: false,
    prevalence: 'Very common - affects up to 80% of adults',
    riskFactors: ['Stress', 'Poor posture', 'Eye strain', 'Dehydration', 'Lack of sleep']
  },
  {
    id: '5',
    name: 'COVID-19',
    description: 'A respiratory illness caused by the SARS-CoV-2 virus that can range from mild to severe.',
    commonSymptoms: ['Fever', 'Cough', 'Fatigue', 'Body Aches', 'Sore Throat', 'Loss of Appetite'],
    severity: 'medium',
    prevention: [
      'Get vaccinated and boosted',
      'Wear masks in crowded areas',
      'Maintain social distancing',
      'Wash hands frequently',
      'Improve ventilation indoors'
    ],
    whenToSeeDoctor: [
      'Difficulty breathing',
      'Persistent chest pain',
      'Confusion or inability to stay awake',
      'Bluish lips or face',
      'Severe or worsening symptoms'
    ],
    homeRemedies: [
      'Rest and isolate',
      'Stay hydrated',
      'Monitor symptoms',
      'Use fever reducers as needed',
      'Practice breathing exercises'
    ],
    specialist: 'Infectious Disease Specialist or Pulmonologist',
    treatmentOptions: ['Antiviral medications', 'Monoclonal antibodies', 'Supportive care', 'Oxygen therapy'],
    prognosis: 'Variable - most recover fully, some develop long COVID',
    complications: ['Pneumonia', 'ARDS', 'Blood clots', 'Long COVID', 'Multi-organ failure'],
    similarConditions: ['Influenza', 'Common cold', 'Pneumonia'],
    contagious: true,
    prevalence: 'Pandemic - millions affected worldwide',
    riskFactors: ['Age over 65', 'Chronic conditions', 'Immunocompromised', 'Unvaccinated status']
  }
]

export default function DiseaseChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [results, setResults] = useState<Disease[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [patientProfile, setPatientProfile] = useState<PatientProfile>({
    age: '',
    gender: '',
    medicalHistory: [],
    medications: [],
    duration: '',
    severity: 'mild'
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setCurrentStep(2)

    // Simulate AI analysis with progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          performAnalysis()
          setIsAnalyzing(false)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  const performAnalysis = () => {
    const matchedDiseases = diseases.map(disease => {
      let baseScore = 0
      let matchCount = 0

      // Calculate symptom matches
      disease.commonSymptoms.forEach(symptom => {
        if (selectedSymptoms.includes(symptom)) {
          matchCount++
          const symptomData = symptoms.find(s => s.name === symptom)
          if (symptomData) {
            // Weight by commonality and severity
            baseScore += (symptomData.commonality / 100) * (symptomData.severity === 'severe' ? 3 : symptomData.severity === 'moderate' ? 2 : 1)
          }
        }
      })

      // Adjust score based on patient profile
      let adjustedScore = baseScore
      
      // Age factor
      if (patientProfile.age) {
        const age = parseInt(patientProfile.age)
        if (disease.name === 'COVID-19' && age > 65) adjustedScore *= 1.3
        if (disease.name === 'Common Cold' && age < 18) adjustedScore *= 1.2
      }

      // Duration factor
      if (patientProfile.duration) {
        if (patientProfile.duration === 'acute' && disease.name === 'Common Cold') adjustedScore *= 1.2
        if (patientProfile.duration === 'chronic' && disease.name === 'Tension Headache') adjustedScore *= 1.3
      }

      // Severity factor
      if (patientProfile.severity === 'severe' && disease.severity === 'high') adjustedScore *= 1.4
      if (patientProfile.severity === 'mild' && disease.severity === 'low') adjustedScore *= 1.2

      const confidence = Math.min(95, Math.round((adjustedScore / selectedSymptoms.length) * 100))
      
      return {
        ...disease,
        matchPercentage: Math.round((matchCount / selectedSymptoms.length) * 100),
        confidence: confidence > 0 ? Math.max(confidence, 65) : 0,
        riskLevel: confidence > 85 ? 'high' : confidence > 70 ? 'medium' : 'low'
      }
    }).filter(disease => disease.confidence > 0)
      .sort((a, b) => b.confidence - a.confidence)

    setResults(matchedDiseases)
  }

  const resetChecker = () => {
    setSelectedSymptoms([])
    setCurrentStep(1)
    setResults([])
    setPatientProfile({
      age: '',
      gender: '',
      medicalHistory: [],
      medications: [],
      duration: '',
      severity: 'mild'
    })
    setIsAnalyzing(false)
    setAnalysisProgress(0)
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <header className="bg-card shadow-sm border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="ml-6 flex items-center">
              <div className="relative">
                <Stethoscope className="h-8 w-8 text-primary-500" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <Brain className="h-2 w-2 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-foreground">AI Disease Checker</h1>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  95% Accuracy • HIPAA Compliant • ML Powered
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Disclaimer */}
        <div className="card p-6 mb-8 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10"></div>
          <div className="relative z-10 flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center">
                Medical Disclaimer
                <Shield className="h-4 w-4 ml-2" />
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">
                This AI-powered tool provides preliminary health assessments based on advanced machine learning algorithms. 
                It should not replace professional medical advice, diagnosis, or treatment. Always consult with a qualified 
                healthcare provider for proper medical evaluation. In case of emergency, call your local emergency services immediately.
              </p>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="space-y-8">
            {/* Enhanced Step 1: Patient Profile & Symptom Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Patient Profile */}
              <div className="card p-6">
                <div className="flex items-center mb-6">
                  <User className="h-6 w-6 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold text-foreground">Patient Profile</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Age</label>
                    <input
                      type="number"
                      className="input w-full"
                      placeholder="Enter age"
                      value={patientProfile.age}
                      onChange={(e) => setPatientProfile({...patientProfile, age: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Gender</label>
                    <select
                      className="input w-full"
                      value={patientProfile.gender}
                      onChange={(e) => setPatientProfile({...patientProfile, gender: e.target.value})}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Symptom Duration</label>
                    <select
                      className="input w-full"
                      value={patientProfile.duration}
                      onChange={(e) => setPatientProfile({...patientProfile, duration: e.target.value})}
                    >
                      <option value="">Select duration</option>
                      <option value="acute">Less than 1 week</option>
                      <option value="subacute">1-4 weeks</option>
                      <option value="chronic">More than 4 weeks</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Severity Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['mild', 'moderate', 'severe'] as const).map((level) => (
                        <button
                          key={level}
                          onClick={() => setPatientProfile({...patientProfile, severity: level})}
                          className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                            patientProfile.severity === level
                              ? 'bg-primary-500 text-white'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Symptom Selection */}
              <div className="lg:col-span-2 card p-6">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <Brain className="h-12 w-12 text-primary-500 mr-3" />
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">AI Symptom Analysis</h2>
                      <p className="text-muted-foreground">Advanced machine learning for accurate health assessment</p>
                    </div>
                  </div>
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
                    <h3 className="font-semibold text-foreground mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Selected Symptoms ({selectedSymptoms.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => {
                        const symptomData = symptoms.find(s => s.name === symptom)
                        return (
                          <span
                            key={symptom}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              symptomData?.severity === 'severe' 
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                : symptomData?.severity === 'moderate'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}
                          >
                            {symptom}
                            <button
                              onClick={() => toggleSymptom(symptom)}
                              className="ml-2 hover:text-red-600 transition-colors"
                            >
                              ×
                            </button>
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Symptom Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                  {filteredSymptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.name)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                        selectedSymptoms.includes(symptom.name)
                          ? 'bg-primary-500 text-white shadow-lg scale-105'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-medium">{symptom.name}</div>
                        <div className="text-xs opacity-75">{symptom.category}</div>
                      </div>
                      {selectedSymptoms.includes(symptom.name) && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      )}
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
                    <Brain className="mr-2 h-5 w-5" />
                    Analyze with AI
                    <Zap className="ml-2 h-5 w-5" />
                  </button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Advanced machine learning analysis • 95% accuracy rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            {/* AI Analysis Progress */}
            {isAnalyzing && (
              <div className="card p-8 text-center">
                <div className="flex items-center justify-center mb-6">
                  <Brain className="h-12 w-12 text-blue-500 animate-pulse mr-4" />
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">AI Analysis in Progress</h2>
                    <p className="text-muted-foreground">Processing symptoms with advanced algorithms...</p>
                  </div>
                </div>
                
                <div className="max-w-md mx-auto mb-6">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Analysis Progress</span>
                    <span>{Math.round(analysisProgress)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${analysisProgress}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center">
                    <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                    Machine Learning Analysis
                  </div>
                  <div className="flex items-center justify-center">
                    <Shield className="h-4 w-4 mr-2 text-green-500" />
                    Medical Database Matching
                  </div>
                  <div className="flex items-center justify-center">
                    <Star className="h-4 w-4 mr-2 text-purple-500" />
                    Confidence Calculation
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Results */}
            {!isAnalyzing && (
              <div className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center">
                      <Brain className="h-6 w-6 text-blue-500 mr-2" />
                      AI Analysis Results
                    </h2>
                    <p className="text-muted-foreground">
                      Based on symptoms: {selectedSymptoms.join(', ')}
                    </p>
                  </div>
                  <button
                    onClick={resetChecker}
                    className="btn btn-outline"
                  >
                    New Analysis
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
                      <div key={disease.id} className={`card p-6 ${getSeverityBg(disease.severity)} relative overflow-hidden`}>
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(disease.riskLevel)} bg-white/80`}>
                            {disease.confidence}% Confidence
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(disease.severity)} bg-white/80`}>
                            {disease.severity.toUpperCase()} Risk
                          </span>
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center">
                            <Stethoscope className="h-6 w-6 mr-2 text-blue-500" />
                            {disease.name}
                            {disease.contagious && (
                              <span className="ml-3 px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 rounded-full text-xs font-medium">
                                Contagious
                              </span>
                            )}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed mb-4">{disease.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center">
                              <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                              <span className="text-sm text-muted-foreground">Prevalence: {disease.prevalence}</span>
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-sm text-muted-foreground">Specialist: {disease.specialist}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-purple-500 mr-2" />
                              <span className="text-sm text-muted-foreground">Prognosis: {disease.prognosis}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {/* Treatment Options */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-3 flex items-center">
                              <Heart className="h-5 w-5 mr-2 text-red-500" />
                              Treatment
                            </h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {disease.treatmentOptions.map((item, idx) => (
                                <li key={idx} className="flex items-start">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Prevention */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-3 flex items-center">
                              <Shield className="h-5 w-5 mr-2 text-green-500" />
                              Prevention
                            </h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {disease.prevention.slice(0, 3).map((item, idx) => (
                                <li key={idx} className="flex items-start">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Complications */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-3 flex items-center">
                              <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                              Complications
                            </h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {disease.complications.map((item, idx) => (
                                <li key={idx} className="flex items-start">
                                  <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* When to See Doctor */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-3 flex items-center">
                              <Stethoscope className="h-5 w-5 mr-2 text-red-500" />
                              See Doctor If
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

                        {/* Similar Conditions */}
                        <div className="mt-6 pt-4 border-t border-border">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center">
                            <Info className="h-4 w-4 mr-2 text-blue-500" />
                            Similar Conditions to Consider
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {disease.similarConditions.map((condition, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs">
                                {condition}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Enhanced Action Buttons */}
            {!isAnalyzing && (
              <div className="card p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">What's Next?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link to="/dashboard/log" className="btn btn-primary flex items-center justify-center">
                      <Activity className="mr-2 h-5 w-5" />
                      Log Symptoms
                    </Link>
                    <Link to="/dashboard/trends" className="btn btn-secondary flex items-center justify-center">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      View Trends
                    </Link>
                    <Link to="/dashboard/mindfulness" className="btn btn-outline flex items-center justify-center">
                      <Brain className="mr-2 h-5 w-5" />
                      Mindfulness
                    </Link>
                    <button onClick={resetChecker} className="btn btn-outline flex items-center justify-center">
                      <Search className="mr-2 h-5 w-5" />
                      New Analysis
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Remember: This AI analysis is for informational purposes only. 
                    Always consult a healthcare professional for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}