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

  resetAll() {
    this.dictionary.forEach((observable, key) => {
      observable.reset();
    });
  }

  resetByKeyStartsWith(keyStartsWith: string) {
    this.dictionary.forEach((observable, key) => {
      if (key.startsWith(keyStartsWith)) {
        observable.reset();
      }
    });
  }

  /***
   * Resets the cache duration, so the next attempt will fetch new
   */
  reset(key: string) {
    if (this.dictionary.has(key)) {
      this.dictionary.get(key).reset();
    }
  }

  /***
   * Refreshes (refetches) the observable
   */
  refresh(key: string) {
    if (this.dictionary.has(key)) {
      this.dictionary.get(key).refresh();
    }
  }

  getOrCreate<T>(key: string, cacheDurationSeconds: number,
                 observable: Observable<T>): Observable<T> {
    console.debug('ngSwissArmyKnife::cachedObservable::getOrCreate', key, cacheDurationSeconds);
    if (!this.dictionary.has(key)) {
      console.debug('ngSwissArmyKnife::cachedObservable::getOrCreate::createNew', key, cacheDurationSeconds);
      this.dictionary.set(key,
        new CachedObservable<T>(cacheDurationSeconds, observable));
    }

    return this.dictionary.get(key).getObservable();
  }
}
