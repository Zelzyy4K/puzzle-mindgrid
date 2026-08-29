import { calculateScore, calculateTimeBonus } from '../utils/scoring';

// Base Puzzle Engine
export class PuzzleEngine {
  constructor(data, solution) {
    this.data = data;
    this.solution = solution ?? data?.answer ?? data?.solution;
    this.initialState = null;
    this.userInput = this.createInitialState();
    this.initialState = this.userInput;
    this.inputHistory = [];
    this.mistakes = 0;
    this.hintsUsed = 0;
    this.hintUses = {};
    this.startTime = Date.now();
  }

  createInitialState() {
    return null;
  }

  setInput(value) {
    this.inputHistory.push(this.userInput);
    this.userInput = value;
  }

  popHistory() {
    if (this.inputHistory.length > 0) {
      this.userInput = this.inputHistory.pop();
    }
    return this.userInput;
  }

  reset() {
    this.userInput = this.initialState;
    this.inputHistory = [];
    this.mistakes = 0;
    this.hintsUsed = 0;
    this.hintUses = {};
    this.startTime = Date.now();
    return this.userInput;
  }

  checkWin() {
    return this.userInput === this.solution;
  }

  checkMistake() {
    this.mistakes++;
    return true;
  }

  getScore(difficulty) {
    const timeElapsed = this.getElapsedTime();
    const targetTime = this.data?.estimatedTime || 120;
    const timeBonus = calculateTimeBonus(timeElapsed, targetTime);
    const baseScore = 100;
    return calculateScore(baseScore, timeBonus, this.mistakes, this.hintsUsed, difficulty);
  }

  useHint(hintId) {
    this.hintUses[hintId] = true;
    this.hintsUsed++;
  }

  getAvailableHints() {
    const hints = [];
    if (this.hintUses?.hint1 !== true) {
      hints.push({ id: 'hint1', text: this.data.hints?.[0] || '' });
    }
    if (this.hintUses?.hint2 !== true) {
      hints.push({ id: 'hint2', text: this.data.hints?.[1] || '' });
    }
    if (this.hintUses?.hint3 !== true) {
      hints.push({ id: 'hint3', text: this.data.hints?.[2] || '' });
    }
    return hints;
  }

  getElapsedTime() {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }
}

// Pattern Engine
export class PatternEngine extends PuzzleEngine {
  createInitialState() {
    return null;
  }

  checkWin() {
    return this.userInput === this.data.answer;
  }
}

// Number Engine
export class NumberEngine extends PuzzleEngine {
  createInitialState() {
    if (this.data.grid) {
      return this.data.grid.map(row => [...row]);
    }
    return null;
  }

  checkWin() {
    if (!this.data.answer || !this.userInput) return false;
    return JSON.stringify(this.userInput) === JSON.stringify(this.data.answer);
  }
}

// Memory Engine
export class MemoryEngine extends PuzzleEngine {
  createInitialState() {
    return {
      grid: Array(this.data.size).fill().map(() => Array(this.data.size).fill(false)),
      foundPairs: [],
      attempts: 0,
    };
  }

  checkWin() {
    if (this.data.type === 'pairs') {
      return this.userInput.foundPairs.length === this.data.pairs;
    }
    return false;
  }

  getAvailableHints() {
    const hints = [];
    if (this.hintUses?.hint1 !== true) {
      hints.push({ id: 'hint1', text: this.data.hints?.[0] || '' });
    }
    if (this.hintUses?.hint2 !== true) {
      hints.push({ id: 'hint2', text: this.data.hints?.[1] || '' });
    }
    if (this.hintUses?.hint3 !== true) {
      hints.push({ id: 'hint3', text: this.data.hints?.[2] || '' });
    }
    return hints;
  }

  checkMistake() {
    this.mistakes++;
    return true;
  }
}

// Sequence Engine
export class SequenceEngine extends PuzzleEngine {
  createInitialState() {
    return null;
  }

  checkWin() {
    return this.userInput === this.solution;
  }

  checkMistake() {
    this.mistakes++;
    return true;
  }

  getAvailableHints() {
    const hints = [];
    if (this.hintUses?.hint1 !== true) {
      hints.push({ id: 'hint1', text: this.data.hints?.[0] || '' });
    }
    if (this.hintUses?.hint2 !== true) {
      hints.push({ id: 'hint2', text: this.data.hints?.[1] || '' });
    }
    if (this.hintUses?.hint3 !== true) {
      hints.push({ id: 'hint3', text: this.data.hints?.[2] || '' });
    }
    return hints;
  }
}

// Word Engine
export class WordEngine extends PuzzleEngine {
  createInitialState() {
    return null;
  }

  checkWin() {
    return this.userInput === this.solution;
  }

  checkMistake() {
    this.mistakes++;
    return true;
  }

  getAvailableHints() {
    const hints = [];
    if (this.hintUses?.hint1 !== true) {
      hints.push({ id: 'hint1', text: this.data.hints?.[0] || '' });
    }
    if (this.hintUses?.hint2 !== true) {
      hints.push({ id: 'hint2', text: this.data.hints?.[1] || '' });
    }
    if (this.hintUses?.hint3 !== true) {
      hints.push({ id: 'hint3', text: this.data.hints?.[2] || '' });
    }
    return hints;
  }
}

// Logic Engine
export class LogicEngine extends PuzzleEngine {
  createInitialState() {
    return null;
  }

  checkWin() {
    return this.userInput === this.solution;
  }

  checkMistake() {
    this.mistakes++;
    return true;
  }

  getAvailableHints() {
    const hints = [];
    if (this.hintUses?.hint1 !== true) {
      hints.push({ id: 'hint1', text: this.data.hints?.[0] || '' });
    }
    if (this.hintUses?.hint2 !== true) {
      hints.push({ id: 'hint2', text: this.data.hints?.[1] || '' });
    }
    if (this.hintUses?.hint3 !== true) {
      hints.push({ id: 'hint3', text: this.data.hints?.[2] || '' });
    }
    return hints;
  }
}

// Rotate Engine
export class RotateEngine extends PuzzleEngine {
  createInitialState() {
    if (this.data.type === 'rotate_single') {
      return this.data.tiles.map(t => t.current);
    }
    return [];
  }

  checkWin() {
    if (this.data.type === 'rotate_single') {
      return this.userInput[0] === this.data.answer[0];
    }
    return false;
  }

  checkMistake() {
    this.mistakes++;
    return true;
  }

  getAvailableHints() {
    const hints = [];
    if (this.hintUses?.hint1 !== true) {
      hints.push({ id: 'hint1', text: this.data.hints?.[0] || '' });
    }
    if (this.hintUses?.hint2 !== true) {
      hints.push({ id: 'hint2', text: this.data.hints?.[1] || '' });
    }
    if (this.hintUses?.hint3 !== true) {
      hints.push({ id: 'hint3', text: this.data.hints?.[2] || '' });
    }
    return hints;
  }
}

export function getEngine(puzzleData, solution) {
  switch (puzzleData.type) {
    case 'pattern':
      return new PatternEngine(puzzleData, solution);
    case 'number':
      return new NumberEngine(puzzleData, solution);
    case 'memory':
      return new MemoryEngine(puzzleData, solution);
    case 'sequence':
      return new SequenceEngine(puzzleData, solution);
    case 'word':
      return new WordEngine(puzzleData, solution);
    case 'logic':
      return new LogicEngine(puzzleData, solution);
    case 'rotate':
      return new RotateEngine(puzzleData, solution);
    default:
      return new PuzzleEngine(puzzleData, solution);
  }
}