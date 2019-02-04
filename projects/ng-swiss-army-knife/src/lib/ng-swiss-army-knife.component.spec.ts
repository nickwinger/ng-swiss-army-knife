import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSwissArmyKnifeComponent } from './ng-swiss-army-knife.component';

describe('NgSwissArmyKnifeComponent', () => {
  let component: NgSwissArmyKnifeComponent;
  let fixture: ComponentFixture<NgSwissArmyKnifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgSwissArmyKnifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSwissArmyKnifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
