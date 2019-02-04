import { TestBed } from '@angular/core/testing';

import { NgSwissArmyKnifeService } from './ng-swiss-army-knife.service';

describe('NgSwissArmyKnifeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgSwissArmyKnifeService = TestBed.get(NgSwissArmyKnifeService);
    expect(service).toBeTruthy();
  });
});
