# MINDGRID — Think differently. Solve precisely.

Complete interactive puzzle platform built with React + Vite.

## Project Status: ✅ COMPLETE

Production build successful. All core features implemented and working.

## Features

### Puzzle Types (50+ puzzles)
- **Pattern Shift**: Identify sequences and patterns
- **Number Grid**: Latin squares, sum grids, magic squares
- **Memory Grid**: Sequence recall and pattern matching
- **Sequence**: Number and shape progressions
- **Word Link**: Find hidden connections between words
- **Logic Grid**: Deductive reasoning puzzles
- **Rotate**: Spatial rotation challenges

### Core Systems
- **Daily Challenge**: One deterministic puzzle per day with streaks
- **XP & Levels**: Progressive leveling system with XP rewards
- **Achievements**: 11 unlockable achievements
- **Puzzle History**: Track all attempts with filtering
- **Favorites**: Mark and filter favorite puzzles
- **Hints**: Progressive hint system with score penalties
- **Timer**: Real-time puzzle timer with combo tracking
- **Scoring**: Dynamic scoring based on difficulty, time, mistakes, hints

### User Features
- **Profile**: Player stats, achievements, level progression
- **Progress**: Detailed analytics and performance metrics
- **Settings**: Sound, reduced motion, theme preferences
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Local Storage**: All progress persists automatically

## Architecture

```
src/
├── components/          # React UI components
│   ├── LandingPage      # Entry point
│   ├── HomeScreen       # Puzzle discovery
│   ├── PuzzleScreen     # Puzzle gameplay
│   ├── PuzzlesScreen    # Puzzle library
│   ├── DailyScreen      # Daily challenge
│   ├── ProgressScreen   # Stats & XP
│   ├── HistoryScreen    # Attempt history
│   ├── ProfileScreen    # User profile
│   ├── SettingsScreen   # Settings
│   ├── Navigation       # Desktop nav
│   └── [UI Components]  # Reusable components
│
├── data/               # Puzzle data & constants
│   ├── index.js        # Master puzzle list
│   ├── patternPuzzles.js
│   ├── numberPuzzles.js
│   ├── memoryPuzzles.js
│   ├── sequencePuzzles.js
│   ├── wordPuzzles.js
│   ├── logicPuzzles.js
│   ├── rotatePuzzles.js
│   ├── achievements.js
│   └── daily.js
│
├── engine/
│   └── puzzleEngine.js  # Puzzle logic base classes
│
├── utils/
│   ├── storage.js       # localStorage management
│   ├── scoring.js       # Score calculation
│   ├── date.js          # Date utilities
│   └── random.js        # Random utilities
│
└── styles/
    ├── globals.css      # Global styles
    └── components.css   # Component styles
```

## Build Output

```
dist/index.html                    825 B
dist/assets/index-WIXbm1dK.css   16.57 KB  (4.00 KB gzipped)
dist/assets/index-FAdtr7Dl.js   248.89 KB (73.75 KB gzipped)
```

## Running

**Development:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Design Philosophy

- **Dark-first interface** (#0F100F background)
- **Premium puzzle magazine aesthetic**
- **Minimal, intentional UI** — no AI-slop
- **Focus on puzzle gameplay** — distraction-free
- **Accessible** — keyboard navigation, focus states, reduced motion support
- **Responsive** — optimized for mobile, tablet, desktop, ultrawide

## Technology Stack

- **React 19** — UI framework
- **Vite 5** — Build tool
- **Tailwind CSS 3** — Utility styling
- **Lucide React** — Icon library
- **React Router** — Navigation
- **Framer Motion** — Animations (optional)

## Key Statistics

- **50+ puzzles** across 7 types
- **11 achievements** to unlock
- **Difficulty levels**: Easy, Medium, Hard, Expert
- **4 difficulty multipliers** for scoring
- **Local persistence** — no backend required
- **Mobile-first responsive** design

## Data Persistence

All player data stored in localStorage:
- Profile (level, XP, streaks, stats)
- Progress (puzzle attempts, scores)
- History (50 most recent attempts)
- Achievements (unlocked list)
- Favorites (bookmarked puzzles)
- Settings (preferences)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

MINDGRID is a complete, self-contained puzzle platform. No backend required. All data is stored locally on the user's device. The application is optimized for performance and works well on devices with 8GB RAM and integrated graphics.

Created as a premium indie puzzle game experience that runs entirely in the browser.
