export default function mergeSort(nums: number[]): number[] {
  if (nums.length === 1) return nums;
  
  const mid = Math.floor((nums.length - 1) / 2);

  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid +1));

  const ans: number[] = [];
  let [i, j] = [0, 0];
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      ans.push(right[j]);

      j++;
    } else {
      ans.push(left[i]);

      i++;
    }
  }

  return i < left.length ? [...ans, ...left.slice(i)] : [...ans, ...right.slice(j)];
}