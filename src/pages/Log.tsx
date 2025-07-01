import React, { useState } from 'react'
import { Calendar, Smile, Frown, Meh, Droplets, Moon, Activity, Pill } from 'lucide-react'
import { useData } from '../contexts/DataContext'

const symptoms = [
  'Headache', 'Fatigue', 'Cough', 'Fever', 'Nausea', 'Sore Throat',
  'Body Aches', 'Runny Nose', 'Dizziness', 'Anxiety', 'Insomnia', 'Appetite Loss'
]

const moodIcons = [
  { icon: Frown, label: 'Poor', value: 1, color: 'text-red-500' },
  { icon: Meh, label: 'Fair', value: 2, color: 'text-yellow-500' },
  { icon: Smile, label: 'Good', value: 3, color: 'text-green-500' },
]

export default function Log() {
  const { addSymptomLog, addHabitLog, getTodaysLogs } = useData()
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState<number>(3)
  const [notes, setNotes] = useState('')
  const [waterIntake, setWaterIntake] = useState('8')
  const [sleepHours, setSleepHours] = useState('8')
  const [steps, setSteps] = useState('5000')
  const [medicationTaken, setMedicationTaken] = useState(false)

  const todaysLogs = getTodaysLogs()

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const handleSaveSymptoms = () => {
    const today = new Date().toISOString().split('T')[0]
    addSymptomLog({
      date: today,
      symptoms: selectedSymptoms,
      mood: selectedMood,
      notes,
    })
    alert('Symptoms logged successfully!')
    setSelectedSymptoms([])
    setNotes('')
  }

  const handleSaveHabits = () => {
    const today = new Date().toISOString().split('T')[0]
    addHabitLog({
      date: today,
      water: parseInt(waterIntake) || 0,
      sleep: parseInt(sleepHours) || 0,
      steps: parseInt(steps) || 0,
      medication: medicationTaken,
    })
    alert('Habits logged successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Daily Log 📝</h1>
        <p className="text-primary-100 text-lg">Track your health today</p>
      </div>

      {/* Symptoms Section */}
      <div className="card p-6">
        <div className="flex items-center mb-6">
          <Calendar className="h-6 w-6 text-primary-500 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How are you feeling?</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {symptoms.map((symptom) => (
            <button
              key={symptom}
              onClick={() => toggleSymptom(symptom)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSymptoms.includes(symptom)
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {moodIcons.map(({ icon: Icon, label, value, color }) => (
            <button
              key={value}
              onClick={() => setSelectedMood(value)}
              className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                selectedMood === value
                  ? 'bg-primary-50 border-2 border-primary-500 dark:bg-primary-900/20'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'
              }`}
            >
              <Icon className={`h-8 w-8 mb-2 ${selectedMood === value ? 'text-primary-500' : color}`} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
            </button>
          ))}
        </div>

        <textarea
          className="input min-h-[80px] resize-none"
          placeholder="Add notes about your day..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {!todaysLogs.symptom ? (
          <button onClick={handleSaveSymptoms} className="btn btn-primary w-full mt-4">
            Save Symptoms
          </button>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4 italic">
            ✅ Already logged today
          </p>
        )}
      </div>

      {/* Habits Section */}
      <div className="card p-6">
        <div className="flex items-center mb-6">
          <Activity className="h-6 w-6 text-secondary-500 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Healthy Habits</h2>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Droplets className="h-5 w-5 text-primary-500 mr-3" />
              <span className="text-gray-700 dark:text-gray-300">Water (glasses)</span>
            </div>
            <input
              type="number"
              className="input w-20 text-center"
              value={waterIntake}
              onChange={(e) => setWaterIntake(e.target.value)}
              placeholder="8"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Moon className="h-5 w-5 text-accent-500 mr-3" />
              <span className="text-gray-700 dark:text-gray-300">Sleep (hours)</span>
            </div>
            <input
              type="number"
              className="input w-20 text-center"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              placeholder="8"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-secondary-500 mr-3" />
              <span className="text-gray-700 dark:text-gray-300">Steps</span>
            </div>
            <input
              type="number"
              className="input w-24 text-center"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              placeholder="5000"
            />
          </div>
        </div>

        <button
          onClick={() => setMedicationTaken(!medicationTaken)}
          className={`flex items-center justify-center w-full p-4 rounded-lg border-2 transition-colors ${
            medicationTaken
              ? 'bg-secondary-50 border-secondary-500 text-secondary-700 dark:bg-secondary-900/20 dark:text-secondary-400'
              : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <Pill className={`h-5 w-5 mr-2 ${medicationTaken ? 'text-secondary-500' : 'text-gray-400'}`} />
          {medicationTaken ? 'Medication taken ✓' : 'Take medication'}
        </button>

        {!todaysLogs.habit ? (
          <button onClick={handleSaveHabits} className="btn btn-primary w-full mt-4">
            Save Habits
          </button>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4 italic">
            ✅ Already logged today
          </p>
        )}
      </div>
    </div>
  )
}