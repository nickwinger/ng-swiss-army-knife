import { Injectable } from '@angular/core';
import { CachedObservable } from '../classes/cachedObservable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CachedObservableService {
  private dictionary: Map<string, CachedObservable<any>>;

  constructor() {
    this.dictionary = new Map<string, CachedObservable<any>>();
  }

  /***
   * Resets the cache duration, so the next attempt will fetch new
   */
  reset(key: string) {
    if (this.dictionary.has(key)) {
      this.dictionary[key].reset();
    }
  }

  getOrCreate<T>(key: string, cacheDurationSeconds: number,
                 observable: Observable<T>): Observable<T> {
    if (!this.dictionary.has(key)) {
      this.dictionary.set(key,
        new CachedObservable<T>(cacheDurationSeconds, observable));
    }

    return this.dictionary.get(key).getObservable();
  }
}
