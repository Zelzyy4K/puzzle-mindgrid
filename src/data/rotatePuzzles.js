// Rotate puzzles
export const rotatePuzzles = [
  {
    id: 'rotate-001',
    type: 'rotate',
    difficulty: 'easy',
    title: 'Single Rotation',
    instructions: 'Rotate the tile to match the target pattern.',
    data: {
      type: 'rotate_single',
      tiles: [
        {
          id: 0,
          current: 0,
          target: 90,
          image: 'arrow',
        },
      ],
      answer: { 0: 90 },
    },
    hints: [
      'Click or tap the tile to rotate it',
      'The arrow should point right',
      'One 90-degree rotation needed',
    ],
    estimatedTime: 30,
    scoreMultiplier: 1,
  },
  {
    id: 'rotate-002',
    type: 'rotate',
    difficulty: 'easy',
    title: 'Path Connection',
    instructions: 'Rotate tiles to create a connected path.',
    data: {
      type: 'path',
      grid: [
        [
          { id: 0, current: 0, paths: [1, 0, 0, 0] },
          { id: 1, current: 0, paths: [0, 1, 0, 0] },
        ],
      ],
      solution: [
        [
          { id: 0, rotation: 0, paths: [1, 0, 0, 0] },
          { id: 1, rotation: 90, paths: [0, 0, 1, 0] },
        ],
      ],
    },
    hints: [
      'Each tile has paths on its sides',
      'Paths must connect between adjacent tiles',
      'Rotate to align the paths',
    ],
    estimatedTime: 90,
    scoreMultiplier: 1.5,
  },
  {
    id: 'rotate-003',
    type: 'rotate',
    difficulty: 'medium',
    title: 'Grid Alignment',
    instructions: 'Align all tiles in a 2x2 grid.',
    data: {
      type: 'grid_align',
      grid: [
        [
          { id: 0, current: 45, target: 0 },
          { id: 1, current: 90, target: 0 },
        ],
        [
          { id: 2, current: 180, target: 0 },
          { id: 3, current: 270, target: 0 },
        ],
      ],
      answer: { 0: 0, 1: 0, 2: 0, 3: 0 },
    },
    hints: [
      'All tiles need to align to 0 degrees',
      'Work systematically: top-left, top-right, bottom-left, bottom-right',
      'Each tile needs multiple rotations',
    ],
    estimatedTime: 120,
    scoreMultiplier: 1.5,
  },
  {
    id: 'rotate-004',
    type: 'rotate',
    difficulty: 'medium',
    title: 'Mirror Pattern',
    instructions: 'Create symmetry by rotating tiles.',
    data: {
      type: 'symmetry',
      grid: [
        [
          { id: 0, current: 0, target: 0 },
          { id: 1, current: 45, target: 90 },
        ],
        [
          { id: 2, current: 90, target: 90 },
          { id: 3, current: 180, target: 0 },
        ],
      ],
      answer: { 0: 0, 1: 90, 2: 90, 3: 0 },
    },
    hints: [
      'Top-left and bottom-right should match',
      'Top-right and bottom-left should match',
      'Look for diagonal symmetry',
    ],
    estimatedTime: 150,
    scoreMultiplier: 2,
  },
  {
    id: 'rotate-005',
    type: 'rotate',
    difficulty: 'hard',
    title: 'Complex Connections',
    instructions: 'Connect paths through a 3x3 grid.',
    data: {
      type: 'complex_path',
      grid: Array(9).fill(null).map((_, i) => ({
        id: i,
        current: Math.random() * 4 * 90,
        paths: [Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5],
      })),
    },
    hints: [
      'Find the main path through the grid',
      'Start from one corner and trace the route',
      'Each tile must connect properly to its neighbors',
    ],
    estimatedTime: 300,
    scoreMultiplier: 2.5,
  },
];