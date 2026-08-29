import { getDateKey } from '../utils/date';
import { PUZZLES } from './index';

function getSeed(dateStr) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function getDailyPuzzleId(seed) {
  const index = seed % PUZZLES.length;
  return PUZZLES[index];
}

export function getDailyPuzzle() {
  const dateKey = getDateKey();
  const seed = getSeed(dateKey);
  const puzzle = getDailyPuzzleId(seed);
  
  return {
    ...puzzle,
    dateKey: dateKey,
    seed: seed,
  };
}

export function checkDailyCompleted(dateKey) {
  const dailyKey = dateKey || getDateKey();
  return {
    key: dailyKey,
    completed: false,
  };
}

export function getTodayKey() {
  return getDateKey();
}
