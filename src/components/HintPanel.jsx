import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import clsx from 'clsx';

export default function HintPanel({ hints = [], onUseHint }) {
  const [usedHints, setUsedHints] = useState([]);
  const [showHint, setShowHint] = useState(null);

  const handleUseHint = (index) => {
    if (!usedHints.includes(index)) {
      setUsedHints([...usedHints, index]);
      onUseHint?.(index);
    }
    setShowHint(index);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={18} className="text-accent" />
        <h3 className="text-sm font-bold text-primary">HINTS</h3>
        <span className="text-xs text-secondary ml-auto">
          {usedHints.length} used (-{usedHints.length * 100} pts)
        </span>
      </div>

      <div className="space-y-2">
        {hints.map((hint, index) => (
          <div key={index} className="flex items-start gap-2">
            <button
              onClick={() => handleUseHint(index)}
              disabled={usedHints.includes(index)}
              className={clsx(
                'px-3 py-1 text-xs font-medium rounded transition-colors',
                usedHints.includes(index)
                  ? 'bg-elevated text-secondary cursor-not-allowed'
                  : 'bg-accent text-background hover:bg-accent/80'
              )}
            >
              {index + 1}
            </button>
            {showHint === index && (
              <p className="text-sm text-secondary leading-relaxed animate-fade-in">
                {hint}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
