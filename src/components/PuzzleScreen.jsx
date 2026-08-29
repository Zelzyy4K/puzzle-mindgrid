import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import Timer from '../components/Timer';
import HintPanel from '../components/HintPanel';
import ScoreDisplay from '../components/ScoreDisplay';
import PuzzleToolbar from '../components/PuzzleToolbar';
import { getPuzzleById } from '../data';
import { getEngine } from '../engine/puzzleEngine';
import { loadData, updateProgress, addHistory, recordSolve } from '../utils/storage';
import { calculateXP } from '../utils/scoring';

export default function PuzzleScreen() {
  const { puzzleId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDaily = searchParams.get('daily') === 'true';

  const [puzzle, setPuzzle] = useState(null);
  const [engine, setEngine] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const data = loadData();
    setProfileData(data.profile);

    const p = getPuzzleById(puzzleId);
    if (p) {
      setPuzzle(p);
      const eng = getEngine(p.data, p.solution);
      setEngine(eng);
    } else {
      navigate('/play');
    }
  }, [puzzleId, navigate]);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleUseHint = (index) => {
    setHintsUsed(prev => prev + 1);
    if (engine) {
      engine.useHint(`hint${index + 1}`);
    }
  };

  const handleUndo = () => {
    if (engine) {
      engine.popHistory();
      setSelectedAnswer(null);
    }
  };

  const handleReset = () => {
    if (engine) {
      engine.reset();
      setSelectedAnswer(null);
      setHintsUsed(0);
      setMistakes(0);
    }
  };

  const handleSubmit = () => {
    if (!engine || !puzzle || !selectedAnswer) return;

    const isCorrect = selectedAnswer === puzzle.solution;

    if (isCorrect) {
      const finalScore = engine.getScore(puzzle.difficulty);
      setScore(finalScore);
      setIsRunning(false);
      setIsComplete(true);

      const data = loadData();
      recordSolve(puzzle);

      updateProgress(puzzleId, {
        solved: true,
        bestScore: Math.max(data.progress[puzzleId]?.bestScore || 0, finalScore),
        attempts: (data.progress[puzzleId]?.attempts || 0) + 1,
        lastAttempted: new Date().toISOString(),
      });

      addHistory({
        puzzleId: puzzle.id,
        type: puzzle.type,
        difficulty: puzzle.difficulty,
        score: finalScore,
        time: engine.getElapsedTime(),
        result: 'solved',
        isDaily: isDaily,
      });

      const xp = calculateXP(puzzle.difficulty, finalScore);
      const updated = recordSolve(puzzle);

    } else {
      setMistakes(prev => prev + 1);
      engine.checkMistake();
    }
  };

  if (!puzzle || !engine) {
    return <div className="text-center py-12">Loading puzzle...</div>;
  }

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-accent mb-4">SOLVED</h1>
          <h2 className="text-2xl text-primary mb-2">{puzzle.title}</h2>
          <p className="text-secondary">{puzzle.type.toUpperCase()} • {puzzle.difficulty.toUpperCase()}</p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-8 mb-8">
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div>
              <div className="text-xs text-secondary mb-1">TIME</div>
              <div className="text-xl font-bold text-primary">{engine.getElapsedTime()}s</div>
            </div>
            <div>
              <div className="text-xs text-secondary mb-1">MISTAKES</div>
              <div className="text-xl font-bold text-primary">{mistakes}</div>
            </div>
            <div>
              <div className="text-xs text-secondary mb-1">HINTS</div>
              <div className="text-xl font-bold text-primary">{hintsUsed}</div>
            </div>
            <div>
              <div className="text-xs text-secondary mb-1">SCORE</div>
              <div className="text-2xl font-bold text-accent">{score.toLocaleString()}</div>
            </div>
          </div>

          <div className="text-sm text-accent-lime">
            +{calculateXP(puzzle.difficulty, score)} XP
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate(`/puzzle/${puzzle.id}`)} className="btn-secondary">
            RETRY
          </button>
          <button onClick={() => navigate('/play')} className="btn-primary">
            NEXT PUZZLE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/play')}
          className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
        >
          <ChevronLeft size={20} /> BACK
        </button>
        <div className="text-sm text-secondary">
          {puzzle.type.toUpperCase()} • {puzzle.difficulty.toUpperCase()}
        </div>
        <Timer isRunning={isRunning} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3 bg-surface border border-border rounded-lg p-6">
          <h1 className="text-2xl font-bold text-primary mb-2">{puzzle.title}</h1>
          <p className="text-secondary mb-6">{puzzle.instructions}</p>

          <div className="bg-elevated rounded-lg p-6 mb-6">
            {puzzle.type === 'sequence' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-lg font-mono text-primary mb-4">
                    {puzzle.data.sequence.map((item, idx) => (
                      <span key={idx}>
                        {item}
                        {idx < puzzle.data.sequence.length - 1 ? ' → ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {puzzle.data.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(option)}
                      className={`p-3 rounded border transition-colors ${
                        selectedAnswer === option
                          ? 'bg-accent text-background border-accent'
                          : 'bg-surface border-border hover:border-accent text-primary'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {puzzle.type === 'pattern' && (
              <div className="space-y-4">
                <div className="text-center text-secondary mb-4">
                  Pattern visualization area
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {puzzle.data.options?.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(option)}
                      className={`p-3 rounded border transition-colors ${
                        selectedAnswer === option
                          ? 'bg-accent text-background border-accent'
                          : 'bg-surface border-border hover:border-accent text-primary'
                      }`}
                    >
                      {JSON.stringify(option).substring(0, 30)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {puzzle.type === 'word' && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <div className="space-y-2">
                    {puzzle.data.words.map((word, idx) => (
                      <div key={idx} className="text-lg font-bold text-primary">
                        {word}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {puzzle.data.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(option)}
                      className={`p-3 rounded border transition-colors ${
                        selectedAnswer === option
                          ? 'bg-accent text-background border-accent'
                          : 'bg-surface border-border hover:border-accent text-primary'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <PuzzleToolbar
            onHint={() => handleUseHint(0)}
            onUndo={handleUndo}
            onReset={handleReset}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="lg:col-span-1 space-y-4">
          <ScoreDisplay
            score={score}
            xpEarned={calculateXP(puzzle.difficulty, score)}
          />
          <HintPanel hints={puzzle.hints} onUseHint={handleUseHint} />
        </div>
      </div>
    </div>
  );
}
