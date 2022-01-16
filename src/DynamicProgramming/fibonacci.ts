function fib(n: number): number {
  const memo = new Map<number, number>();

  function dp (i: number): number {
    if (i <= 1) return i;
    if (!memo.has(i)) {
      memo.set(i, dp(i - 1) + dp(i - 2));
    }

    return memo.get(i)!;
  }

  return dp(n);
};

function fibBottomUp(n: number): number {
  const dp = Array.from({length: n}, () => 0);

  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};

function fibReduceState(n: number): number {
  if (n < 2) return n;
  
  let one_back = 1;
  let two_back = 0;

  for (let i = 2; i <= n; i++) {
    [two_back, one_back] = [one_back, one_back + two_back];
  }

  return one_back;
};