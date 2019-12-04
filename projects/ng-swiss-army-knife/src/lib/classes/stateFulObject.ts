import { BehaviorSubject, Observable } from 'rxjs';

export class StatefulObject<T> {

  protected stateSubject: BehaviorSubject<T>;
  public state$: Observable<T>;
  public stateSnapshot: T;

  constructor() {
    this.stateSubject = new BehaviorSubject<T>({} as any);
    this.state$ = this.stateSubject.asObservable();
    this.stateSubject.subscribe(s => this.stateSnapshot = s);
  }

  setState(newState: Partial<T>) {
    this.stateSubject.next({
      ...this.stateSubject.getValue(),
      ...newState
    });
  }
}
