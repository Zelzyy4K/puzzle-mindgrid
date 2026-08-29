// Number Grid puzzles (Sudoku-inspired but unique)
export const numberPuzzles = [
  {
    id: 'number-001',
    type: 'number',
    difficulty: 'easy',
    title: 'Latin Square Lite',
    instructions: 'Fill the grid so each row and column has unique numbers 1-4',
    data: {
      type: 'latin',
      size: 4,
      grid: [
        [1, 0, 0, 0],
        [0, 3, 0, 1],
        [0, 0, 4, 0],
        [4, 0, 1, 0],
      ],
      answer: [
        [1, 4, 2, 3],
        [2, 3, 4, 1],
        [3, 2, 4, 1],
        [4, 1, 3, 2],
      ],
    },
    hints: [
      'Each row needs numbers 1-4 without repeats',
      'Each column needs numbers 1-4 without repeats',
      'Start with obvious placements where only one number fits',
    ],
    estimatedTime: 120,
    scoreMultiplier: 1,
  },
  {
    id: 'number-002',
    type: 'number',
    difficulty: 'easy',
    title: 'Sum Detective',
    instructions: 'Each row and column has a target sum. Fill in the missing numbers.',
    data: {
      type: 'sum_grid',
      size: 3,
      grid: [
        [2, 0, 1, 5],
        [0, 1, 0, 4],
        [1, 0, 2, 5],
        [3, 3, 3, 9],
      ],
      answer: [
        [2, 2, 1, 5],
        [1, 1, 2, 4],
        [1, 2, 2, 5],
        [3, 3, 3, 9],
      ],
    },
    hints: [
      'Each row and column must sum to the number in the last cell',
      'Row 1: 2 + ? + 1 = 5, so ? = 2',
      'Column 1: 2 + ? + 1 = 3, so ? = 0',
    ],
    estimatedTime: 90,
    scoreMultiplier: 1,
  },
  {
    id: 'number-003',
    type: 'number',
    difficulty: 'medium',
    title: 'Product Puzzle',
    instructions: 'Each region has a target product. Use numbers 1-6.',
    data: {
      type: 'product_regions',
      size: 3,
      regions: [
        [[0, 0], [0, 1]], // horizontal pair, target 6
        [[1, 0], [2, 0]], // vertical pair, target 6
        [[1, 1], [1, 2]], // horizontal pair, target 6
        [[2, 1], [2, 2]], // horizontal pair, target 4
      ],
      targets: [6, 6, 6, 4],
      grid: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      answer: [
        [2, 3, 1],
        [3, 2, 3],
        [2, 1, 2],
      ],
    },
    hints: [
      'Each region multiplies to its target number',
      'Region [0,0] and [0,1] must multiply to 6',
      'Possible pairs: 2×3 or 3×2 or 1×6 or 6×1 (but only 1-3 allowed)',
    ],
    estimatedTime: 180,
    scoreMultiplier: 1.5,
  },
  {
    id: 'number-004',
    type: 'number',
    difficulty: 'medium',
    title: 'Difference Grid',
    instructions: 'Each cell shows the difference between adjacent numbers.',
    data: {
      type: 'difference',
      size: 3,
      diffGrid: [
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
      ],
      known: [[0, 0, 5]],
      answer: [
        [5, 4, 5],
        [3, 4, 5],
        [3, 4, 5],
      ],
    },
    hints: [
      'Each number equals the cell above plus the difference value',
      'Start with the known value and propagate',
      'Cell (0,1) = cell(0,0) - diff[0,1] = 5 - 1 = 4',
    ],
    estimatedTime: 150,
    scoreMultiplier: 1.5,
  },
  {
    id: 'number-005',
    type: 'number',
    difficulty: 'hard',
    title: 'Magic Square',
    instructions: 'Each row, column, and diagonal sums to 15 using numbers 1-9.',
    data: {
      type: 'magic',
      size: 3,
      grid: [
        [8, 0, 6],
        [0, 5, 0],
        [0, 0, 0],
      ],
      answer: [
        [8, 1, 6],
        [3, 5, 7],
        [4, 9, 2],
      ],
    },
    hints: [
      'The classic magic square where everything sums to 15',
      'Center is always 5 in a 3x3 magic square',
      'Corners are even numbers: 2, 4, 6, 8',
    ],
    estimatedTime: 300,
    scoreMultiplier: 2,
  },
];