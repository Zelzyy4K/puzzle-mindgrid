import React from 'react';
import { Award } from 'lucide-react';

export default function AchievementToast({ achievement, onClose }) {
  if (!achievement) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-surface border border-accent rounded-lg p-4 shadow-lg flex items-center gap-4 max-w-sm">
        <div className="bg-accent/10 p-3 rounded-full text-accent">
          <Award size={24} />
        </div>
        <div>
          <div className="text-sm text-accent font-bold uppercase tracking-wider mb-1">
            Achievement Unlocked
          </div>
          <h3 className="text-lg font-bold text-primary">{achievement.name}</h3>
          <p className="text-sm text-secondary mt-1">
            {achievement.description}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-secondary hover:text-primary transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
