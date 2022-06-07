export default class WordDictionary {
  private trie: Trie;
  constructor() {
    this.trie = new Trie();
  }

  addWord(word: string): void {
    this.trie.add(word);
  }

  search(word: string): boolean {
    return this.trie.contain(word);
  }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  add(word: string) {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);

      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode(char));
      }

      node = node.children.get(char)!;
    }

    node.end = true;
  }

  contain(word: string): boolean {
    const helper = (node: TrieNode, i: number = 0) => {
      const char = word.charAt(i);

      if (i === word.length - 1) {
        return char === "."
          ? Boolean(node.end)
          : Boolean(node.value === char && node.end);
      }

      if (char !== "." && char !== node.value) {
        return false;
      }

      for (const child of [...node.children.values()]) {
        if (helper(child, i + 1)) {
          return true;
        }
      }

      return false;
    };

    const char = word.charAt(0);

    if (char === ".") {
      for (const child of [...this.root.children.values()]) {
        if (helper(child)) {
          return true;
        }
      }

      return false;
    }

    if (!this.root.children.has(char)) {
      return false;
    }

    return helper(this.root.children.get(char)!);
  }
}

class TrieNode {
  value: string | null;
  end?: boolean;
  children: Map<string, TrieNode>;

  constructor(value?: string) {
    this.value = value ?? null;
    this.children = new Map();
  }
}
