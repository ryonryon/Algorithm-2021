export default class MinHeap {
  private arr: number[];

  constructor(arr: number[] = []) {
    this.arr = [];

    for (const item of arr) {
      this.add(item);
    }
  }

  get size() {
    return this.arr.length;
  }

  public peek(): number | null {
    return !this.arr.length ? null : this.arr[0];
  }

  public add(item: number) {
    this.arr.push(item);

    let k = this.arr.length - 1;
    while (0 < k) {
      const parent = Math.floor((k - 1) / 2);

      if (this.arr[parent] <= this.arr[k]) break;

      this.swap(parent, k);
      k = parent;
    }
  }

  public delete() {
    if (!this.arr.length) return null;

    if (this.arr.length === 1) return this.arr.pop();

    const deleting = this.arr[0];

    this.arr[0] = this.arr.pop()!;

    let k = 0;
    while (k < this.arr.length) {
      const [left, right] = [2 * k + 1, 2 * k + 2];

      if (this.arr[left] == null && this.arr[right] == null) break;

      if (this.arr[right]  == null) {
        if (this.arr[k] <= this.arr[left]) break;

        this.swap(k, left);

        k = left;
        continue;
      }

      if (this.arr[left] < this.arr[right]) {
        if (this.arr[k] <= this.arr[left]) break;
        this.swap(k, left);
  
        k = left;
      } else {
        if (this.arr[k] <= this.arr[right]) break;
        this.swap(k, right);
  
        k = right;
      }
    }

    return deleting;
  }

  public getAll(): number[] {
    return this.arr;
  }

  private swap(i: number, j: number) {
    [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
  }
}