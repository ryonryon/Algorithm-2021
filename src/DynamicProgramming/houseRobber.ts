export function houseRobber(nums: number[]) {
  const map = new Map<number, number>();

  function dp(i: number): number {
    if (i === 0) return nums[0];
    if (i === 1) return Math.max(nums[0], nums[1]);

    if (!map.has(i)) {
        map.set(i, Math.max(dp(i - 2) + nums[i], dp(i - 1)));
    }
    
    return map.get(i)!;
  }
  
  return dp(nums.length - 1);
}

export function houseRobberBottomUp(nums: number[]) {
  const length = nums.length;
  if (length === 1) return nums[0];

  const dp = Array.from({length}, () => 0);

  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[length - 1];
}