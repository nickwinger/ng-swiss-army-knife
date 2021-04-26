import { CachedObservable } from './cachedObservable';
import { BehaviorSubject, of } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';

describe('cachedObservabvle', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  it('should cache', async () => {
    const subj = new BehaviorSubject('Hallo0');
    const cache = new CachedObservable(2, subj.asObservable());
    let v = await cache.getObservable().pipe(take(1)).toPromise();
    subj.next('Hallo1');
    expect(v).toBe('Hallo0');

    // wait 2 seconds
    await of('k').pipe(delay(2000), take(1)).toPromise();
    v = await cache.getObservable().pipe(take(1)).toPromise();
    expect(v).toBe('Hallo1');

    subj.next('Hallo2');
    v = await cache.getObservable().pipe(take(1)).toPromise();
    expect(v).toBe('Hallo1');
    cache.reset();
    v = await cache.getObservable().pipe(take(1)).toPromise();
    expect(v).toBe('Hallo2');
  });

  it('should cache test 2', async () => {
    let obValue = 1;

    const cache = new CachedObservable(2,
      of('test').pipe(
        // Simulate fetching the value takes some time
        delay(2000),
        map(() => obValue)
      ));
    let v = await cache.getObservable().pipe(take(1)).toPromise();
    obValue = 2;
    expect(v).toBe(1);

    await of('k').pipe(delay(2000), take(1)).toPromise();

    v = await cache.getObservable().pipe(take(1)).toPromise();
    expect(v).toBe(2);
  });

});
