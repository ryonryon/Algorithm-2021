
export default class Heap {
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

  public get(): number | null {
    return this.arr[0] ?? null;
  }

  public add(item: number) {
    this.arr.push(item);

    let k = this.arr.length - 1;
    while (0 < k) {
      const parent = Math.floor((k - 1) / 2);

      if (this.arr[parent] < this.arr[k]) {
        this.swap(parent, k);
      } else {
        break;
      }

      k = parent;
    }
  }

  public delete() {
    if (!this.arr.length) {
      return null;
    }

    if (this.arr.length === 1) {
      return this.arr.pop();
    }

    const deleting = this.arr[0];

    const popped = this.arr.pop()!;
    this.arr[0] = popped;

    let k = 0;
    while (k <= this.arr.length) {
      const [cLeft, cRight] = [2 * k +1, 2 * k +2];

      if (this.arr[cLeft] < this.arr[cRight]) {
        if (this.arr[k] < this.arr[cRight]) {
          this.swap(k, cRight);

          k = cRight;
        } else {
          break;
        }
      } else {
        if (this.arr[k] < this.arr[cLeft]) {
          this.swap(k, cLeft);

          k = cLeft;
        } else {
          break;
        }
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