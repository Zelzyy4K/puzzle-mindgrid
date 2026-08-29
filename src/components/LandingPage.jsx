import React, { useState, useEffect } from 'react';
import { BrainCircuit, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadData } from '../utils/storage';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const data = loadData();
    setProgress(data.profile);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background text-primary px-4">
      <div className={`flex flex-col items-center text-center max-w-2xl transition-all duration-500 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="flex items-center gap-3 mb-8">
          <BrainCircuit size={48} className="text-accent" />
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter">MINDGRID</h1>
        </div>

        <p className="text-xl md:text-2xl text-secondary mb-12">
          "Small puzzles. Big arguments with your brain."
        </p>

        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <Link to="/play" className="btn-primary">
            START PLAYING <ChevronRight size={18} className="ml-2" />
          </Link>
          <Link to="/daily" className="btn-secondary">
            DAILY CHALLENGE
          </Link>
        </div>

        {progress?.totalSolved > 0 && (
          <div className="w-full max-w-md bg-surface rounded-lg p-6 border border-border">
            <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-secondary mb-1">
                  <span>Level {progress.level}</span>
                  <span>XP {progress.xp}/1500</span>
                </div>
                <div className="w-full bg-elevated h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-accent h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((progress.xp / 1500) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-secondary">Solved</div>
                  <div className="font-bold">{progress.totalSolved}</div>
                </div>
                <div>
                  <div className="text-secondary">Streak</div>
                  <div className="font-bold">{progress.currentStreak} days</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 text-sm text-secondary animate-pulse">
          Click to start your next puzzle
        </div>
      </div>
    </div>
  );
}
