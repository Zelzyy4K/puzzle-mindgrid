export function calculateScore(baseScore, timeBonus, mistakes, hintsUsed, difficulty) {
  let score = baseScore;
  
  score += timeBonus;
  
  if (mistakes === 0) {
    score += 200;
  } else {
    score -= mistakes * 50;
  }
  
  score -= hintsUsed * 100;
  
  const multipliers = {
    easy: 1,
    medium: 1.5,
    hard: 2,
    expert: 3,
  };
  
  score = Math.round(score * (multipliers[difficulty] || 1));
  
  return Math.max(0, score);
}

export function calculateTimeBonus(timeElapsed, targetTime) {
  if (timeElapsed < targetTime) {
    const difference = targetTime - timeElapsed;
    return Math.round(difference * 2);
  }
  return 0;
}

export function calculateXP(difficulty, score) {
  const baseXP = {
    easy: 50,
    medium: 100,
    hard: 200,
    expert: 400,
  };
  
  const base = baseXP[difficulty] || 50;
  const scoreBonus = Math.floor(score / 100);
  
  return base + scoreBonus;
}

export function getComboMultiplier(streak) {
  if (streak >= 4) return 4;
  if (streak >= 3) return 3;
  if (streak >= 2) return 2;
  return 1;
}

export function getComboText(streak) {
  if (streak >= 4) return 'FLOW';
  if (streak >= 3) return 'FOCUS';
  if (streak >= 2) return 'STREAK';
  return '';
}
