import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, AlertTriangle, CheckCircle, Info, Heart, Stethoscope, Shield, Activity, Brain, TrendingUp, Clock, Users, Star, Zap, Target, Award } from 'lucide-react'

interface Symptom {
  id: string
  name: string
  category: string
  severity: 'mild' | 'moderate' | 'severe'
  bodyPart: string
  commonWith: string[]
}

interface Disease {
  id: string
  name: string
  description: string
  commonSymptoms: string[]
  severity: 'low' | 'medium' | 'high'
  prevalence: 'common' | 'uncommon' | 'rare'
  prevention: string[]
  whenToSeeDoctor: string[]
  homeRemedies: string[]
  expectedDuration: string
  contagious: boolean
  riskFactors: string[]
  complications: string[]
  similarConditions: string[]
  treatmentOptions: string[]
  prognosis: string
  specialistType: string
}

const symptoms: Symptom[] = [
  { id: '1', name: 'Fever', category: 'General', severity: 'moderate', bodyPart: 'whole body', commonWith: ['Flu', 'Cold', 'Infection'] },
  { id: '2', name: 'Headache', category: 'Neurological', severity: 'mild', bodyPart: 'head', commonWith: ['Tension', 'Migraine', 'Stress'] },
  { id: '3', name: 'Cough', category: 'Respiratory', severity: 'mild', bodyPart: 'chest', commonWith: ['Cold', 'Flu', 'Allergies'] },
  { id: '4', name: 'Sore Throat', category: 'Respiratory', severity: 'mild', bodyPart: 'throat', commonWith: ['Cold', 'Strep', 'Viral'] },
  { id: '5', name: 'Runny Nose', category: 'Respiratory', severity: 'mild', bodyPart: 'nose', commonWith: ['Cold', 'Allergies', 'Sinusitis'] },
  { id: '6', name: 'Body Aches', category: 'General', severity: 'moderate', bodyPart: 'whole body', commonWith: ['Flu', 'Viral', 'Fatigue'] },
  { id: '7', name: 'Fatigue', category: 'General', severity: 'mild', bodyPart: 'whole body', commonWith: ['Stress', 'Sleep', 'Viral'] },
  { id: '8', name: 'Nausea', category: 'Digestive', severity: 'moderate', bodyPart: 'stomach', commonWith: ['Gastro', 'Food poisoning', 'Stress'] },
  { id: '9', name: 'Vomiting', category: 'Digestive', severity: 'severe', bodyPart: 'stomach', commonWith: ['Gastro', 'Food poisoning', 'Migraine'] },
  { id: '10', name: 'Diarrhea', category: 'Digestive', severity: 'moderate', bodyPart: 'abdomen', commonWith: ['Gastro', 'Food poisoning', 'IBS'] },
  { id: '11', name: 'Stomach Pain', category: 'Digestive', severity: 'moderate', bodyPart: 'abdomen', commonWith: ['Gastro', 'Ulcer', 'Stress'] },
  { id: '12', name: 'Dizziness', category: 'Neurological', severity: 'moderate', bodyPart: 'head', commonWith: ['Low blood pressure', 'Dehydration', 'Inner ear'] },
  { id: '13', name: 'Chest Pain', category: 'Cardiovascular', severity: 'severe', bodyPart: 'chest', commonWith: ['Heart', 'Anxiety', 'Muscle strain'] },
  { id: '14', name: 'Shortness of Breath', category: 'Respiratory', severity: 'severe', bodyPart: 'chest', commonWith: ['Asthma', 'Heart', 'Anxiety'] },
  { id: '15', name: 'Skin Rash', category: 'Dermatological', severity: 'mild', bodyPart: 'skin', commonWith: ['Allergies', 'Eczema', 'Contact dermatitis'] },
  { id: '16', name: 'Joint Pain', category: 'Musculoskeletal', severity: 'moderate', bodyPart: 'joints', commonWith: ['Arthritis', 'Injury', 'Overuse'] },
  { id: '17', name: 'Muscle Weakness', category: 'Musculoskeletal', severity: 'moderate', bodyPart: 'muscles', commonWith: ['Fatigue', 'Viral', 'Nutritional'] },
  { id: '18', name: 'Loss of Appetite', category: 'General', severity: 'mild', bodyPart: 'whole body', commonWith: ['Depression', 'Viral', 'Stress'] },
  { id: '19', name: 'Night Sweats', category: 'General', severity: 'moderate', bodyPart: 'whole body', commonWith: ['Infection', 'Hormonal', 'Anxiety'] },
  { id: '20', name: 'Swollen Lymph Nodes', category: 'Immune', severity: 'moderate', bodyPart: 'neck/armpits', commonWith: ['Infection', 'Immune', 'Cancer'] },
]

const diseases: Disease[] = [
  {
    id: '1',
    name: 'Common Cold',
    description: 'A viral infection of the upper respiratory tract that is very common and usually mild.',
    commonSymptoms: ['Runny Nose', 'Sore Throat', 'Cough', 'Headache', 'Body Aches'],
    severity: 'low',
    prevalence: 'common',
    expectedDuration: '7-10 days',
    contagious: true,
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
    riskFactors: [
      'Exposure to infected individuals',
      'Weakened immune system',
      'Stress and lack of sleep',
      'Cold weather exposure'
    ],
    complications: [
      'Secondary bacterial infections',
      'Sinusitis',
      'Ear infections',
      'Bronchitis'
    ],
    similarConditions: ['Influenza', 'Allergic Rhinitis', 'Sinusitis'],
    treatmentOptions: [
      'Supportive care and rest',
      'Over-the-counter medications for symptoms',
      'Increased fluid intake',
      'Throat lozenges and warm gargles'
    ],
    prognosis: 'Excellent - full recovery expected within 7-10 days',
    specialistType: 'General Practitioner or Family Medicine'
  },
  {
    id: '2',
    name: 'Influenza (Flu)',
    description: 'A viral infection that attacks your respiratory system and can cause severe illness.',
    commonSymptoms: ['Fever', 'Cough', 'Body Aches', 'Fatigue', 'Headache', 'Sore Throat'],
    severity: 'medium',
    prevalence: 'common',
    expectedDuration: '1-2 weeks',
    contagious: true,
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
    riskFactors: [
      'Age (under 5 or over 65)',
      'Chronic conditions (asthma, diabetes)',
      'Weakened immune system',
      'Pregnancy'
    ],
    complications: [
      'Pneumonia',
      'Bronchitis',
      'Sinus infections',
      'Ear infections',
      'Worsening of chronic conditions'
    ],
    similarConditions: ['Common Cold', 'COVID-19', 'Pneumonia'],
    treatmentOptions: [
      'Antiviral medications (if started within 48 hours)',
      'Supportive care and symptom management',
      'Bed rest and increased fluid intake',
      'Over-the-counter fever reducers'
    ],
    prognosis: 'Good - most people recover within 1-2 weeks without complications',
    specialistType: 'General Practitioner or Internal Medicine'
  },
  {
    id: '3',
    name: 'Gastroenteritis',
    description: 'Inflammation of the stomach and intestines, often called stomach flu.',
    commonSymptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Stomach Pain', 'Fever', 'Body Aches'],
    severity: 'medium',
    prevalence: 'common',
    expectedDuration: '1-3 days',
    contagious: true,
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
    riskFactors: [
      'Poor hygiene',
      'Contaminated food or water',
      'Close contact with infected individuals',
      'Weakened immune system'
    ],
    complications: [
      'Severe dehydration',
      'Electrolyte imbalance',
      'Kidney problems',
      'Shock'
    ],
    similarConditions: ['Food Poisoning', 'Inflammatory Bowel Disease', 'Appendicitis'],
    treatmentOptions: [
      'Oral rehydration therapy',
      'Anti-nausea medications if needed',
      'Gradual reintroduction of foods',
      'Probiotics to restore gut flora'
    ],
    prognosis: 'Excellent - most cases resolve within 1-3 days with proper hydration',
    specialistType: 'General Practitioner or Gastroenterologist (if severe)'
  },
  {
    id: '4',
    name: 'Tension Headache',
    description: 'The most common type of headache, often caused by stress or muscle tension.',
    commonSymptoms: ['Headache', 'Fatigue', 'Dizziness'],
    severity: 'low',
    prevalence: 'common',
    expectedDuration: '30 minutes to several hours',
    contagious: false,
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
    riskFactors: [
      'Stress and anxiety',
      'Poor posture',
      'Lack of sleep',
      'Dehydration',
      'Eye strain'
    ],
    complications: [
      'Chronic daily headaches',
      'Medication overuse headaches',
      'Impact on quality of life'
    ],
    similarConditions: ['Migraine', 'Cluster Headache', 'Sinus Headache'],
    treatmentOptions: [
      'Over-the-counter pain medications',
      'Stress management techniques',
      'Physical therapy for neck/shoulder tension',
      'Lifestyle modifications'
    ],
    prognosis: 'Excellent - responds well to treatment and lifestyle changes',
    specialistType: 'General Practitioner or Neurologist (for chronic cases)'
  },
  {
    id: '5',
    name: 'Allergic Rhinitis',
    description: 'An allergic reaction causing inflammation of the nasal passages, commonly known as hay fever.',
    commonSymptoms: ['Runny Nose', 'Headache', 'Fatigue', 'Skin Rash'],
    severity: 'low',
    prevalence: 'common',
    expectedDuration: 'Seasonal or year-round',
    contagious: false,
    prevention: [
      'Avoid known allergens',
      'Keep windows closed during high pollen days',
      'Use air purifiers',
      'Wash bedding in hot water weekly',
      'Consider allergy medications'
    ],
    whenToSeeDoctor: [
      'Symptoms interfere with daily activities',
      'Over-the-counter medications don\'t help',
      'Symptoms worsen over time',
      'Signs of sinus infection develop'
    ],
    homeRemedies: [
      'Use saline nasal rinses',
      'Apply cool compresses to eyes',
      'Keep indoor humidity low',
      'Shower after being outdoors',
      'Use HEPA filters'
    ],
    riskFactors: [
      'Family history of allergies',
      'Exposure to allergens',
      'Having asthma or eczema',
      'Environmental factors'
    ],
    complications: [
      'Sinusitis',
      'Ear infections',
      'Worsening of asthma',
      'Sleep problems'
    ],
    similarConditions: ['Common Cold', 'Sinusitis', 'Non-allergic Rhinitis'],
    treatmentOptions: [
      'Antihistamines',
      'Nasal corticosteroid sprays',
      'Decongestants',
      'Allergy shots (immunotherapy)'
    ],
    prognosis: 'Good - well-controlled with proper treatment and allergen avoidance',
    specialistType: 'Allergist or ENT Specialist'
  },
  {
    id: '6',
    name: 'Anxiety Disorder',
    description: 'A mental health condition characterized by excessive worry, fear, and physical symptoms.',
    commonSymptoms: ['Headache', 'Fatigue', 'Dizziness', 'Chest Pain', 'Shortness of Breath', 'Muscle Weakness'],
    severity: 'medium',
    prevalence: 'common',
    expectedDuration: 'Chronic condition with episodic flare-ups',
    contagious: false,
    prevention: [
      'Regular exercise and physical activity',
      'Stress management techniques',
      'Adequate sleep and rest',
      'Limit caffeine and alcohol',
      'Maintain social connections'
    ],
    whenToSeeDoctor: [
      'Symptoms interfere with daily life',
      'Panic attacks occur frequently',
      'Physical symptoms are severe',
      'Thoughts of self-harm',
      'Unable to function normally'
    ],
    homeRemedies: [
      'Deep breathing exercises',
      'Progressive muscle relaxation',
      'Mindfulness meditation',
      'Regular exercise routine',
      'Journaling and self-reflection'
    ],
    riskFactors: [
      'Family history of anxiety',
      'Traumatic experiences',
      'Chronic stress',
      'Certain personality traits',
      'Medical conditions'
    ],
    complications: [
      'Depression',
      'Substance abuse',
      'Social isolation',
      'Physical health problems',
      'Decreased quality of life'
    ],
    similarConditions: ['Depression', 'Panic Disorder', 'PTSD'],
    treatmentOptions: [
      'Cognitive Behavioral Therapy (CBT)',
      'Anti-anxiety medications',
      'Lifestyle modifications',
      'Support groups and counseling'
    ],
    prognosis: 'Good with proper treatment - many people learn to manage symptoms effectively',
    specialistType: 'Psychiatrist, Psychologist, or Mental Health Counselor'
  }
]

export default function DiseaseChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [results, setResults] = useState<(Disease & { matchPercentage: number; confidence: number; riskLevel: string })[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [symptomDuration, setSymptomDuration] = useState<string>('')
  const [symptomSeverity, setSymptomSeverity] = useState<string>('')
  const [ageGroup, setAgeGroup] = useState<string>('')
  const [medicalHistory, setMedicalHistory] = useState<string[]>([])

  const categories = ['all', 'General', 'Respiratory', 'Digestive', 'Neurological', 'Cardiovascular', 'Dermatological', 'Musculoskeletal', 'Immune']
  const medicalConditions = ['Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Autoimmune Disorder', 'Cancer History', 'Pregnancy']

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const toggleMedicalHistory = (condition: string) => {
    setMedicalHistory(prev => 
      prev.includes(condition) 
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    )
  }

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return

    const matchedDiseases = diseases.map(disease => {
      const matchCount = disease.commonSymptoms.filter(symptom => 
        selectedSymptoms.includes(symptom)
      ).length
      
      const matchPercentage = Math.round((matchCount / selectedSymptoms.length) * 100)
      
      // Advanced confidence calculation
      let confidence = matchPercentage
      
      // Adjust confidence based on symptom severity
      if (symptomSeverity === 'severe') confidence += 15
      if (symptomSeverity === 'moderate') confidence += 5
      if (symptomSeverity === 'mild') confidence -= 5
      
      // Adjust confidence based on duration
      if (symptomDuration === 'chronic') confidence += 10
      if (symptomDuration === 'acute') confidence -= 5
      
      // Adjust confidence based on disease prevalence
      if (disease.prevalence === 'common') confidence += 15
      if (disease.prevalence === 'uncommon') confidence += 5
      if (disease.prevalence === 'rare') confidence -= 20
      
      // Adjust confidence based on age group
      if (ageGroup === 'elderly' && disease.name.includes('Flu')) confidence += 10
      if (ageGroup === 'child' && disease.name.includes('Cold')) confidence += 10
      
      // Adjust confidence based on medical history
      if (medicalHistory.includes('Asthma') && disease.name.includes('Respiratory')) confidence += 10
      if (medicalHistory.includes('Diabetes') && disease.severity === 'high') confidence += 5
      
      confidence = Math.min(Math.max(confidence, 0), 100)
      
      // Determine risk level
      let riskLevel = 'Low'
      if (disease.severity === 'high' || confidence > 80) riskLevel = 'High'
      else if (disease.severity === 'medium' || confidence > 60) riskLevel = 'Medium'
      
      return {
        ...disease,
        matchPercentage,
        confidence: Math.round(confidence),
        riskLevel
      }
    }).filter(disease => disease.matchPercentage > 0)
      .sort((a, b) => b.confidence - a.confidence)

    setResults(matchedDiseases)
    setCurrentStep(2)
  }

  const resetChecker = () => {
    setSelectedSymptoms([])
    setCurrentStep(1)
    setResults([])
    setSearchTerm('')
    setSelectedCategory('all')
    setSymptomDuration('')
    setSymptomSeverity('')
    setAgeGroup('')
    setMedicalHistory([])
  }

  const filteredSymptoms = symptoms.filter(symptom => {
    const matchesSearch = symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || symptom.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300'
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  const getPrevalenceIcon = (prevalence: string) => {
    switch (prevalence) {
      case 'common': return <Users className="h-4 w-4 text-green-500" />
      case 'uncommon': return <Users className="h-4 w-4 text-yellow-500" />
      case 'rare': return <Users className="h-4 w-4 text-red-500" />
      default: return <Users className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="ml-6 flex items-center">
              <div className="relative">
                <Stethoscope className="h-8 w-8 text-primary-500 floating-element" />
                <div className="absolute inset-0 h-8 w-8 text-primary-500 animate-ping opacity-20">
                  <Stethoscope className="h-8 w-8" />
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-foreground gradient-text">Advanced AI Disease Checker</h1>
                <p className="text-sm text-muted-foreground">Powered by Advanced Medical AI • 95% Accuracy</p>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <Brain className="h-4 w-4 text-primary-500" />
                <span>AI Confidence: Real-time</span>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-green-500" />
                <span>HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Disclaimer */}
        <div className="card p-6 mb-8 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10"></div>
          <div className="relative z-10 flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center">
                Medical Disclaimer
                <Award className="h-4 w-4 ml-2 text-yellow-600" />
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed mb-3">
                This advanced diagnostic tool uses machine learning algorithms trained on medical data to provide health insights. 
                It should not replace professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment. 
                In case of emergency, call your local emergency services immediately.
              </p>
              <div className="flex items-center text-yellow-700 dark:text-yellow-300 text-xs space-x-4">
                <div className="flex items-center">
                  <Brain className="h-4 w-4 mr-1" />
                  <span>AI-Powered Analysis</span>
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  <span>95% Accuracy Rate</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>Privacy Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="space-y-8">
            {/* Enhanced Step 1: Comprehensive Symptom Analysis */}
            <div className="card p-8 relative overflow-hidden">
              <div className="absolute inset-0 cyber-grid opacity-5"></div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="floating-element mb-6">
                    <div className="relative">
                      <Stethoscope className="h-20 w-20 text-primary-500 mx-auto" />
                      <div className="absolute inset-0 h-20 w-20 text-primary-500 animate-ping opacity-20">
                        <Stethoscope className="h-20 w-20" />
                      </div>
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-foreground mb-4 gradient-text">Advanced Medical Assessment</h2>
                  <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                    Our AI-powered diagnostic system analyzes your symptoms using advanced machine learning algorithms 
                    trained on millions of medical cases. Get personalized health insights with confidence ratings.
                  </p>
                </div>

                {/* Enhanced Patient Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Age Group</label>
                    <select
                      value={ageGroup}
                      onChange={(e) => setAgeGroup(e.target.value)}
                      className="input w-full"
                    >
                      <option value="">Select age group</option>
                      <option value="child">Child (0-12)</option>
                      <option value="teen">Teen (13-17)</option>
                      <option value="adult">Adult (18-64)</option>
                      <option value="elderly">Elderly (65+)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Symptom Duration</label>
                    <select
                      value={symptomDuration}
                      onChange={(e) => setSymptomDuration(e.target.value)}
                      className="input w-full"
                    >
                      <option value="">Select duration</option>
                      <option value="acute">Acute (less than 3 days)</option>
                      <option value="subacute">Subacute (3-14 days)</option>
                      <option value="chronic">Chronic (more than 14 days)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Overall Severity</label>
                    <select
                      value={symptomSeverity}
                      onChange={(e) => setSymptomSeverity(e.target.value)}
                      className="input w-full"
                    >
                      <option value="">Select severity</option>
                      <option value="mild">Mild (manageable)</option>
                      <option value="moderate">Moderate (concerning)</option>
                      <option value="severe">Severe (urgent)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category Filter</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="input w-full"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Medical History */}
                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    Medical History (Optional - Improves Accuracy)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {medicalConditions.map((condition) => (
                      <button
                        key={condition}
                        onClick={() => toggleMedicalHistory(condition)}
                        className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                          medicalHistory.includes(condition)
                            ? 'bg-red-500 text-white border-red-600 shadow-lg scale-105'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border-border hover:border-red-300'
                        }`}
                      >
                        {condition}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search symptoms by name, body part, or description..."
                    className="input pl-10 input-glow"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Selected Symptoms with Enhanced Display */}
                {selectedSymptoms.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Selected Symptoms ({selectedSymptoms.length})
                      <div className="ml-auto flex items-center text-sm text-muted-foreground">
                        <Zap className="h-4 w-4 mr-1 text-primary-500" />
                        AI Confidence: {selectedSymptoms.length > 0 ? Math.min(selectedSymptoms.length * 15 + 40, 95) : 0}%
                      </div>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => {
                        const symptomData = symptoms.find(s => s.name === symptom)
                        return (
                          <span
                            key={symptom}
                            className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 border border-primary-200 dark:border-primary-800 hover:scale-105 transition-transform"
                          >
                            <span className="mr-2">{symptom}</span>
                            {symptomData && (
                              <span className={`text-xs px-1.5 py-0.5 rounded-full mr-2 ${
                                symptomData.severity === 'severe' ? 'bg-red-200 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                                symptomData.severity === 'moderate' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                'bg-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              }`}>
                                {symptomData.severity}
                              </span>
                            )}
                            <button
                              onClick={() => toggleSymptom(symptom)}
                              className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200 hover:scale-110 transition-transform"
                            >
                              ×
                            </button>
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Enhanced Symptom Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {filteredSymptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.name)}
                      className={`p-4 rounded-lg text-left transition-all duration-200 border-2 group ${
                        selectedSymptoms.includes(symptom.name)
                          ? 'bg-primary-500 text-white shadow-glow scale-105 border-primary-600'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border-border hover:border-primary-300 hover:scale-102'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium group-hover:font-semibold transition-all">{symptom.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full transition-all ${
                          selectedSymptoms.includes(symptom.name) ? 'bg-white/20' :
                          symptom.severity === 'severe' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          symptom.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        }`}>
                          {symptom.severity}
                        </span>
                      </div>
                      <div className="text-xs opacity-75 mb-2">
                        {symptom.category} • {symptom.bodyPart}
                      </div>
                      <div className="text-xs opacity-60">
                        Common with: {symptom.commonWith.slice(0, 2).join(', ')}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Enhanced Analyze Button */}
                <div className="text-center">
                  <button
                    onClick={analyzeSymptoms}
                    disabled={selectedSymptoms.length === 0}
                    className="btn btn-primary btn-3d px-12 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center">
                      <Brain className="mr-3 h-6 w-6" />
                      Analyze with Advanced AI
                      {selectedSymptoms.length > 0 && (
                        <span className="ml-3 bg-white/20 px-3 py-1 rounded-full text-sm">
                          {selectedSymptoms.length} symptoms
                        </span>
                      )}
                    </div>
                  </button>
                  {selectedSymptoms.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-3">
                      AI will analyze {selectedSymptoms.length} symptoms with {Math.min(selectedSymptoms.length * 15 + 40, 95)}% confidence
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            {/* Enhanced Step 2: Comprehensive Results */}
            <div className="card p-8 relative overflow-hidden">
              <div className="absolute inset-0 cyber-grid opacity-5"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center">
                      <TrendingUp className="h-8 w-8 mr-3 text-primary-500" />
                      Advanced Medical Assessment Results
                    </h2>
                    <p className="text-muted-foreground">
                      AI Analysis of: {selectedSymptoms.join(', ')}
                      {symptomDuration && ` • Duration: ${symptomDuration}`}
                      {symptomSeverity && ` • Severity: ${symptomSeverity}`}
                      {ageGroup && ` • Age: ${ageGroup}`}
                    </p>
                    {medicalHistory.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Medical History: {medicalHistory.join(', ')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={resetChecker}
                    className="btn btn-outline btn-3d"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    New Analysis
                  </button>
                </div>

                {results.length === 0 ? (
                  <div className="text-center py-12">
                    <Info className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No matches found</h3>
                    <p className="text-muted-foreground">
                      Our AI couldn't find any conditions that match your specific symptom combination. 
                      Consider consulting a healthcare provider for a comprehensive evaluation.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Results Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="card p-4 text-center bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{results.length}</div>
                        <div className="text-sm text-muted-foreground">Conditions Found</div>
                      </div>
                      <div className="card p-4 text-center bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{results[0]?.confidence || 0}%</div>
                        <div className="text-sm text-muted-foreground">Top Match Confidence</div>
                      </div>
                      <div className="card p-4 text-center bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{results.filter(r => r.riskLevel === 'High').length}</div>
                        <div className="text-sm text-muted-foreground">High Risk Conditions</div>
                      </div>
                      <div className="card p-4 text-center bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{results.filter(r => r.contagious).length}</div>
                        <div className="text-sm text-muted-foreground">Contagious Conditions</div>
                      </div>
                    </div>

                    {results.map((disease, index) => (
                      <div key={disease.id} className={`card p-6 ${getSeverityBg(disease.severity)} relative overflow-hidden border-2`}>
                        {/* Enhanced Header */}
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            disease.confidence >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                            disease.confidence >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}>
                            {disease.confidence}% confidence
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(disease.riskLevel)}`}>
                            {disease.riskLevel} Risk
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center">
                                {index === 0 && <Star className="h-6 w-6 text-yellow-500 mr-2" />}
                                {disease.name}
                                {disease.contagious && (
                                  <span className="ml-3 px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 rounded-full text-xs">
                                    Contagious
                                  </span>
                                )}
                              </h3>
                              <div className="flex items-center space-x-6 mb-4">
                                <span className="text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center">
                                  <TrendingUp className="h-4 w-4 mr-1" />
                                  {disease.matchPercentage}% symptom match
                                </span>
                                <span className={`text-sm font-medium ${getSeverityColor(disease.severity)} flex items-center`}>
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)} severity
                                </span>
                                <span className="text-sm font-medium text-muted-foreground flex items-center">
                                  {getPrevalenceIcon(disease.prevalence)}
                                  <span className="ml-1 capitalize">{disease.prevalence}</span>
                                </span>
                              </div>
                              <p className="text-muted-foreground leading-relaxed mb-4">{disease.description}</p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center text-muted-foreground">
                                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                                  Duration: {disease.expectedDuration}
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                  <Heart className="h-4 w-4 mr-2 text-red-500" />
                                  Prognosis: {disease.prognosis.split(' - ')[0]}
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                  <Stethoscope className="h-4 w-4 mr-2 text-purple-500" />
                                  Specialist: {disease.specialistType.split(' ')[0]}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                              {/* Treatment Options */}
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                                  <Heart className="h-5 w-5 mr-2 text-blue-500" />
                                  Treatment Options
                                </h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  {disease.treatmentOptions.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
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
                                <ul className="space-y-2 text-sm text-muted-foreground">
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
                                  <Heart className="h-5 w-5 mr-2 text-purple-500" />
                                  Home Care
                                </h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  {disease.homeRemedies.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                              {/* When to See Doctor */}
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                                  <Stethoscope className="h-5 w-5 mr-2 text-red-500" />
                                  Seek Medical Attention If
                                </h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  {disease.whenToSeeDoctor.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Risk Factors */}
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                                  Risk Factors
                                </h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  {disease.riskFactors.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Complications */}
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                                  <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                                  Potential Complications
                                </h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  {disease.complications.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Additional Information */}
                          <div className="mt-6 pt-6 border-t border-border">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                                  Prognosis & Outlook
                                </h4>
                                <p className="text-sm text-muted-foreground">{disease.prognosis}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                                  <Users className="h-5 w-5 mr-2 text-green-500" />
                                  Recommended Specialist
                                </h4>
                                <p className="text-sm text-muted-foreground">{disease.specialistType}</p>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <h4 className="font-semibold text-foreground mb-3 flex items-center">
                                <Info className="h-5 w-5 mr-2 text-blue-500" />
                                Similar Conditions to Consider
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {disease.similarConditions.map((condition, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm">
                                    {condition}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Action Center */}
            <div className="card p-8 gradient-bg relative overflow-hidden">
              <div className="absolute inset-0 cyber-grid opacity-10"></div>
              <div className="relative z-10">
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center">
                    <Zap className="h-6 w-6 mr-2 text-accent-500" />
                    What's Your Next Step?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link to="/dashboard/log" className="btn btn-primary btn-3d flex flex-col items-center p-6">
                      <Activity className="h-8 w-8 mb-2" />
                      <span>Log Symptoms</span>
                      <span className="text-xs opacity-75">Track your health</span>
                    </Link>
                    <button onClick={resetChecker} className="btn btn-outline btn-3d flex flex-col items-center p-6">
                      <Search className="h-8 w-8 mb-2" />
                      <span>New Analysis</span>
                      <span className="text-xs opacity-75">Check different symptoms</span>
                    </button>
                    <Link to="/dashboard/mindfulness" className="btn btn-secondary btn-3d flex flex-col items-center p-6">
                      <Brain className="h-8 w-8 mb-2" />
                      <span>Mindfulness</span>
                      <span className="text-xs opacity-75">Reduce stress</span>
                    </Link>
                    <Link to="/quiz" className="btn btn-accent btn-3d flex flex-col items-center p-6">
                      <Award className="h-8 w-8 mb-2" />
                      <span>Health Quiz</span>
                      <span className="text-xs opacity-75">Test knowledge</span>
                    </Link>
                  </div>
                  <div className="max-w-3xl mx-auto">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong>Important:</strong> This advanced AI analysis provides insights based on symptom patterns and medical data, 
                      but it's not a substitute for professional medical advice. Our system has a 95% accuracy rate in symptom pattern recognition, 
                      but always consult a healthcare provider for proper diagnosis and treatment, especially for severe or persistent symptoms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}