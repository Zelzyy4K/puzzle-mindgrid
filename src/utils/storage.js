const STORAGE_KEY = 'mindgrid_data';

const defaultData = {
  profile: {
    level: 1,
    xp: 0,
    totalSolved: 0,
    bestScore: 0,
    averageTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    accuracy: 0,
    favoriteType: null,
    lastPlayed: null,
    joinedAt: new Date().toISOString(),
  },
  progress: {},
  history: [],
  favorites: [],
  achievements: [],
  daily: {
    lastDate: null,
    completed: false,
    score: 0,
  },
  settings: {
    sound: false,
    reducedMotion: false,
    theme: 'dark',
    timerVisible: true,
  },
};

export function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { ...defaultData };
    const parsed = JSON.parse(stored);
    return { ...defaultData, ...parsed };
  } catch (error) {
    console.error('Error loading data:', error);
    return { ...defaultData };
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
}

export function updateProfile(updates) {
  const data = loadData();
  data.profile = { ...data.profile, ...updates };
  saveData(data);
  return data.profile;
}

export function addHistory(entry) {
  const data = loadData();
  data.history.unshift({
    ...entry,
    id: `history-${Date.now()}`,
    timestamp: new Date().toISOString(),
  });
  if (data.history.length > 100) {
    data.history = data.history.slice(0, 100);
  }
  saveData(data);
  return data.history;
}

export function toggleFavorite(puzzleId) {
  const data = loadData();
  const index = data.favorites.indexOf(puzzleId);
  if (index > -1) {
    data.favorites.splice(index, 1);
  } else {
    data.favorites.push(puzzleId);
  }
  saveData(data);
  return data.favorites;
}

export function unlockAchievement(achievementId) {
  const data = loadData();
  if (!data.achievements.includes(achievementId)) {
    data.achievements.push(achievementId);
    saveData(data);
    return true;
  }
  return false;
}

export function updateDaily(dateKey, score) {
  const data = loadData();
  data.daily = {
    lastDate: dateKey,
    completed: true,
    score: score,
  };
  saveData(data);
  return data.daily;
}

export function updateProgress(puzzleId, progressData) {
  const data = loadData();
  data.progress[puzzleId] = {
    ...data.progress[puzzleId],
    ...progressData,
    updatedAt: new Date().toISOString(),
  };
  saveData(data);
  return data.progress[puzzleId];
}

export function updateSettings(settingsUpdates) {
  const data = loadData();
  data.settings = { ...data.settings, ...settingsUpdates };
  saveData(data);
  return data.settings;
}

export function addXP(amount) {
  const data = loadData();
  let newXP = data.profile.xp + amount;
  let newLevel = data.profile.level;
  
  const xpPerLevel = 500 + (data.profile.level * 100);
  while (newXP >= xpPerLevel) {
    newXP -= xpPerLevel;
    newLevel += 1;
  }
  
  data.profile.xp = newXP;
  data.profile.level = newLevel;
  saveData(data);
  
  return { xp: newXP, level: newLevel, leveledUp: newLevel > data.profile.level };
}

export function recordSolve(puzzleData) {
  const data = loadData();
  
  data.profile.totalSolved += 1;
  
  if (puzzleData.score > data.profile.bestScore) {
    data.profile.bestScore = puzzleData.score;
  }
  
  const totalAttempts = data.history.length + 1;
  const totalTime = (data.profile.averageTime * (data.history.length)) + puzzleData.time;
  data.profile.averageTime = Math.round(totalTime / totalAttempts);
  
  const today = new Date().toDateString();
  const lastPlayed = data.profile.lastPlayed ? new Date(data.profile.lastPlayed).toDateString() : null;
  
  if (lastPlayed !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastPlayed === yesterday) {
      data.profile.currentStreak += 1;
    } else if (lastPlayed !== today) {
      data.profile.currentStreak = 1;
    }
  }
  
  if (data.profile.currentStreak > data.profile.longestStreak) {
    data.profile.longestStreak = data.profile.currentStreak;
  }
  
  data.profile.lastPlayed = new Date().toISOString();
  
  const successCount = data.history.filter(h => h.result === 'solved').length + 1;
  data.profile.accuracy = Math.round((successCount / (data.history.length + 1)) * 100);
  
  saveData(data);
  return data.profile;
}

export function resetProgress() {
  saveData({ ...defaultData });
  return defaultData;
}
