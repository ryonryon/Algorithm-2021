export default class DoubleLinkedList {
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
    if (!this.root) {
      this.root = new LinkedListNode(val);

      return;
    }

    const newNode = new LinkedListNode(val);

    const temp = this.root;
    this.root = newNode;
    newNode.next = temp;
    temp!.prev = newNode;
  }

  addAtTail(val: number): void {
    if (!this.root) {
      this.root = new LinkedListNode(val);

      return;
    }

    const newNode = new LinkedListNode(val);

    let node = this.root;
    while (node.next) {
      node = node.next;
    }

    node.next = newNode;
    newNode.prev = node;
  }

  addAtIndex(index: number, val: number): void {
    if (index === 0) {
      this.addAtHead(val);

      return;
    }

    const newNode = new LinkedListNode(val);

    try {
      const node = this.getNodeAt(index - 1);

      const nextNode = node.next;
      node.next = newNode;
      newNode.prev = node;

      if (nextNode) {
        newNode.next = nextNode;
        nextNode.prev = newNode;
      }
    } catch (e) {}
  }

  deleteAtIndex(index: number): void {
    if (index === 0) {
      this.root = this.root?.next ?? null;

      return;
    }

    try {
      const node = this.getNodeAt(index);

      node.prev!.next = node.next;

      if (node.next) {
        node.next.prev = node.prev;
      }
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

export class LinkedListNode {
  value: number;
  prev: LinkedListNode | null;
  next: LinkedListNode | null;

  constructor(value: number) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}
