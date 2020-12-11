import { TestBed } from '@angular/core/testing';
import { isDateEqual, objectIsEqual } from './comparator';

describe('ComparatorHelper', () => {
  beforeEach(() => TestBed.configureTestingModule({
  }));

  it('date should be the same', () => {
    const date1 = new Date(2020, 0, 11, 12, 12, 12, 12);
    const date2 = new Date(2020, 0, 11, 12, 12, 12, 12);

    const isSame = isDateEqual(date1, date2);
    expect(isSame).toBe(true);
  });

  it('object should be the same', () => {
    const d = new Date();

    const obj1 = {
      foo: 'bar',
      hello: {
        world: true
      },
      d: [d, 1, '2']
    };
    const obj2 = {
      d: [d, 1, '2'],
      foo: 'bar',
      hello: {
        world: true
      }
    };
    const isSame = objectIsEqual(obj1, obj2);

    expect(isSame).toBe(true);
  });

  it('date should not be the same', () => {
    const date1 = new Date(2020, 0, 11, 12, 12, 12, 12);
    const date2 = new Date(2020, 1, 11, 12, 12, 12, 12);

    const isSame = isDateEqual(date1, date2);
    expect(isSame).toBe(false);
  });

  it('object should not be the same', () => {
    const d = new Date();

    const obj1 = {
      foo: 'bar',
      hello: {
        world: true
      },
      d: [d, 1, '2']
    };
    const obj2 = {
      d: [d, 1, '3'],
      foo: 'bar',
      hello: {
        world: true
      }
    };
    const isSame = objectIsEqual(obj1, obj2);

    expect(isSame).toBe(false);
  });

});
