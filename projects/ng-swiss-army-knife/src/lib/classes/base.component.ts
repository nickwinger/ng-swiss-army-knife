import {OnDestroy, OnInit} from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

/**
 * This should be the very base component of every angular component
 * It uses OnInit and OnDestroy, so remember to call super.ngOnInit() at first
 * if you also use OnInit in the child class
 *
 * In nearly every angular component you will subscribe to something
 * and the best approach to unsubscribe is: takeUntil
 * takeUntil the component gets destroyed
 *
 * e.g.:
 * timer(1000).pipe(
 *  takeUntil(this.onDestroy$),
 *  tap(() => do something)
 * ).subscribe();
 *
 * so this base class has no injector dependencies and provide the onDestroy$ and onInit$ observables
 * which you can subscribe to.
 *
 * e.g. you don't have to use OnInit in the subsclass you cann also just
 * subscribe to this.onInit$.subscribe() in the constructor
 * it' also useful if you want to access @Input variables which get set
 * at in onInit lifecycle and not in the constructor, so:
 *
 * @Input() someVar;
 * constructor() {
 *   this.onInit$().subscribe(() => console.log(this.someVar));
 * }
 */
export abstract class BaseComponent implements OnDestroy, OnInit {
  private onDestroy$ubject: ReplaySubject<void>;
  private onInit$ubject: ReplaySubject<void>;

  /**
   * Emits when the angular component gets destroyed
   */
  onDestroy$: Observable<void>;

  /**
   * Emits when the angular component gets initialized
   */
  onInit$: Observable<void>;

  constructor() {
    this.onDestroy$ubject = new ReplaySubject(1);
    this.onInit$ubject = new ReplaySubject(1);

    this.onDestroy$ = this.onDestroy$ubject.asObservable();
    this.onInit$ = this.onInit$ubject.asObservable();
  }

  ngOnInit() {
    this.onInit$ubject.next(undefined);
    this.onInit$ubject.complete();
  }

  ngOnDestroy() {
    this.onDestroy$ubject.next(undefined);
    this.onDestroy$ubject.complete();
  }
}
