export default class AutocompleteSystem {
  private trie: Trie;
  private typing: string;

  constructor(sentences: string[], times: number[]) {
    this.trie = new Trie();
    this.typing = "";

    for (let i = 0; i < times.length; i++) {
      this.trie.insert(sentences[i], times[i]);
    }
  }

  input(c: string): string[] {
    if (c === "#") {
      if (!this.trie.inclement(this.typing)) {
        this.trie.insert(this.typing, 1);
      }

      this.typing = "";

      return [];
    }

    this.typing = `${this.typing}${c}`;

    // look for sentenses with this.typing
    const pq = new PriorityQueue();
    for (const item of this.trie.find(this.typing)) {
      pq.add(item);
    }

    const res = [];

    for (let i = 1; i <= 3; i++) {
      const deleted = pq.delete();

      if (!deleted) {
        break;
      }

      res.push(deleted.word);
    }

    return res;
  }
}

/**
 * Your AutocompleteSystem object will be instantiated and called as such:
 * var obj = new AutocompleteSystem(sentences, times)
 * var param_1 = obj.input(c)
 */

function getPriority(
  item1: { word: string; degree: number },
  item2: { word: string; degree: number }
): 0 | 1 {
  if (item1.degree !== item2.degree) {
    return item1.degree > item2.degree ? 0 : 1;
  }

  const len = Math.min(item1.word.length, item2.word.length);

  for (let i = 0; i <= len; i++) {
    if (i === item1.word.length && i === item2.word.length) {
      break;
    }

    if (i === item1.word.length) {
      return 0;
    }

    if (i === item2.word.length) {
      return 1;
    }

    const item1CharCode = item1.word.charCodeAt(i);
    const item2CharCode = item2.word.charCodeAt(i);

    if (item1CharCode < item2CharCode) {
      return 0;
    }

    if (item1CharCode > item2CharCode) {
      return 1;
    }
  }

  throw new Error(`error at getPriority: item1 ${item1}, item2 ${item2}`);
}

class PriorityQueue {
  private arr: { word: string; degree: number }[];

  constructor() {
    this.arr = [];
  }

  public add(item: { word: string; degree: number }) {
    this.arr.push(item);

    let k = this.arr.length - 1;
    while (0 < k) {
      const parent = Math.floor((k - 1) / 2);

      if (getPriority(this.arr[parent], this.arr[k]) === 0) {
        break;
      }

      this.swap(parent, k);
      k = parent;
    }
  }

  public delete(): { word: string; degree: number } | null {
    if (!this.arr.length) {
      return null;
    }

    if (this.arr.length === 1) {
      return this.arr.pop() ?? null;
    }

    const deleting = this.arr[0];

    this.arr[0] = this.arr.pop()!;

    let k = 0;
    while (k < this.arr.length) {
      const [left, right] = [2 * k + 1, 2 * k + 2];

      if (this.arr[left] == null && this.arr[right] == null) break;

      if (this.arr[right] == null) {
        if (getPriority(this.arr[k], this.arr[left]) === 0) break;

        this.swap(k, left);

        k = left;
        continue;
      }

      if (getPriority(this.arr[left], this.arr[right]) === 0) {
        if (getPriority(this.arr[k], this.arr[left]) === 0) break;
        this.swap(k, left);

        k = left;
      } else {
        if (getPriority(this.arr[k], this.arr[right]) === 0) break;
        this.swap(k, right);

        k = right;
      }
    }

    return deleting;
  }

  private swap(i: number, j: number) {
    [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  public insert(word: string, degree: number): void {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);

      if (!node.children.has(char)) {
        const newNode = new TrieNode(char, node);

        node.children.set(char, newNode);
      }

      node = node.children.get(char)!;

      if (i === word.length - 1) {
        node.degree = degree;
        node.end = true;
      }
    }
  }

  public find(prefix: string): { word: string; degree: number }[] {
    let node = this.root;
    const output: { word: string; degree: number }[] = [];

    for (let i = 0; i < prefix.length; i++) {
      const char = prefix.charAt(i);

      if (!node.children.has(char)) {
        return output;
      }

      node = node.children.get(char)!;
    }

    this.findAllWords(node, output);

    return output;
  }

  public inclement(word: string): boolean {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);

      if (!node.children.has(char)) {
        return false;
      }

      node = node.children.get(char)!;
    }

    const res = node.end;

    if (res) {
      node.degree!++;
    }

    return res;
  }

  private findAllWords(
    node: TrieNode,
    output: { word: string; degree: number }[]
  ) {
    if (node.end) {
      output.unshift({ word: node.getWord(), degree: node.degree! });
    }

    for (const child of node.children.values()) {
      this.findAllWords(child, output);
    }
  }
}

class TrieNode {
  key: string | null;
  parent: TrieNode | null;
  children: Map<string, TrieNode>;
  end: boolean;
  degree: number | null;

  constructor(key?: string, parent?: TrieNode, degree?: number, end?: boolean) {
    this.key = key ?? null;
    this.parent = parent ?? null;
    this.children = new Map();
    this.degree = degree ?? null;
    this.end = end ?? false;
  }

  public getWord(): string {
    const output: string[] = [];
    let node: TrieNode | null = this;

    while (node !== null) {
      output.unshift(node.key ?? "");

      node = node.parent;
    }

    return output.join("");
  }
}
