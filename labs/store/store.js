import { BehaviorSubject, Subject } from 'rxjs';
import { scan, distinctUntilKeyChanged, map } from 'rxjs/operators'


export class Store {
  constructor(initialState) {
    this._store = new BehaviorSubject(initialState);
    this._stateUpdates = new Subject();
    
    this._stateUpdates.pipe(
      scan((acc, curr) => ({...acc, ...curr}), initialState)
    ).subscribe(this._store)
  }

  updateState(stateUpdate) {
    this._stateUpdates.next(stateUpdate)
  }

  selectState(stateKey) {
    return this._store.pipe(
      distinctUntilKeyChanged(stateKey),
      map(state => state[stateKey])
    )
  }

  stateChanges() {
    return this._store.asObservable();
  }
}
