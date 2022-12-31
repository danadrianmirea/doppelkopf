export class RingQueue<T> {
  elements: T[];
  private currentIndex = 0;

  constructor(elements: T[]) {
    this.elements = elements;
  }

  length() {
    return this.elements.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.elements.length;
    return this.elements[this.currentIndex];
  }

  current() {
    return this.elements[this.currentIndex];
  }

  prioritize(element: T) {
    const foundIndex = this.elements.indexOf(element);

    if (foundIndex === -1) {
      throw new Error(`can't prioritize unknown element '${element}'`);
    }

    this.currentIndex = foundIndex;
  }

  forEach(callbackfn: (value: T, index: number, array: T[]) => void) {
    return this.elements.forEach(callbackfn);
  }

  map(callbackfn: (value: T, index: number, array: T[]) => T): RingQueue<T> {
    return new RingQueue(this.elements.map(callbackfn));
  }
}
