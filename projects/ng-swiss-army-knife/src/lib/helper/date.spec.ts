import { TestBed } from '@angular/core/testing';
import { jsonDeepClone } from './misc';
import { Helper } from './index';

describe('DateHelper', () => {
  beforeEach(() => TestBed.configureTestingModule({
  }));

  it('should convert c# date to javascript date', () => {
    let cSharpTicks = 0;
    let d = Helper.date.cSharpTicks2Date(cSharpTicks);

    expect(d.getFullYear()).toBe(1);
    expect(d.getMonth()).toBe(0);
    expect(d.getDate()).toBe(1);

    cSharpTicks = 637106263320000000;
    d = Helper.date.cSharpTicks2Date(cSharpTicks);

    expect(d.getFullYear()).toBe(2019);
    expect(d.getMonth()).toBe(10);
    expect(d.getDate()).toBe(29);
    expect(d.getHours()).toBe(12);
    expect(d.getMinutes()).toBe(12);
    expect(d.getSeconds()).toBe(12);
  });
});
