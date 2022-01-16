import Heap from "./Heap/MaxHeap";

export default function heapSort(arr: number[]): number[] {
  const newArr: number[] = [];
  const heap = new Heap(arr);

  while (0 < heap.size) {
    newArr.push(heap.delete()!);
  }

  return newArr;
} 