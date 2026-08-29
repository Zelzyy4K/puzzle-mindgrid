import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Calendar, Zap, Sparkles, Trophy, ArrowRight, Grid } from 'lucide-react';
import PuzzleCard from '../components/PuzzleCard';
import { loadData } from '../utils/storage';
import { PUZZLES, getPuzzlesByType } from '../data';
import { getDailyPuzzle } from '../data/daily';
import { PUZZLE_TYPES } from '../data/achievements';

export default function HomeScreen() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [dailyPuzzle, setDailyPuzzle] = useState(null);
  const [recentPuzzles, setRecentPuzzles] = useState([]);
  const [recommendedPuzzles, setRecommendedPuzzles] = useState([]);

  useEffect(() => {
    const data = loadData();
    setProfile(data.profile);

    const daily = getDailyPuzzle();
    setDailyPuzzle(daily);

    const solvedIds = Object.keys(data.progress || {}).filter(id => data.progress[id]?.solved);
    const solvedSet = new Set(solvedIds);

    const recs = PUZZLES.filter(p => !solvedSet.has(p.id)).slice(0, 3);
    setRecommendedPuzzles(recs.length > 0 ? recs : PUZZLES.slice(0, 3));

    if (data.history && data.history.length > 0) {
      const recentIds = data.history.slice(0, 3).map(h => h.puzzleId);
      const recents = PUZZLES.filter(p => recentIds.includes(p.id));
      setRecentPuzzles(recents);
    }
  }, []);

  const handleSelectPuzzle = (puzzle) => {
    navigate(`/puzzle/${puzzle.id}`);
  };

  const handlePlayDaily = () => {
    if (dailyPuzzle) {
      navigate(`/puzzle/${dailyPuzzle.id}?daily=true`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Continue Section (if played before) */}
      {recentPuzzles.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={20} className="text-accent" />
            <h2 className="text-sm font-bold tracking-wider uppercase text-secondary">
              Continue
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentPuzzles.map((puzzle) => (
              <PuzzleCard
                key={puzzle.id}
                puzzle={puzzle}
                onClick={handleSelectPuzzle}
              />
            ))}
          </div>
        </section>
      )}

      {/* Daily Challenge Featured Hero */}
      {dailyPuzzle && (
        <section className="bg-surface border border-accent/40 rounded-xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 opacity-5 pointer-events-none text-accent">
            <Calendar size={300} />
          </div>
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-accent text-background text-xs font-bold px-2.5 py-1 rounded">
                DAILY CHALLENGE
              </span>
              <span className="text-xs text-secondary uppercase font-mono tracking-wider">
                {dailyPuzzle.dateKey}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              {dailyPuzzle.title}
            </h1>
            <p className="text-secondary text-sm mb-6">
              {dailyPuzzle.instructions}
            </p>

            <div className="flex items-center gap-6 mb-6 text-sm text-secondary">
              <div>
                Type: <span className="text-primary font-medium uppercase">{dailyPuzzle.type}</span>
              </div>
              <div>
                Difficulty: <span className="text-accent font-medium uppercase">{dailyPuzzle.difficulty}</span>
              </div>
              <div>
                Reward: <span className="text-accent-lime font-bold">+500 XP</span>
              </div>
            </div>

            <button onClick={handlePlayDaily} className="btn-primary">
              <Play size={18} className="mr-2 fill-current" /> PLAY DAILY PUZZLE
            </button>
          </div>
        </section>
      )}

      {/* Recommended Puzzles */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-accent-lime" />
            <h2 className="text-sm font-bold tracking-wider uppercase text-secondary">
              Recommended For You
            </h2>
          </div>
          <button 
            onClick={() => navigate('/puzzles')} 
            className="text-xs font-semibold text-secondary hover:text-primary flex items-center gap-1 transition-colors"
          >
            VIEW ALL <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedPuzzles.map((puzzle) => (
            <PuzzleCard
              key={puzzle.id}
              puzzle={puzzle}
              onClick={handleSelectPuzzle}
            />
          ))}
        </div>
      </section>

      {/* Browse by Puzzle Types */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Grid size={20} className="text-secondary" />
          <h2 className="text-sm font-bold tracking-wider uppercase text-secondary">
            Puzzle Categories
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(PUZZLE_TYPES).map(([typeKey, typeInfo]) => {
            const count = getPuzzlesByType(typeKey).length;
            return (
              <div
                key={typeKey}
                onClick={() => navigate(`/puzzles?type=${typeKey}`)}
                className="bg-surface border border-border rounded-lg p-5 cursor-pointer hover:border-accent hover:bg-elevated transition-all group"
              >
                <div className="text-xs text-secondary font-mono mb-2">{count} Puzzles</div>
                <h3 className="font-bold text-primary group-hover:text-accent transition-colors mb-1">
                  {typeInfo.name}
                </h3>
                <p className="text-xs text-secondary line-clamp-2">
                  {typeInfo.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
