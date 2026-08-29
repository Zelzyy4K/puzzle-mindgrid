export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomArrayItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateID(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function getRandomInt(min, max, seed = Date.now()) {
  const rand = Math.sin(seed++) * 10000;
  return Math.floor(rand - Math.floor(rand) * (max - min + 1)) + min;
}
