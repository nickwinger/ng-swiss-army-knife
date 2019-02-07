import { TestBed } from '@angular/core/testing';
import { BaseComponent } from './base.component';

class MyBaseComponent extends BaseComponent {
  constructor() {
    super();
  }
}

describe('base.component', () => {
  beforeEach(() => TestBed.configureTestingModule({
  }));

  it('should emit onDestroy', (done: DoneFn) => {
    const myBaseComponent = new MyBaseComponent();
    var count = 0;
    myBaseComponent.onDestroy$.subscribe(() => count++);
    myBaseComponent.onDestroy$.subscribe(() => count++);
    myBaseComponent.ngOnDestroy();

    setTimeout(() => {
      expect(count).toBe(2);
      done();
    }, 500);
  });


});
