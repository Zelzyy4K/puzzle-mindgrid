import { patternPuzzles } from './patternPuzzles';
import { numberPuzzles } from './numberPuzzles';
import { memoryPuzzles } from './memoryPuzzles';
import { wordPuzzles } from './wordPuzzles';
import { logicPuzzles } from './logicPuzzles';
import { rotatePuzzles } from './rotatePuzzles';
import { sequencePuzzles } from './sequencePuzzles';

export const PUZZLES = [
  ...patternPuzzles,
  ...numberPuzzles,
  ...memoryPuzzles,
  ...wordPuzzles,
  ...logicPuzzles,
  ...rotatePuzzles,
  ...sequencePuzzles,
];

export function getPuzzleById(id) {
  return PUZZLES.find(p => p.id === id);
}

export function getPuzzlesByType(type) {
  return PUZZLES.filter(p => p.type === type);
}

export function getPuzzlesByDifficulty(difficulty) {
  return PUZZLES.filter(p => p.difficulty === difficulty);
}

export function getRandomPuzzle() {
  return PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
}

export function getRandomPuzzlesByType(type, count = 3) {
  const puzzles = getPuzzlesByType(type);
  const shuffled = [...puzzles].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
