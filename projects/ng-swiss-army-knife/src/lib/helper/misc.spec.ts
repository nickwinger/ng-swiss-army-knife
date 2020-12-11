import { TestBed } from '@angular/core/testing';
import { jsonDeepClone, safeCall } from './misc';

class Hello {
  foo(): string {
    return 'bar';
  }

  greet(name: string): string {
    return 'Hello ' + name;
  }
}
describe('MiscHelper', () => {
  beforeEach(() => TestBed.configureTestingModule({
  }));

  it('should safe call a function 1', () => {
    const hello = new Hello();

    const ret = safeCall(hello, h => h.foo);

    expect(ret).toBe('bar');
  });

  it('should safe call a function 1.1', () => {
    const hello = new Hello();

    const ret = safeCall(hello, 'foo');

    expect(ret).toBe('bar');
  });

  it('should safe call a function 2', () => {
    const hello = new Hello();

    const ret = safeCall(hello, h => h['bar'], 'oi');

    expect(ret).toBe('oi');
  });

  it('should safe call a function 3', () => {
    const hello = new Hello();

    const ret = safeCall(hello, h => h.greet, 'oi', 'Tom');

    expect(ret).toBe('Hello Tom');
  });

  it('should safe call a function 3.1', () => {
    const hello = new Hello();

    const ret = safeCall(hello, 'greet', 'oi', 'Tom');

    expect(ret).toBe('Hello Tom');
  });

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
