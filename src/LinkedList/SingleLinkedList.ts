class MyLinkedList {
  root: LinkedListNode | null;

  constructor() {
    this.root = null;
  }

  get(index: number): number {
    const node = this.getNodeAt(index);

    return node.value;
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

    node = new LinkedListNode(val);
  }

  addAtIndex(index: number, val: number): void {
    const node = this.getNodeAt(index - 1);
    const newNode = new LinkedListNode(val);

    [node.next, newNode.next] = [newNode, node.next];
  }

  deleteAtIndex(index: number): void {
    const node = this.getNodeAt(index - 1);

    node.next = node.next?.next ?? null;
  }

  private getNodeAt(index: number): LinkedListNode {
    let node = this.root;

    let i = 0;
    while (i < index) {
      node = node?.next ?? null;
    }

    if (node === null || i !== index) {
      throw new Error(`You don't have value at index: ${index}`);
    }

    return node;
  }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

class LinkedListNode {
  value: number;
  next: LinkedListNode | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}
