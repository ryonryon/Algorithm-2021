export function longestCommonSubsequence(text1: string, text2: string): number {
  const map = new Map<string, number>();
  
  function dp(i: number, j: number): number {
      if (text1.length <= i || text2.length <= j) return 0;
      
      const key = `${i}${j}`;
      if (!map.has(key)) {
          const lcs = text1[i] === text2[j] 
          ? dp(i + 1, j + 1) + 1
          : Math.max(dp(i + 1, j), dp(i, j + 1));
          
          map.set(key, lcs);
      }
      
      return map.get(key)!;
  }
  
  return dp(0, 0);
};

export function longestCommonSubsequenceBottomUp(text1: string, text2: string): number {
  const dp = Array.from({length: text1.length + 1}, () => Array.from({length: text2.length + 1}, () => 0));
  
  for (let i = text1.length - 1; 0 <= i; i--) {
    for (let j = text2.length - 1; 0 <= j; j--) {        
      dp[i][j] = text1[i] === text2[j] 
        ? 1 + dp[i + 1][j + 1] 
        : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  return dp[0][0];
};