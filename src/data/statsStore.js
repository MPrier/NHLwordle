const defaultStats = {
  gamesPlayed: 0,
  wins: 0,
  currentStreak: 0,
  bestStreak: 0,
  guessDistribution: [0, 0, 0, 0, 0],
  lastPlayedDay: null,
};

export function loadStats() {
  try {
    return JSON.parse(localStorage.getItem("Stats")) || defaultStats;
  } catch {
    return defaultStats;
  }
}

export function saveStats(stats) {
  localStorage.setItem("Stats", JSON.stringify(stats));
}
