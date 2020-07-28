export function move<T>(arr: T[], prevIndex: number, newIndex: number): T[] {
  while (prevIndex < 0) {
    prevIndex += arr.length;
  }
  while (newIndex < 0) {
    newIndex += arr.length;
  }
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length;
    while ((k--) + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(newIndex, 0, arr.splice(prevIndex, 1)[0]);
  return arr;
}

export class ArrayHelper {
  static move = move;
}
