function findCircleNum(isConnected: number[][]): number {
  const size = isConnected.length;

  const dj = new Disjoint(size);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (i === j) {
        continue;
      }

      if (isConnected[i][j] === 1) {
        dj.union(i, j);
      }
    }
  }

  return dj.getRootCount();
}

class Disjoint {
  private root: number[];
  private rank: number[];

  constructor(size: number) {
    this.root = Array.from({ length: size }, (_, i) => i);
    this.rank = Array.from({ length: size }, () => 1);
  }

  // return root
  find(x: number) {
    while (x == this.root[x]) {
      return x;
    }

    this.root[x] = this.find(this.root[x]);

    return this.root[x];
  }

  union(x: number, y: number) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.root[rootX] > this.root[rootY]) {
        this.root[rootY] = rootX;
      } else if (this.root[rootX] < this.root[rootY]) {
        this.root[rootX] = rootY;
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX] += 1;
      }
    }
  }

  isConnected(x: number, y: number) {
    return this.find(x) === this.find(y);
  }

  getRootCount() {
    const rootSet = new Set<number>();

    const size = this.root.length;

    for (let i = 0; i < size; ++i) {
      const rootOfI = this.find(i);

      if (!rootSet.has(rootOfI)) {
        rootSet.add(rootOfI);
      }
    }

    return rootSet.size;
  }
}
