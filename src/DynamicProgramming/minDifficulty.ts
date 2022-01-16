function minDifficulty(jobDifficulty: number[], d: number): number {
  const n = jobDifficulty.length;
  if (n < d) return - 1;
    
  const map = new Map<string, number>();

  function dp(i: number, day: number): number {
    if (d === day) return jobDifficulty.slice(i).reduce((biggest, current) => biggest < current ? current : biggest, 0);
    
    const key = `${i}${day}`;
      
    if (!map.has(key)) {
        let best = Infinity;
        let hardest = 0;

        for (let j = i; j < n - (d - day); j++) {
          hardest = Math.max(hardest, jobDifficulty[j])

          best = Math.min(best, hardest + dp(j + 1, day + 1));
        }

        map.set(key, best);
    }

    return map.get(key)!;
  }
    
  return dp(0, 1);
};

function minDifficultyBottomUp(jobDifficulty: number[], d: number): number {
  return 0;
};