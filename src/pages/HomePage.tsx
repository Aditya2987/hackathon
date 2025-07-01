import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Activity, TrendingUp, Brain, Shield, Users, Award, ArrowRight, Menu, X, Moon, Sun, ChevronDown } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useState } from 'react'

const features = [
  {
    icon: Activity,
    title: 'Daily Health Tracking',
    description: 'Log your symptoms, mood, and daily habits with our intuitive interface. Track water intake, sleep, exercise, and medication.',
    color: 'text-primary-500'
  },
  {
    icon: TrendingUp,
    title: 'Health Insights & Trends',
    description: 'Visualize your health patterns over time with detailed charts and analytics. Identify triggers and track improvements.',
    color: 'text-secondary-500'
  },
  {
    icon: Brain,
    title: 'AI Disease Checker',
    description: 'Get preliminary health insights based on your symptoms. Our intelligent system helps identify potential conditions.',
    color: 'text-accent-500'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your health data stays private and secure. All information is stored locally on your device.',
    color: 'text-red-500'
  },
  {
    icon: Users,
    title: 'Health Education',
    description: 'Access daily health tips, take interactive quizzes, and learn about wellness from trusted sources.',
    color: 'text-purple-500'
  },
  {
    icon: Award,
    title: 'Achievement System',
    description: 'Stay motivated with our gamified approach. Earn certificates and track your health journey milestones.',
    color: 'text-green-500'
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Health Enthusiast',
    content: 'SymptoTrack has completely changed how I monitor my health. The insights are incredible!',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Dr. Michael Chen',
    role: 'General Practitioner',
    content: 'I recommend SymptoTrack to my patients. It helps them track symptoms effectively.',
    avatar: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Wellness Coach',
    content: 'The habit tracking feature is fantastic. My clients love the visual progress reports.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
]

export default function HomePage() {
  const { isDark, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary-500" />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-foreground">SymptoTrack</h1>
                <p className="text-xs text-muted-foreground">Track. Learn. Stay Healthy.</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground hover:text-primary-500 transition-colors">Features</a>
              <a href="#about" className="text-foreground hover:text-primary-500 transition-colors">About</a>
              <Link to="/quiz" className="text-foreground hover:text-primary-500 transition-colors">Health Quiz</Link>
              <a href="#contact" className="text-foreground hover:text-primary-500 transition-colors">Contact</a>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-4 py-2 space-y-1">
              <a href="#features" className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg">Features</a>
              <a href="#about" className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg">About</a>
              <Link to="/quiz" className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg">Health Quiz</Link>
              <a href="#contact" className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg">Contact</a>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-foreground">Dark Mode</span>
                <button onClick={toggleTheme} className="p-1">
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
              <Link to="/dashboard" className="block mx-3 my-2">
                <div className="btn btn-primary w-full text-center">Go to Dashboard</div>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 mesh-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="floating-element">
              <Heart className="h-20 w-20 text-primary-500 mx-auto mb-8" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-shadow-lg">
              Your Health Journey
              <span className="gradient-text block">Starts Here</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Track symptoms, monitor habits, and gain insights into your health with our comprehensive wellness platform. 
              Take control of your wellbeing today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard" className="btn btn-primary btn-3d px-8 py-4 text-lg">
                Start Tracking Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/disease-checker" className="btn btn-outline btn-3d px-8 py-4 text-lg">
                Check Symptoms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Your Health
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to monitor, understand, and improve your health in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card card-3d p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="mb-6">
                  <feature.icon className={`h-12 w-12 ${feature.color} mx-auto group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose SymptoTrack?
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                SymptoTrack is designed by healthcare professionals and wellness experts to provide you with 
                the tools you need to take control of your health journey.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Privacy Protected</h4>
                    <p className="text-muted-foreground">Your data stays on your device, ensuring complete privacy.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Brain className="h-6 w-6 text-secondary-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">AI-Powered Insights</h4>
                    <p className="text-muted-foreground">Get intelligent health recommendations based on your data.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-accent-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Expert Backed</h4>
                    <p className="text-muted-foreground">Developed with input from medical professionals.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="card card-glass p-8 floating-element">
                <img 
                  src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
                  alt="Health tracking dashboard" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of people who trust SymptoTrack with their health journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card card-glass p-6 text-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users who are already taking control of their health with SymptoTrack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="btn btn-primary btn-3d px-8 py-4 text-lg">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/quiz" className="btn btn-outline btn-3d px-8 py-4 text-lg">
              Take Health Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-muted/50 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-primary-500" />
                <div className="ml-3">
                  <h3 className="text-xl font-bold text-foreground">SymptoTrack</h3>
                  <p className="text-sm text-muted-foreground">Track. Learn. Stay Healthy.</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Empowering individuals to take control of their health through intelligent tracking, 
                insights, and education.
              </p>
              <div className="flex space-x-4">
                <button className="p-2 rounded-lg bg-primary-500/10 text-primary-500 hover:bg-primary-500/20 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-lg bg-secondary-500/10 text-secondary-500 hover:bg-secondary-500/20 transition-colors">
                  <Activity className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-lg bg-accent-500/10 text-accent-500 hover:bg-accent-500/20 transition-colors">
                  <Brain className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-primary-500 transition-colors">Features</a></li>
                <li><Link to="/dashboard" className="text-muted-foreground hover:text-primary-500 transition-colors">Dashboard</Link></li>
                <li><Link to="/quiz" className="text-muted-foreground hover:text-primary-500 transition-colors">Health Quiz</Link></li>
                <li><Link to="/disease-checker" className="text-muted-foreground hover:text-primary-500 transition-colors">Disease Checker</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary-500 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2025 SymptoTrack. All rights reserved. Made with ❤️ for your health.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}