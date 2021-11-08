export default class BinarySearchTree {
  private root: Node | null;

  constructor() {
    this.root = null;
  }

  public insert(value: number): void {
    // TODO
  }
  
  public delete(vale: number): void{
    // TODO
    
  }

  public includes(value: number): boolean {
    // TODO
    return true;
  }
}

export class Node {
  private _value: number;
  private _left: Node | null;
  private _right: Node | null;

  constructor(value: number) {
    this._value = value;
    this._left = null;
    this._right = null
  }

  get value() {
    return this._value;
  }

  get left() {
    return this._left;
  }

  get right() {
    return this._right;
  }

  set value(val: number) {
    this._value = val;
  }

  set left(node: Node | null) {
    this._left = node;
  }

  set right(node: Node | null) {
    this._right = node;
  }
}