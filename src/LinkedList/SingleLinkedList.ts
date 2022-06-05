export default class SingleLinkedList {
  root: LinkedListNode | null;

  constructor() {
    this.root = null;
  }

  get(index: number): number {
    try {
      const node = this.getNodeAt(index);

      return node.value;
    } catch (e) {
      return -1;
    }
  }

  addAtHead(val: number): void {
    const newNode = new LinkedListNode(val);

    [this.root, newNode.next] = [newNode, this.root];
  }

  addAtTail(val: number): void {
    let node = this.root;

    if (!node) {
      this.root = new LinkedListNode(val);

      return;
    }

    while (node) {
      if (!node.next) {
        break;
      }

      node = node.next;
    }

    node.next = new LinkedListNode(val);
  }

  addAtIndex(index: number, val: number): void {
    if (index === 0) {
      this.addAtHead(val);

      return;
    }

    try {
      const node = this.getNodeAt(index - 1);
      const newNode = new LinkedListNode(val);

      [node.next, newNode.next] = [newNode, node.next];
    } catch (e) {}
  }

  deleteAtIndex(index: number): void {
    if (index === 0) {
      this.root = this.root?.next ?? null;

      return;
    }

    try {
      const node = this.getNodeAt(index - 1);

      node.next = node.next?.next ?? null;
    } catch (e) {}
  }

  private getNodeAt(index: number): LinkedListNode {
    let node = this.root;

    let i = 0;
    while (i < index) {
      node = node?.next ?? null;

      i++;
    }

    if (node === null || i !== index) {
      throw new Error(`You don't have value at index: ${index}`);
    }

    return node;
  }
}

class LinkedListNode {
  value: number;
  next: LinkedListNode | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}
