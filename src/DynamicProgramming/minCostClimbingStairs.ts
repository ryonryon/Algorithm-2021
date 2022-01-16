function minCostClimbingStairs(cost: number[]): number {
  const map = new Map<number, number>();
  
  function dp(i: number) {
      if (i <= 1) return 0;
      
      if (!map.has(i)) {
          const twoStep = dp(i - 1) + cost[i - 1];
          const oneStep = dp(i - 2) + cost[i - 2];
          
          map.set(i, Math.min(twoStep, oneStep));
      }
      
      return map.get(i)!;
  }
  
  return dp(cost.length);
};

function minCostClimbingStairsBottomUp(cost: number[]): number {
  const dp = Array.from({length: cost.length}, () => 0);

  for (let i = 2; i <= cost.length; i++) {
    const twoStep = dp[i - 2] + cost[i - 2];
    const oneStep = dp[i - 1] + cost[i - 1];

    dp[i] = Math.min(twoStep, oneStep);
  }

  return dp[cost.length - 1];
};

function minCostClimbingStairsReduceState(cost: number[]): number {
  let oneStepBack = 0;
  let twoStepBack = 0;

  for (let i = 2; i <= cost.length; i++) {
    [twoStepBack, oneStepBack] = [
      oneStepBack, 
      Math.min(twoStepBack + cost[i - 2], oneStepBack + cost[i - 1])
    ]
  }

  return oneStepBack;
}