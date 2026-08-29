import React from 'react';
import { RotateCw, CornerDownLeft, RotateCcw, Check } from 'lucide-react';

export default function PuzzleToolbar({ onUndo, onReset, onSubmit, onHint }) {
  return (
    <div className="flex gap-2">
      <button onClick={onHint} className="btn-secondary px-3 py-2">
        HINT
      </button>
      <button onClick={onUndo} className="btn-secondary p-2">
        <CornerDownLeft size={18} />
      </button>
      <button onClick={onReset} className="btn-secondary p-2">
        <RotateCcw size={18} />
      </button>
      <button onClick={onSubmit} className="btn-primary flex-1">
        SUBMIT <Check size={18} className="ml-2" />
      </button>
    </div>
  );
}
