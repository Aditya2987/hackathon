import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, PlusCircle, TrendingUp, Settings, Heart, Moon, Sun, ArrowLeft, Brain, Target, Activity, Stethoscope, MessageCircle } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Daily Log', href: '/dashboard/log', icon: PlusCircle },
  { name: 'Trends', href: '/dashboard/trends', icon: TrendingUp },
  { name: 'Mindfulness', href: '/dashboard/mindfulness', icon: Brain },
  { name: 'Goals', href: '/dashboard/goals', icon: Target },
  { name: 'Metrics', href: '/dashboard/metrics', icon: Activity },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-40 backdrop-blur-md bg-card/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center mr-6 text-muted-foreground hover:text-foreground transition-colors group">
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <div className="flex items-center">
                <div className="relative">
                  <Heart className="h-8 w-8 text-primary-500 floating-element" />
                  <div className="absolute inset-0 h-8 w-8 text-primary-500 animate-ping opacity-20">
                    <Heart className="h-8 w-8" />
                  </div>
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-foreground gradient-text">SymptoTrack Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Your Health Command Center</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/disease-checker" 
                className="btn btn-outline btn-glass px-4 py-2 text-sm hidden md:flex items-center"
              >
                <Stethoscope className="h-4 w-4 mr-2" />
                Disease Checker
              </Link>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Moon className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-card shadow-sm border-r border-border min-h-[calc(100vh-4rem)] sticky top-16 z-30">
          <div className="p-4">
            <ul className="space-y-2">
              {navigation.map((item, index) => {
                const isActive = location.pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={clsx(
                        'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden',
                        isActive
                          ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20 shadow-glow transform scale-105'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105 hover:shadow-md'
                      )}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <item.icon className={clsx(
                        'h-5 w-5 mr-3 transition-all duration-300',
                        isActive ? 'text-primary scale-110' : 'group-hover:scale-110'
                      )} />
                      <span className="relative z-10">{item.name}</span>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-xl" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
              <h3 className="text-sm font-semibold text-foreground mb-3">Today's Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Health Score</span>
                  <span className="text-sm font-bold text-primary">85%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-[85%] transition-all duration-1000" />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 relative">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
          
          {/* Floating Background Elements */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float" />
            <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          </div>
        </main>
      </div>
    </div>
  )
}