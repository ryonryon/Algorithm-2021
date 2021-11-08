import Heap from "./Heap";

(() => {
  const heap = new Heap([10,10,7,2]);

  console.log(heap.getAll());

  const deleted1 = heap.delete();
  const deleted2 = heap.delete();
  const deleted3 = heap.delete();
  const deleted4 = heap.delete();
  
  console.log(deleted1);
  console.log(heap.getAll());
  
  console.log(deleted2);
  console.log(heap.getAll());
  
  console.log(deleted3);
  console.log(heap.getAll());
  
  console.log(deleted4);
  console.log(heap.getAll());
})()