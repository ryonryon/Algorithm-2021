export default class QuickFind {
  private root: number[]

  constructor(size: number) {
    this.root = Array.from({length: size}, (_, i) => i);
  }

  /**
   * find
   */
  public find(x: number) {
    return this.root[x];
  }

  /**
   * union
   */
  public union(x: number, y: number) {
    const rootX = this.root[x];
    const rootY = this.root[y];

    if (rootX === rootY) return;

    for (let i = 0; i < this.root.length; i++) {
      if (this.root[i] !== rootY) continue;

      this.root[i] = rootX;
    }

  }

  /**
   * connected
   */
  public connected(x: number, y: number) {
    return this.root[x] === this.root[y];
  }
}