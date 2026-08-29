import React, { useState, useEffect } from 'react';
import { Calendar, Gift, Award } from 'lucide-react';
import { loadData, updateDaily } from '../utils/storage';
import { getDailyPuzzle, getTodayKey } from '../data/daily';
import { useNavigate } from 'react-router-dom';
import { formatDate, getDateKey } from '../utils/date';

export default function DailyScreen() {
  const navigate = useNavigate();
  const [dailyPuzzle, setDailyPuzzle] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const data = loadData();
    setProfile(data.profile);

    const puzzle = getDailyPuzzle();
    setDailyPuzzle(puzzle);

    const today = getDateKey();
    if (data.daily.lastDate === today && data.daily.completed) {
      setCompleted(true);
    }
  }, []);

  const handlePlayDaily = () => {
    if (dailyPuzzle) {
      navigate(`/puzzle/${dailyPuzzle.id}?daily=true`);
    }
  };

  if (!dailyPuzzle) {
    return <div className="text-center py-12">Loading daily challenge...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">DAILY CHALLENGE</h1>
        <p className="text-secondary">One puzzle. Every day. {formatDate(new Date())}</p>
      </div>

      {/* Daily Puzzle Hero */}
      <div className="bg-surface border border-accent/40 rounded-lg p-8 mb-8 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none text-accent text-8xl">
          <Gift />
        </div>

        <div className="relative z-10">
          <div className="inline-block bg-accent text-background text-xs font-bold px-3 py-1 rounded mb-4">
            TODAY'S PUZZLE
          </div>

          <h2 className="text-4xl font-bold text-primary mb-4">{dailyPuzzle.title}</h2>

          <p className="text-lg text-secondary mb-6">{dailyPuzzle.instructions}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-elevated rounded-lg p-4">
              <div className="text-xs text-secondary mb-1 uppercase tracking-wider">Type</div>
              <div className="text-lg font-bold text-primary capitalize">
                {dailyPuzzle.type}
              </div>
            </div>
            <div className="bg-elevated rounded-lg p-4">
              <div className="text-xs text-secondary mb-1 uppercase tracking-wider">Difficulty</div>
              <div className="text-lg font-bold text-accent uppercase">
                {dailyPuzzle.difficulty}
              </div>
            </div>
          </div>

          <div className="bg-elevated rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Gift size={20} className="text-accent-lime" />
              <span className="text-sm text-secondary">Reward for completing:</span>
            </div>
            <div className="text-3xl font-bold text-accent-lime">+500 XP</div>
          </div>

          {completed ? (
            <div className="bg-success/10 border border-success rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-success">
                <Award size={20} />
                <span className="font-bold">COMPLETED TODAY</span>
              </div>
              <p className="text-sm text-secondary mt-2">Come back tomorrow for a new challenge</p>
            </div>
          ) : (
            <button onClick={handlePlayDaily} className="btn-primary w-full">
              <Calendar size={18} className="mr-2" /> PLAY DAILY PUZZLE
            </button>
          )}
        </div>
      </div>

      {/* Streak Info */}
      {profile && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-primary mb-4">YOUR STREAK</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-secondary mb-1 uppercase tracking-wider">Current</div>
              <div className="text-4xl font-bold text-accent-lime">{profile.currentStreak}</div>
              <div className="text-xs text-secondary mt-1">days</div>
            </div>
            <div>
              <div className="text-xs text-secondary mb-1 uppercase tracking-wider">Best</div>
              <div className="text-4xl font-bold text-accent">{profile.longestStreak}</div>
              <div className="text-xs text-secondary mt-1">days</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-secondary">
              {completed
                ? "You've completed today's puzzle. Keep your streak going tomorrow!"
                : 'Complete today to build your streak!'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
