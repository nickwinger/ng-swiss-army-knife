import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { hasConstructorName } from './object';

describe('ObjectHelper', () => {
  beforeEach(() => TestBed.configureTestingModule({
  }));

  it('should have constructor name FormGroup', () => {
    const fb = new FormGroup({

    });

    expect(hasConstructorName(fb, 'FormGroup')).toBe(true);
  });
});
