// Logic Grid puzzles
export const logicPuzzles = [
  {
    id: 'logic-001',
    type: 'logic',
    difficulty: 'easy',
    title: 'Matching Attributes',
    instructions: 'Match each person with their pet and color.',
    data: {
      type: 'matching',
      people: ['Alice', 'Bob', 'Charlie'],
      pets: ['Cat', 'Dog', 'Bird'],
      colors: ['Red', 'Blue', 'Green'],
      clues: [
        'Alice has a red pet',
        'Bob does not have a cat',
        'Charlie has a bird',
      ],
      solution: {
        Alice: { pet: 'Cat', color: 'Red' },
        Bob: { pet: 'Dog', color: 'Blue' },
        Charlie: { pet: 'Bird', color: 'Green' },
      },
    },
    hints: [
      'Start with definite facts: Charlie has a bird',
      'Alice has a red pet - could be cat or dog',
      'Bob does not have a cat, so Bob has dog or bird',
    ],
    estimatedTime: 120,
    scoreMultiplier: 1.5,
  },
  {
    id: 'logic-002',
    type: 'logic',
    difficulty: 'medium',
    title: 'Four Attributes',
    instructions: 'Four people with four attributes each.',
    data: {
      type: 'deduction',
      entities: ['Person1', 'Person2', 'Person3', 'Person4'],
      attributes: {
        color: ['Red', 'Blue', 'Green', 'Yellow'],
        number: [1, 2, 3, 4],
        shape: ['Square', 'Circle', 'Triangle', 'Star'],
        size: ['Small', 'Medium', 'Large', 'Huge'],
      },
      clues: [
        'Person1 has a red square',
        'Person2 has an odd number (1 or 3)',
        'Person3 is not small',
        'Person4 has a yellow star',
      ],
      solution: {
        Person1: { color: 'Red', number: 4, shape: 'Square', size: 'Small' },
        Person2: { color: 'Blue', number: 1, shape: 'Circle', size: 'Medium' },
        Person3: { color: 'Green', number: 3, shape: 'Triangle', size: 'Large' },
        Person4: { color: 'Yellow', number: 2, shape: 'Star', size: 'Huge' },
      },
    },
    hints: [
      'Person1 is red square',
      'Person4 is yellow star',
      'Person2 and Person3 have the remaining colors and shapes',
    ],
    estimatedTime: 180,
    scoreMultiplier: 2,
  },
  {
    id: 'logic-003',
    type: 'logic',
    difficulty: 'hard',
    title: 'Complex Deduction',
    instructions: 'Use logical clues to deduce the complete arrangement.',
    data: {
      type: 'complex_logic',
      entities: ['A', 'B', 'C', 'D'],
      attributes: {
        position: [1, 2, 3, 4],
        attribute1: ['X', 'Y', 'Z', 'W'],
      },
      clues: [
        'A is not in position 1',
        'B is directly left of C',
        'D has attribute X',
        'The entity in position 4 has attribute Z',
      ],
      solution: {
        A: { position: 3, attribute: 'Y' },
        B: { position: 1, attribute: 'W' },
        C: { position: 2, attribute: 'X' },
        D: { position: 4, attribute: 'Z' },
      },
    },
    hints: [
      'B is left of C means BC are consecutive',
      'Possible positions for BC: (1,2), (2,3), or (3,4)',
      'A is not position 1, so check constraints',
    ],
    estimatedTime: 240,
    scoreMultiplier: 2.5,
  },
];