import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from './Home'
import Log from './Log'
import Trends from './Trends'
import Settings from './Settings'
import MindfulnessCenter from '../components/MindfulnessCenter'
import HealthGoals from '../components/HealthGoals'
import HealthMetrics from '../components/HealthMetrics'
import HealthAssistant from '../components/HealthAssistant'
import VoiceAssistant from '../components/VoiceAssistant'

export default function Dashboard() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log" element={<Log />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/mindfulness" element={<MindfulnessCenter />} />
          <Route path="/goals" element={<HealthGoals />} />
          <Route path="/metrics" element={<HealthMetrics />} />
        </Routes>
      </Layout>
      <HealthAssistant />
      <VoiceAssistant />
    </>
  )
}