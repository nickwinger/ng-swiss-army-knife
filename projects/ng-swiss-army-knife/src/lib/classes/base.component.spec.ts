import { TestBed } from '@angular/core/testing';
import { BaseComponent } from './base.component';
import { Component, Input, ViewChild } from '@angular/core';

@Component({
  template: '<mybase #mybase [inputTest]="inputTest"></mybase>'
})
export class MyBaseWrapperComponent {
  inputTest: any;
  @ViewChild('mybase') mybase: MyBaseComponent;
}

@Component({
  selector: 'mybase',
  template: ``
})
export class MyBaseComponent extends BaseComponent {
  @Input() inputTest: any;

  constructor() {
    super();
  }
}

describe('base.component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBaseComponent, MyBaseWrapperComponent]
    })
      .compileComponents();
  });

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

  it('should emit onChanges', (done: DoneFn) => {
    const fixture = TestBed.createComponent(MyBaseWrapperComponent);
    fixture.componentInstance.mybase.onChanges$.subscribe(change => {
      expect(change.property).toBe('inputTest');
      expect(change.change.currentValue).toBe('test');
      done();
    });
    fixture.componentInstance.inputTest = 'test';
    fixture.detectChanges();

  });
});
