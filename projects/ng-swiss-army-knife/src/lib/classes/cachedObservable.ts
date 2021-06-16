import { Observable, ReplaySubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';

export class CachedObservable<T> {
  private replaySubject: ReplaySubject<T>;
  private lastUpdatedSeconds: number;

  constructor(private cacheDurationSeconds: number,
              private observable: Observable<T>) {
    this.replaySubject      = new ReplaySubject<T>(1);
    this.lastUpdatedSeconds = 0;
  }

  /***
   * Resets the cache duration, so the next attempt will fetch new
   */
  reset() {
    this.lastUpdatedSeconds = Date.now() / 1000 - this.cacheDurationSeconds - 1;
  }

  /***
   * Refreshes (refetches) the observable
   */
  refresh() {
    this.observable.pipe(
      take(1),
      tap(() => this.lastUpdatedSeconds =
        Date.now() / 1000),
      tap(response => this.replaySubject.next(response))
    ).subscribe();
  }

  getObservable(): Observable<T> {
    const secondsNow = Date.now() / 1000;

    // Update the cache ?
    if (this.lastUpdatedSeconds < secondsNow - this.cacheDurationSeconds) {
      console.debug(`ngSwissArmyKnife::cachedObservable::getObservable::fetchNew::this.lastUpdatedSeconds${this.lastUpdatedSeconds}this.cacheDurationSeconds${this.cacheDurationSeconds}secondsNow${secondsNow}`);

      return this.observable.pipe(
        take(1),
        tap(() => this.lastUpdatedSeconds =
          Date.now() / 1000),
        tap(response => {
          this.replaySubject.next(response);
        })
      );
    }
    console.debug('ngSwissArmyKnife::cachedObservable::getObservable', this.lastUpdatedSeconds, this.cacheDurationSeconds);
    return this.replaySubject.asObservable();
  }
}
