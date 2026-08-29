import React from 'react';
import clsx from 'clsx';

export default function PuzzleCard({ puzzle, onClick, progress = null, showDifficulty = true }) {
  const { type, difficulty, title, estimatedTime, scoreMultiplier } = puzzle;
  const solved = progress?.solved;
  const bestScore = progress?.bestScore;

  return (
    <div 
      onClick={() => onClick(puzzle)}
      className="bg-surface border border-border rounded-lg p-4 transition-all cursor-pointer hover:bg-elevated hover:border-accent group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="text-sm font-medium text-secondary uppercase tracking-wider">
          {type}
        </div>
        {showDifficulty && (
          <div className={clsx(
            'text-xs px-2 py-1 rounded font-medium',
            difficulty === 'easy' && 'bg-green-900/20 text-success',
            difficulty === 'medium' && 'bg-yellow-900/20 text-accent-lime',
            difficulty === 'hard' && 'bg-amber-900/20 text-accent',
            difficulty === 'expert' && 'bg-red-900/20 text-error'
          )}>
            {difficulty.toUpperCase()}
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
        {title}
      </h3>

      <div className="text-sm text-secondary mb-3">
        ≈ {estimatedTime} seconds
      </div>

      {solved && (
        <div className="mt-4 pt-3 border-t border-border">
          <div className="text-xs text-success">
            Best score: <span className="font-bold">{bestScore || 0}</span>
          </div>
        </div>
      )}
    </div>
  );
}
