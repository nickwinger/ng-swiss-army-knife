import { TestBed } from '@angular/core/testing';
import { jsonDeepClone } from './misc';

describe('MiscHelper', () => {
  beforeEach(() => TestBed.configureTestingModule({
  }));

  it('should deep clone array', () => {
    const arrObj1 = {foo: 'bar'};
    const arr: any = [arrObj1, 'hallo', 123];

    const clonedArr: any = jsonDeepClone(arr);

    arr[0].foo = 'nobar';
    arr[0].bar = 'foo';
    arr[1] = 'bye';
    arr[2] = 456;

    expect(clonedArr[0].foo).toBe('bar');
    expect(clonedArr[0].bar).toBeUndefined();
    expect(clonedArr[1]).toBe('hallo');
    expect(clonedArr[2]).toBe(123);
    expect(arr[0].foo).toBe('nobar');
    expect(arr[0].bar).toBeDefined();
    expect(arr[1]).toBe('bye');
    expect(arr[2]).toBe(456);
  });
});
