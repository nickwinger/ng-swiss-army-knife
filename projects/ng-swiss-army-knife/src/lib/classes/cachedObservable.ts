import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  getObservable(): Observable<T> {
    // Update the cache ?
    if (this.lastUpdatedSeconds <
      Date.now() / 1000 - this.cacheDurationSeconds) {
      this.observable.pipe(
        tap(() => this.lastUpdatedSeconds =
          Date.now() / 1000),
        tap(response => this.replaySubject.next(response))
      ).subscribe();
    }

    return this.replaySubject.asObservable();
  }
}
