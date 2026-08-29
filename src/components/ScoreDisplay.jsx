import React from 'react';
import { Trophy } from 'lucide-react';

export default function ScoreDisplay({ score, xpEarned, combo = 1 }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Trophy size={18} className="text-accent" />
        <h3 className="text-sm font-bold text-primary">SCORE</h3>
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-2xl font-bold text-primary font-mono">
            {score.toLocaleString()}
          </div>
          {xpEarned > 0 && (
            <div className="text-xs text-accent mt-1">
              +{xpEarned} XP
            </div>
          )}
        </div>

        {combo > 1 && (
          <div className="pt-3 border-t border-border">
            <div className="text-xs text-secondary">Combo</div>
            <div className="text-sm font-bold text-accent-lime">
              x{combo}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
