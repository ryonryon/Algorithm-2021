function tribonacci(n: number): number {
  const map = new Map<number, number>();
    
  function dp(i: number): number {
    if (i <= 0) return 0;
    if (i <= 2) return 1;
      
    if (!map.has(i)) {
        map.set(i, dp(i - 1) + dp(i - 2) + dp(i - 3));
    }
      
    return map.get(i)!;
  }
    
  return dp(n);
};