import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { loadData } from '../utils/storage';
import { formatDate, formatTime } from '../utils/date';
import { PUZZLE_TYPES } from '../data/achievements';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const data = loadData();
    setHistory(data.history || []);
  }, []);

  useEffect(() => {
    let result = history;

    if (filter === 'solved') {
      result = result.filter(h => h.result === 'solved');
    } else if (filter === 'failed') {
      result = result.filter(h => h.result === 'failed');
    } else if (filter === 'daily') {
      result = result.filter(h => h.isDaily);
    }

    setFiltered(result);
  }, [history, filter]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">HISTORY</h1>
        <p className="text-secondary">Your puzzle attempts and results</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border">
        {['all', 'solved', 'failed', 'daily'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? 'border-b-2 border-accent text-primary'
                : 'text-secondary hover:text-primary'
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* History List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <Calendar size={48} className="mx-auto text-secondary mb-4 opacity-50" />
          <p className="text-secondary">No puzzle attempts yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className="bg-surface border border-border rounded-lg p-4 hover:border-accent transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {entry.result === 'solved' ? (
                      <CheckCircle size={18} className="text-success" />
                    ) : (
                      <XCircle size={18} className="text-error" />
                    )}
                    <h3 className="font-bold text-primary">
                      {entry.puzzleTitle || `${entry.type} Puzzle`}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded bg-elevated text-secondary">
                      {entry.type.toUpperCase()}
                    </span>
                    {entry.isDaily && (
                      <span className="text-xs px-2 py-1 rounded bg-accent/20 text-accent">
                        DAILY
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-secondary">
                    <span className="capitalize">{entry.difficulty}</span>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {formatTime(entry.time)}
                    </div>
                    <span>{formatDate(entry.timestamp)}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {entry.score.toLocaleString()}
                  </div>
                  <div className="text-xs text-secondary">points</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
