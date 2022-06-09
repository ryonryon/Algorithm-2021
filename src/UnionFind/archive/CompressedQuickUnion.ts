export default class QuickUnion {
  private root: number[]

  constructor(size: number) {
    this.root = Array.from({length: size}, (_, i) => i);
  }

  /**
   * find
  */
  public find(x: number): number {
    while (x === this.root[x]) {
      return x;
    }

    return this.root[x] = this.find(this.root[x]);
  }

  /**
   * union
  */
  public union(x: number, y: number) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return;

    this.root[rootY] = rootX;
  }

  /**
   * connected
  */
  public connected(x: number, y: number) {
    return this.find(x) === this.find(y);
  }
}