import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star } from 'lucide-react';
import PuzzleCard from '../components/PuzzleCard';
import { PUZZLES } from '../data';
import { loadData } from '../utils/storage';
import { PUZZLE_TYPES } from '../data/achievements';

export default function PuzzlesScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [filtered, setFiltered] = useState(PUZZLES);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const data = loadData();
    setProfile(data.profile);
  }, []);

  useEffect(() => {
    let result = PUZZLES;

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(s) || 
        p.type.toLowerCase().includes(s)
      );
    }

    if (typeFilter !== 'all') {
      result = result.filter(p => p.type === typeFilter);
    }

    if (difficultyFilter !== 'all') {
      result = result.filter(p => p.difficulty === difficultyFilter);
    }

    if (showFavoritesOnly) {
      result = result.filter(p => profile?.favoriteIds?.includes(p.id));
    }

    setFiltered(result);
  }, [search, typeFilter, difficultyFilter, showFavoritesOnly, profile]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-6">PUZZLE LIBRARY</h1>

        <div className="space-y-4 bg-surface border border-border rounded-lg p-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-3 text-secondary" />
              <input
                type="text"
                placeholder="Search puzzles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-elevated border border-border rounded-lg pl-10 pr-4 py-2 text-primary focus:outline-none focus:border-accent"
              />
            </div>
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                showFavoritesOnly
                  ? 'bg-accent text-background border-accent'
                  : 'bg-elevated border-border text-secondary hover:text-primary'
              }`}
            >
              <Star size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-secondary uppercase mb-2 block">
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-primary focus:outline-none focus:border-accent"
              >
                <option value="all">All Types</option>
                {Object.entries(PUZZLE_TYPES).map(([key, type]) => (
                  <option key={key} value={key}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-secondary uppercase mb-2 block">
                Difficulty
              </label>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-primary focus:outline-none focus:border-accent"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 text-sm text-secondary">
        {filtered.length} puzzle{filtered.length !== 1 ? 's' : ''} found
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-secondary mb-4">No puzzles match your criteria</p>
          <button
            onClick={() => {
              setSearch('');
              setTypeFilter('all');
              setDifficultyFilter('all');
              setShowFavoritesOnly(false);
            }}
            className="btn-secondary"
          >
            CLEAR FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((puzzle) => (
            <PuzzleCard
              key={puzzle.id}
              puzzle={puzzle}
              onClick={() => navigate(`/puzzle/${puzzle.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
