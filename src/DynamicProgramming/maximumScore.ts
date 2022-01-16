export function maximumScore(nums: number[], multipliers: number[]): number {
  const [n, m] = [nums.length, multipliers.length];

  function dp(i: number, left: number ): number {
    if (i === m) return 0;

    const right = n - 1 - (i - left);
    const mult = multipliers[i];

    return Math.max(
      mult * nums[left] + dp(i + 1, left + 1), 
      mult * nums[right] + dp(i + 1, left)
    );
  }
  
  return dp(0, 0);
};

export function maximumScoreBottomUp(nums: number[], multipliers: number[]): number {
  const [n, m] = [nums.length, multipliers.length];

  const dp = Array.from({length: m + 1}, () => Array.from({length: m + 1}, () => 0));

  for (let i = m - 1; 0 <= i; i--) {
    for (let left = i; 0 <= left; left--) {
      const mult = multipliers[i];
      const right = n - 1 - (i - left);

      dp[i][left] = Math.max(
        mult * nums[left] + dp[i + 1][left + 1], 
        mult * nums[right] + dp[i + 1][left]
      )
    }
  }

  return dp[0][0];
};