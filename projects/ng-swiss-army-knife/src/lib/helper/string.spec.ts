import { TestBed } from '@angular/core/testing';
import { jsonDeepClone } from './misc';
import { padLeft, padRight } from './string';

describe('StringHelper', () => {
  beforeEach(() => TestBed.configureTestingModule({
  }));

  it('should pad left', () => {
    let s = '1';

    s = padLeft(s, 2, '0');

    expect(s).toBe('01');
  });

  it('should pad right', () => {
    let s = '1';

    s = padRight(s, 3, '0');

    expect(s).toBe('100');
  });

  it('should not pad right', () => {
    let s = '1';

    s = padRight(s, 1, '0');

    expect(s).toBe('1');
  });

  it('should not pad left', () => {
    let s = '1';

    s = padLeft(s, 1, '0');

    expect(s).toBe('1');
  });
});
