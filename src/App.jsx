import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import HomeScreen from './components/HomeScreen';
import PuzzleScreen from './components/PuzzleScreen';
import PuzzlesScreen from './components/PuzzlesScreen';
import DailyScreen from './components/DailyScreen';
import ProgressScreen from './components/ProgressScreen';
import HistoryScreen from './components/HistoryScreen';
import SettingsScreen from './components/SettingsScreen';
import ProfileScreen from './components/ProfileScreen';
import './styles/components.css';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/play" element={<HomeScreen />} />
          <Route path="/puzzle/:puzzleId" element={<PuzzleScreen />} />
          <Route path="/puzzles" element={<PuzzlesScreen />} />
          <Route path="/daily" element={<DailyScreen />} />
          <Route path="/progress" element={<ProgressScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
