const MAX = 100000;

export default function bucketSort(arr: number[]) {
  const n = arr.length;
  const num = Array.from({length: MAX}, () => 0);

  console.log(num);
  
  // count each item's number
  for (let i = 0; i < n; i++) {
    ++num[arr[i]];
  }

  const sum = Array.from({length: MAX}, () => 0);

  for (let j = 0; j < MAX; j++) {
    sum[j] = sum[j - 1] + num[j];
  }

  const arr2 = Array.from({length: n}, () => 0);

  for (let k = n - 1; 0 <= k; k--) {
    arr2[--sum[arr[k]]] = arr[k];
  }

  return arr2;
}
