import { TestBed } from '@angular/core/testing';
import { CachedObservableService } from './cachedObservable.service';
import { BehaviorSubject, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';

describe('CachedObservableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  it('should be created', () => {
    const service: CachedObservableService = TestBed.get(CachedObservableService);
    expect(service).toBeTruthy();
  });

  it('should cache and the reset the cache', async () => {
    const service: CachedObservableService = TestBed.get(CachedObservableService);
    const sub = new BehaviorSubject(1);
    const ob = sub.asObservable();

    let v = await service.getOrCreate('test1', 2, ob)
      .pipe(take(1)).toPromise();
    expect(v).toBe(1);

    sub.next(2);

    v = await service.getOrCreate('test1', 2, ob).pipe(take(1)).toPromise();
    expect(v).toBe(1);

    // wait 2 seconds
    await of('k').pipe(delay(2000), take(1)).toPromise();

    v = await service.getOrCreate('test1', 2, ob).pipe(take(1)).toPromise();
    expect(v).toBe(2);

    sub.next(3);

    v = await service.getOrCreate('test1', 2, ob).pipe(take(1)).toPromise();
    expect(v).toBe(2);

    service.reset('test1');

    v = await service.getOrCreate('test1', 2, ob).pipe(take(1)).toPromise();
    expect(v).toBe(3);
  });
});
