function maxProfit(k: number, prices: number[]): number {
  const memo = new Map<string, number>();
  
  function dp(i: number, tr: number, holding: 0 | 1): number {
      // base case
      if (i === prices.length || tr === 0) return 0;
      
      const key = `${i}-${tr}-${holding}`;
      if (memo.has(key)) return memo.get(key)!;
      
      const doNothing = dp(i+1, tr, holding);
      const doSomething = holding === 1 
          ? prices[i] + dp(i+1, tr - 1, 0) 
          : -prices[i] + dp(i+1, tr, 1);
      
      memo.set(key, Math.max(doSomething, doNothing))
      
      return memo.get(key)!
      
  }
  
  return dp(0, k, 0);
};
