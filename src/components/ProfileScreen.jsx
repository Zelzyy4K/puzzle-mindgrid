import React, { useState, useEffect } from 'react';
import { User, Award, Zap, Calendar, Trophy, Target, TrendingUp, Edit2, Check } from 'lucide-react';
import { loadData } from '../utils/storage';
import { ACHIEVEMENTS } from '../data/achievements';

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [playerName, setPlayerName] = useState('Player');

  useEffect(() => {
    const data = loadData();
    setProfile(data.profile);
    setUnlockedAchievements(data.achievements || []);
    if (data.settings?.playerName) {
      setPlayerName(data.settings.playerName);
    }
  }, []);

  const handleSaveName = () => {
    setIsEditingName(false);
  };

  if (!profile) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">PROFILE</h1>
        <p className="text-secondary">Your puzzle journey</p>
      </div>

      {/* Profile Header */}
      <section className="bg-surface border border-border rounded-lg p-8 mb-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
            <User size={40} className="text-accent" />
          </div>
          <div className="flex-1">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="bg-elevated border border-border rounded px-3 py-1 text-xl font-bold text-primary focus:outline-none focus:border-accent"
                  autoFocus
                />
                <button onClick={handleSaveName} className="text-accent hover:text-primary">
                  <Check size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-primary">{playerName}</h2>
                <button onClick={() => setIsEditingName(true)} className="text-secondary hover:text-primary">
                  <Edit2 size={16} />
                </button>
              </div>
            )}
            <div className="text-secondary">Level {profile.level}</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-accent">{profile.xp}</div>
            <div className="text-xs text-secondary">XP</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-elevated rounded-lg p-4 text-center">
            <Trophy size={20} className="mx-auto text-accent mb-2" />
            <div className="text-2xl font-bold text-primary">{profile.totalSolved}</div>
            <div className="text-xs text-secondary">Solved</div>
          </div>
          <div className="bg-elevated rounded-lg p-4 text-center">
            <Zap size={20} className="mx-auto text-accent-lime mb-2" />
            <div className="text-2xl font-bold text-primary">{profile.currentStreak}</div>
            <div className="text-xs text-secondary">Streak</div>
          </div>
          <div className="bg-elevated rounded-lg p-4 text-center">
            <Target size={20} className="mx-auto text-success mb-2" />
            <div className="text-2xl font-bold text-primary">{profile.accuracy}%</div>
            <div className="text-xs text-secondary">Accuracy</div>
          </div>
          <div className="bg-elevated rounded-lg p-4 text-center">
            <TrendingUp size={20} className="mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-primary">{profile.bestScore}</div>
            <div className="text-xs text-secondary">Best</div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Award size={20} className="text-accent" />
          <h3 className="text-lg font-bold text-primary">ACHIEVEMENTS</h3>
          <span className="text-xs text-secondary ml-auto">
            {unlockedAchievements.length} / {Object.keys(ACHIEVEMENTS).length} unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(ACHIEVEMENTS).map((achievement) => {
            const isUnlocked = unlockedAchievements.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all ${
                  isUnlocked
                    ? 'bg-accent/10 border-accent/40'
                    : 'bg-elevated border-border opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <div className={`font-bold ${isUnlocked ? 'text-primary' : 'text-secondary'}`}>
                      {achievement.name}
                    </div>
                    <div className="text-xs text-secondary">{achievement.description}</div>
                  </div>
                  {isUnlocked && (
                    <Check size={16} className="ml-auto text-accent" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
