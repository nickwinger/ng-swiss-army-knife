import {
  Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges
} from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface SimpleChangeWrapper {
  /**
   * The property name which changes
   */
  property: string;
  change: SimpleChange;
}
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
 * so this base class has no injector dependencies and provide the onDestroy$
 * and onInit$ observables which you can subscribe to.
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
export abstract class BaseComponent implements OnDestroy, OnInit, OnChanges {
  private onDestroy$ubject: ReplaySubject<void>;
  private onInit$ubject: ReplaySubject<void>;
  private onChanges$ubject: Subject<SimpleChangeWrapper>;

  @Input() set disabled(isDisabled: boolean) {
    this.isDisabled$.next(isDisabled);
  }

  /**
   * Emits when the angular component gets destroyed
   */
  readonly onDestroy$: Observable<void>;

  /**
   * Emits when the angular component gets initialized
   */
  readonly onInit$: Observable<void>;

  /**
   * Emits when the angular component receive a new Input value
   */
  readonly onChanges$: Observable<SimpleChangeWrapper>;

  readonly isDisabled$: BehaviorSubject<boolean>;

  constructor() {
    this.isDisabled$ = new BehaviorSubject<boolean>(false);

    this.onDestroy$ubject = new ReplaySubject(1);
    this.onInit$ubject = new ReplaySubject(1);
    this.onChanges$ubject = new Subject();

    this.onDestroy$ = this.onDestroy$ubject.asObservable();
    this.onInit$ = this.onInit$ubject.asObservable();
    this.onChanges$ = this.onChanges$ubject.asObservable();
  }

  /**
   * Returns the SimpleChange event for the given property
   * @param property The property (name of the @Input) for which to filter
   */
  onChangesByProperty$(property: string): Observable<SimpleChange> {
    return this.onChanges$.pipe(filter(ch => ch.property === property), map(ch => ch.change));
  }

  /**
   * Returns the currentValue of the SimpleChange event for the given property
   * @param property The property (name of the @Input) for which to filter
   */
  onChangesCurrentValueByProperty$<T>(property: string): Observable<T> {
    return this.onChanges$.pipe(filter(ch => ch.property === property), map(ch => ch.change.currentValue));
  }

  ngOnInit() {
    this.onInit$ubject.next(undefined);
    this.onInit$ubject.complete();
  }

  ngOnDestroy() {
    this.onDestroy$ubject.next(undefined);
    this.onDestroy$ubject.complete();
    this.onChanges$ubject.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changedProperties = Object.keys(changes);
    changedProperties.forEach(changedProperty => {
      this.onChanges$ubject.next({
        property: changedProperty,
        change: changes[changedProperty]
      });
    });
  }
}
