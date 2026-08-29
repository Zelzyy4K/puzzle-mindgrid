export function getPuzzleById(id, puzzles) {
  return puzzles.find(p => p.id === id);
}

export function getPuzzlesByType(type, puzzles) {
  return puzzles.filter(p => p.type === type);
}

export function getPuzzlesByDifficulty(difficulty, puzzles) {
  return puzzles.filter(p => p.difficulty === difficulty);
}

export function getRecommendedPuzzles(puzzles, profile) {
  const unsolved = puzzles.filter(p => !profile.progress?.[p.id]?.solved);
  if (unsolved.length === 0) return puzzles.slice(0, 6);
  return unsolved.slice(0, 6);
}

export function getFavorites(favorites, puzzles) {
  return puzzles.filter(p => favorites.includes(p.id));
}

export function filterPuzzles(puzzles, { type, difficulty, search, completed, favorites }) {
  return puzzles.filter(p => {
    if (type && type !== 'all' && p.type !== type) return false;
    if (difficulty && difficulty !== 'all' && p.difficulty !== difficulty) return false;
    if (search) {
      const s = search.toLowerCase();
      if (!p.title.toLowerCase().includes(s) && !p.type.toLowerCase().includes(s)) return false;
    }
    if (completed !== undefined) {
      const solved = profile?.progress?.[p.id]?.solved;
      if (solved !== completed) return false;
    }
    if (favorites && !favorites.includes(p.id)) return false;
    return true;
  });
}

export function getStatistics(puzzles, profile, history) {
  const solved = history.filter(h => h.result === 'solved');
  const failed = history.filter(h => h.result === 'failed');
  
  const avgTime = solved.length > 0 
    ? Math.round(solved.reduce((sum, h) => sum + h.time, 0) / solved.length) 
    : 0;
  
  const typeCounts = {};
  solved.forEach(h => {
    typeCounts[h.type] = (typeCounts[h.type] || 0) + 1;
  });
  const favoriteType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  
  const diffDistribution = { easy: 0, medium: 0, hard: 0, expert: 0 };
  solved.forEach(h => {
    if (diffDistribution[h.difficulty] !== undefined) {
      diffDistribution[h.difficulty]++;
    }
  });
  
  return {
    totalSolved: solved.length,
    totalFailed: failed.length,
    bestScore: profile?.bestScore || 0,
    averageTime: avgTime,
    accuracy: solved.length + failed.length > 0 
      ? Math.round((solved.length / (solved.length + failed.length)) * 100) 
      : 0,
    favoriteType: favoriteType || null,
    diffDistribution,
  };
}

export function getHistory(filtered = 'all', history, puzzles) {
  if (filtered === 'all') return history;
  if (filtered === 'solved') return history.filter(h => h.result === 'solved');
  if (filtered === 'failed') return history.filter(h => h.result === 'failed');
  if (filtered === 'daily') return history.filter(h => h.isDaily);
  return history;
}
