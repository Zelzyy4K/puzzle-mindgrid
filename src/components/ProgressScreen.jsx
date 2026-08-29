import React, { useState, useEffect } from 'react';
import { loadData } from '../utils/storage';
import { TrendingUp, Trophy, Zap, Target } from 'lucide-react';

export default function ProgressScreen() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const data = loadData();
    setProfile(data.profile);

    const xpPerLevel = 500 + (data.profile.level * 100);
    const xpProgress = Math.round((data.profile.xp / xpPerLevel) * 100);

    setStats({
      xpProgress,
      xpPerLevel,
      nextLevelXP: xpPerLevel - data.profile.xp,
    });
  }, []);

  if (!profile) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">PROGRESS</h1>
        <p className="text-secondary">Your puzzle mastery stats</p>
      </div>

      {/* Level Section */}
      <section className="bg-surface border border-border rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-secondary uppercase tracking-wider mb-2">
              Current Level
            </div>
            <div className="text-5xl font-bold text-accent">{profile.level}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-secondary uppercase tracking-wider mb-2">
              Next Level
            </div>
            <div className="text-3xl font-bold text-primary">{stats?.nextLevelXP} XP</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-secondary mb-2">
            <span>Experience Progress</span>
            <span>{profile.xp} / {stats?.xpPerLevel}</span>
          </div>
          <div className="w-full bg-elevated h-3 rounded-full overflow-hidden">
            <div
              className="bg-accent h-full rounded-full transition-all duration-500"
              style={{ width: `${stats?.xpProgress}%` }}
            />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trophy size={20} className="text-accent" />
            <h3 className="text-sm font-bold text-secondary uppercase">Total Solved</h3>
          </div>
          <div className="text-4xl font-bold text-primary">{profile.totalSolved}</div>
          <p className="text-xs text-secondary mt-2">puzzles completed</p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap size={20} className="text-accent-lime" />
            <h3 className="text-sm font-bold text-secondary uppercase">Current Streak</h3>
          </div>
          <div className="text-4xl font-bold text-accent-lime">{profile.currentStreak}</div>
          <p className="text-xs text-secondary mt-2">days in a row</p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target size={20} className="text-success" />
            <h3 className="text-sm font-bold text-secondary uppercase">Accuracy</h3>
          </div>
          <div className="text-4xl font-bold text-success">{profile.accuracy}%</div>
          <p className="text-xs text-secondary mt-2">solve rate</p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={20} className="text-primary" />
            <h3 className="text-sm font-bold text-secondary uppercase">Best Score</h3>
          </div>
          <div className="text-4xl font-bold text-primary">{profile.bestScore.toLocaleString()}</div>
          <p className="text-xs text-secondary mt-2">personal record</p>
        </div>
      </div>

      {/* Additional Stats */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-primary mb-6">DETAILED STATS</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-secondary">Average Solve Time</span>
            <span className="text-primary font-bold">{Math.round(profile.averageTime / 60)}m {profile.averageTime % 60}s</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-secondary">Longest Streak</span>
            <span className="text-primary font-bold">{profile.longestStreak} days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Member Since</span>
            <span className="text-primary font-bold">{new Date(profile.joinedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
