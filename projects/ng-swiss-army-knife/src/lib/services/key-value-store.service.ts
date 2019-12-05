import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface ValueChange<T> {
  key: string;
  currentValue: T;
  previousValue: T;
}

export const KeyValueStoreInitialValue = new InjectionToken<string>('KeyValueStoreInitialValue');

@Injectable({
  providedIn: 'root'
})
export class KeyValueStoreService<TStore> {
  private readonly LOCALSTORAGE_KEY = 'KeyValueStore';
  private changes$: Subject<ValueChange<any>>;
  private store$: BehaviorSubject<TStore>;

  constructor(@Inject(KeyValueStoreInitialValue) @Optional() protected initialStore: TStore) {
    this.changes$ = new Subject<ValueChange<any>>();

    const currentValue = this.getFromLocalStorage(this.LOCALSTORAGE_KEY);
    this.store$ = new BehaviorSubject<TStore>((currentValue || initialStore || {}) as TStore);

    this.changes$.subscribe(change => {
      const store = this.store$.getValue();
      store[change.key] = change.currentValue;
      this.store$.next(store);
    });

    this.store$.subscribe(store => {
      localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(store));
    });
  }

  getStore(): TStore {
    return this.store$.getValue();
  }

  getStore$(): Observable<TStore> {
    return this.store$.asObservable();
  }

  getAllChanges$(): Observable<ValueChange<any>> {
    return this.changes$.asObservable();
  }

  resetStore() {
    this.store$ = new BehaviorSubject<TStore>((this.initialStore || {}) as TStore);
  }

  getValue$<T>(key: string): Observable<T> {
    return this.changes$.asObservable().pipe(
      filter(change => change.key === key),
      map(change => change.currentValue)
    );
  }

  getValueChanges$<T>(key: string): Observable<ValueChange<T>> {
    return this.changes$.asObservable().pipe(
      filter(change => change.key === key)
    );
  }

  protected getFromLocalStorage<T>(key: string): T {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return undefined;
    }
  }

  getValue<T>(key: string): T {
    return this.getFromLocalStorage<T>(key);
  }

  setValue<T>(key: string, value: T) {
    this.changes$.next({
      key: key,
      currentValue: value,
      previousValue: this.getFromLocalStorage<T>(key)
    });
  }
}
