export const PUZZLE_TYPES = {
  pattern: {
    name: 'Pattern Shift',
    description: 'Identify sequences and patterns',
    icon: 'pattern',
  },
  number: {
    name: 'Number Grid',
    description: 'Numeric logic puzzles',
    icon: 'number',
  },
  memory: {
    name: 'Memory Grid',
    description: 'Remember and reproduce patterns',
    icon: 'memory',
  },
  word: {
    name: 'Word Link',
    description: 'Find the hidden connection',
    icon: 'word',
  },
  logic: {
    name: 'Logic Grid',
    description: 'Deductive reasoning',
    icon: 'logic',
  },
  rotate: {
    name: 'Rotate',
    description: 'Spatial rotation puzzles',
    icon: 'rotate',
  },
  sequence: {
    name: 'Sequence',
    description: 'What comes next?',
    icon: 'sequence',
  },
};

export const DIFFICULTY = {
  easy: { label: 'EASY', color: 'text-success' },
  medium: { label: 'MEDIUM', color: 'text-accent-lime' },
  hard: { label: 'HARD', color: 'text-accent' },
  expert: { label: 'EXPERT', color: 'text-error' },
};

export const ACHIEVEMENTS = {
  first_solve: {
    id: 'first_solve',
    name: 'First Solve',
    description: 'Solve your first puzzle',
    icon: '🎯',
  },
  no_mistakes: {
    id: 'no_mistakes',
    name: 'No Mistakes',
    description: 'Solve a puzzle without making any errors',
    icon: '✨',
  },
  speed_run: {
    id: 'speed_run',
    name: 'Speed Run',
    description: 'Solve a puzzle under the target time',
    icon: '⚡',
  },
  streak_7: {
    id: 'streak_7',
    name: 'Week Streak',
    description: 'Play seven days in a row',
    icon: '🔥',
  },
  logic_master: {
    id: 'logic_master',
    name: 'Logic Master',
    description: 'Complete 10 logic puzzles',
    icon: '🧠',
  },
  puzzle_addict: {
    id: 'puzzle_addict',
    name: 'Puzzle Addict',
    description: 'Solve 50 puzzles',
    icon: '📚',
  },
  combo_specialist: {
    id: 'combo_specialist',
    name: 'Combo Specialist',
    description: 'Achieve a FLOW x4 combo',
    icon: '🌊',
  },
  daily_streak_3: {
    id: 'daily_streak_3',
    name: 'Daily Streak',
    description: 'Complete 3 daily challenges in a row',
    icon: '📅',
  },
  perfect_memory: {
    id: 'perfect_memory',
    name: 'Perfect Memory',
    description: 'Solve a memory puzzle without mistakes',
    icon: '🧠',
  },
  expert_champion: {
    id: 'expert_champion',
    name: 'Expert Champion',
    description: 'Solve 10 expert puzzles',
    icon: '🏆',
  },
  efficiency: {
    id: 'efficiency',
    name: 'Efficiency',
    description: 'Average solve time under 2 minutes across 5 puzzles',
    icon: '⏱️',
  },
};

export const ACHIEVEMENT_LIST = Object.values(ACHIEVEMENTS);