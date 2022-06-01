class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  public insert(word: string): void {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);

      if (!node.children.has(char)) {
        const newNode = new TrieNode(char, node);

        node.children.set(char, newNode);
      }

      node = node.children.get(char)!;

      if (i === word.length - 1) {
        node.end = true;
      }
    }
  }

  public contains(word: string): boolean {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);

      if (!node.children.has(char)) {
        return false;
      }

      node = node.children.get(char)!;
    }

    return node.end;
  }

  public find(prefix: string): string[] {
    let node = this.root;
    const output: string[] = [];

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

  public remove(word: string): void {
    const root = this.root;

    const removeWord = (node: TrieNode, word: string): void => {
      if (node.end && node.getWord() === word) {
        const hasChildren = 0 < node.children.size;

        if (hasChildren) {
          node.end = false;
        }

        if (!hasChildren) {
          node.parent!.children = new Map();
        }
      }

      for (const child of node.children.values()) {
        removeWord(child, word);
      }
    };

    removeWord(root, word);
  }

  private findAllWords(node: TrieNode, output: string[]) {
    if (node.end) {
      output.unshift(node.getWord());
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

  constructor(key?: string, parent?: TrieNode, end?: boolean) {
    this.key = key ?? null;
    this.parent = parent ?? null;
    this.children = new Map();
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
