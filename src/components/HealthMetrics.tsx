import React, { useState } from 'react'
import { Activity, Heart, Thermometer, Droplets, Scale, Ruler, Calculator } from 'lucide-react'

interface HealthMetric {
  id: string
  name: string
  value: number
  unit: string
  date: string
  category: 'vitals' | 'body' | 'fitness'
}

export default function HealthMetrics() {
  const [metrics, setMetrics] = useState<HealthMetric[]>([])
  const [newMetric, setNewMetric] = useState({
    name: '',
    value: 0,
    unit: '',
    category: 'vitals' as HealthMetric['category']
  })

  const metricTemplates = [
    { name: 'Blood Pressure (Systolic)', unit: 'mmHg', category: 'vitals', icon: Heart, color: 'text-red-500' },
    { name: 'Blood Pressure (Diastolic)', unit: 'mmHg', category: 'vitals', icon: Heart, color: 'text-red-500' },
    { name: 'Heart Rate', unit: 'bpm', category: 'vitals', icon: Activity, color: 'text-pink-500' },
    { name: 'Body Temperature', unit: '°F', category: 'vitals', icon: Thermometer, color: 'text-orange-500' },
    { name: 'Weight', unit: 'lbs', category: 'body', icon: Scale, color: 'text-blue-500' },
    { name: 'Height', unit: 'inches', category: 'body', icon: Ruler, color: 'text-green-500' },
    { name: 'Body Fat %', unit: '%', category: 'body', icon: Calculator, color: 'text-purple-500' },
    { name: 'Hydration', unit: 'glasses', category: 'fitness', icon: Droplets, color: 'text-cyan-500' },
  ]

  const addMetric = (template: typeof metricTemplates[0]) => {
    if (newMetric.value <= 0) return

    const metric: HealthMetric = {
      id: Date.now().toString(),
      name: template.name,
      value: newMetric.value,
      unit: template.unit,
      date: new Date().toISOString().split('T')[0],
      category: template.category as HealthMetric['category']
    }

    setMetrics([...metrics, metric])
    setNewMetric({ name: '', value: 0, unit: '', category: 'vitals' })
  }

  const calculateBMI = () => {
    const weight = metrics.find(m => m.name === 'Weight')?.value
    const height = metrics.find(m => m.name === 'Height')?.value
    
    if (weight && height) {
      const bmi = (weight / (height * height)) * 703
      return bmi.toFixed(1)
    }
    return null
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' }
    if (bmi < 25) return { category: 'Normal', color: 'text-green-500' }
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500' }
    return { category: 'Obese', color: 'text-red-500' }
  }

  const getBloodPressureCategory = () => {
    const systolic = metrics.find(m => m.name === 'Blood Pressure (Systolic)')?.value
    const diastolic = metrics.find(m => m.name === 'Blood Pressure (Diastolic)')?.value
    
    if (systolic && diastolic) {
      if (systolic < 120 && diastolic < 80) return { category: 'Normal', color: 'text-green-500' }
      if (systolic < 130 && diastolic < 80) return { category: 'Elevated', color: 'text-yellow-500' }
      if (systolic < 140 || diastolic < 90) return { category: 'High Stage 1', color: 'text-orange-500' }
      return { category: 'High Stage 2', color: 'text-red-500' }
    }
    return null
  }

  const bmi = calculateBMI()
  const bmiCategory = bmi ? getBMICategory(parseFloat(bmi)) : null
  const bpCategory = getBloodPressureCategory()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="floating-element mb-6">
          <Activity className="h-16 w-16 text-primary-500 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Health Metrics</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Track your vital signs and body measurements to monitor your health progress.
        </p>
      </div>

      {/* Health Insights */}
      {(bmi || bpCategory) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bmi && bmiCategory && (
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <Calculator className="h-6 w-6 text-primary-500 mr-3" />
                <h3 className="text-xl font-semibold text-foreground">BMI Analysis</h3>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-500 mb-2">{bmi}</div>
                <div className={`text-lg font-medium ${bmiCategory.color} mb-4`}>
                  {bmiCategory.category}
                </div>
                <div className="text-sm text-muted-foreground">
                  Body Mass Index based on your height and weight
                </div>
              </div>
            </div>
          )}

          {bpCategory && (
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-red-500 mr-3" />
                <h3 className="text-xl font-semibold text-foreground">Blood Pressure</h3>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-2">
                  {metrics.find(m => m.name === 'Blood Pressure (Systolic)')?.value}/
                  {metrics.find(m => m.name === 'Blood Pressure (Diastolic)')?.value}
                </div>
                <div className={`text-lg font-medium ${bpCategory.color} mb-4`}>
                  {bpCategory.category}
                </div>
                <div className="text-sm text-muted-foreground">
                  Systolic/Diastolic pressure in mmHg
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Metrics */}
      <div className="card p-8">
        <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Record New Measurement</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricTemplates.map((template, index) => (
            <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center mb-3">
                <template.icon className={`h-5 w-5 ${template.color} mr-2`} />
                <span className="font-medium text-foreground text-sm">{template.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.1"
                  placeholder="Value"
                  className="input flex-1 text-sm"
                  value={newMetric.value || ''}
                  onChange={(e) => setNewMetric({ ...newMetric, value: parseFloat(e.target.value) || 0 })}
                />
                <span className="text-xs text-muted-foreground">{template.unit}</span>
              </div>
              <button
                onClick={() => addMetric(template)}
                disabled={newMetric.value <= 0}
                className="btn btn-primary w-full mt-3 text-sm disabled:opacity-50"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Metrics */}
      {metrics.length > 0 && (
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Recent Measurements</h3>
          <div className="space-y-4">
            {metrics.slice(-10).reverse().map((metric) => {
              const template = metricTemplates.find(t => t.name === metric.name)
              return (
                <div key={metric.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center">
                    {template && <template.icon className={`h-5 w-5 ${template.color} mr-3`} />}
                    <div>
                      <div className="font-medium text-foreground">{metric.name}</div>
                      <div className="text-sm text-muted-foreground">{metric.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">
                      {metric.value} {metric.unit}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Health Tips */}
      <div className="card p-8 gradient-bg">
        <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Health Monitoring Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <Heart className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Blood Pressure</h4>
                <p className="text-sm text-muted-foreground">
                  Measure at the same time daily, avoid caffeine 30 minutes before, and sit quietly for 5 minutes.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Scale className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Weight</h4>
                <p className="text-sm text-muted-foreground">
                  Weigh yourself at the same time each day, preferably in the morning after using the bathroom.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <Activity className="h-6 w-6 text-pink-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Heart Rate</h4>
                <p className="text-sm text-muted-foreground">
                  Check your resting heart rate in the morning before getting out of bed for the most accurate reading.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Thermometer className="h-6 w-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Temperature</h4>
                <p className="text-sm text-muted-foreground">
                  Normal body temperature ranges from 97°F to 99°F. Fever is generally considered 100.4°F or higher.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}