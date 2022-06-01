class ListNode {
  value: number;
  prev: ListNode | null;
  next: ListNode | null;

  constructor(value: number, prev?: ListNode | null, next?: ListNode | null) {
    this.value = value;
    this.prev = prev ?? null;
    this.next = next ?? null;
  }
}

class DoubleLinkedList {
  head: ListNode | null;

  constructor() {
    this.head = null;
  }

  add(x: number): ListNode {
    const newNode = new ListNode(x);

    if (!this.head) {
      this.head = newNode;

      return newNode;
    }

    let n = this.head;
    while (n.next) {
      n = n.next;
    }

    n.next = newNode;
    newNode.prev = n;

    return newNode;
  }

  pop(): number {
    let n = this.head;

    if (!n.next) {
      const popped = this.head.value;
      this.head = null;

      return popped;
    }

    while (n.next) {
      n = n.next;
    }

    const popped = n.value;
    n.prev.next = null;

    return popped;
  }

  peek(): number {
    let n = this.head;
    if (!n.next) {
      return n.value;
    }

    while (n.next) {
      n = n.next;
    }

    return n.value;
  }

  remove(node: ListNode): number {
    if (this.head === node) {
      const value = this.head.value;

      this.head = this.head.next;

      return value;
    }

    let n = this.head;
    while (n !== node && n.next) {
      n = n.next;
    }

    if (n !== node) {
      throw new Error("node must be found in this dll");
    }

    const value = n.value;

    n.prev.next = n.next;
    if (n.next) {
      n.next.prev = n.prev;
    }

    return value;
  }
}
