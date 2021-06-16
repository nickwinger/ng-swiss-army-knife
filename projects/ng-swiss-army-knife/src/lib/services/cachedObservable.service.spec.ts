import { TestBed } from '@angular/core/testing';
import { CachedObservableService } from './cachedObservable.service';

describe('CachedObservableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  // it('should cache for a minute', async () => {
  //   const subj = new BehaviorSubject('Hallo0');
  //   const service: CachedObservableService = TestBed.get(CachedObservableService);
  //
  //   let v = await service.getOrCreate('test', 60, subj).pipe(take(1)).toPromise();
  //   subj.next('Hallo1');
  //   expect(v).toBe('Hallo0');
  //
  //   // wait 20 seconds
  //   await of('k').pipe(delay(1000 * 20), take(1)).toPromise();
  //
  //   // check again
  //   v = await service.getOrCreate('test', 60, subj).pipe(take(1)).toPromise();
  //   expect(v).toBe('Hallo0');
  //
  //   // wait for another 50 seconds
  //   await of('k').pipe(delay(1000 * 50), take(1)).toPromise();
  //
  //   // check again
  //   v = await service.getOrCreate('test', 60, subj).pipe(take(1)).toPromise();
  //   expect(v).toBe('Hallo1');
  // });

  it('should be created', () => {
    const service: CachedObservableService = TestBed.get(CachedObservableService);
    expect(service).toBeTruthy();
  });

});
