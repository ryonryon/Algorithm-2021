function coinChange(coins: number[], amount: number): number {
  const map = new Map<number, number>();
  
  function dp(i: number): number {
      if (i === 0) return 0;
      if (i < 0) return - 1;
      if (map.has(i)) return map.get(i)!;
      
      let fewest = Infinity;
      for (const coin of coins) {
          if (dp(i - coin) === -1) continue;

          fewest = Math.min(fewest,  dp(i - coin) + 1);
      }
      map.set(i, fewest === Infinity ? -1 : fewest);
      
      return map.get(i)!;
  }
  
  return dp(amount);
};
