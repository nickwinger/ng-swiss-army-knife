import { TestBed } from '@angular/core/testing';
import { CachedObservableService } from './cachedObservable.service';

describe('CachedObservableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  it('should be created', () => {
    const service: CachedObservableService = TestBed.get(CachedObservableService);
    expect(service).toBeTruthy();
  });

});
