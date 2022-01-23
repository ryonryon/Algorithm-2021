export default class OptimizedUnionFind {
  private root: number[];
  private rank: number[];

  constructor(size: number) {
    this.root = Array.from({length: size}, (_, i) => i);
    this.rank = Array.from({length: size}, () => 1);
  }

 /**
  * find
 */
  public find(x: number): number {
    if (x === this.root[x]) return x;

    return this.root[x] = this.find(this.root[x]);
  }

  /**
   * union
  */
  public union(x: number, y: number) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return;

    if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootX] = rootY;
    } else if (this.rank[rootY] > this.rank[rootX]) {
      this.root[rootY] = rootX;
    } else {
      this.root[rootX] = rootY;
      this.rank[rootX] += 1;
    }
  }

  /**
   * connected
  */
  public connected(x: number, y: number) {
    return this.find(x) === this.find(y);
  }
}