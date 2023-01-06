import { fromEvent, of, timer, merge, NEVER } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import {
  catchError,
  exhaustMap,
  mapTo,
  mergeMap,
  retry,
  startWith,
  switchMap,
  tap,
  map,
  pluck,
} from 'rxjs/operators';

import {
  fetchButton,
  stopButton,
  clearError,
  clearFacts,
  addFacts,
  setError,
} from './utilities';

const fetchData = () => {
  return fromFetch(endpoint).pipe(
    mergeMap(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Error fetching dog facts');
      }
    }),
    retry(4),
    catchError(error => of({ error: error.message })),
  )
}

const endpoint = 'http://localhost:3333/api/facts?delay=0&chaos=true&flakiness=0';

const fetch$ = fromEvent(fetchButton, 'click').pipe(map(() => true));
const stop$ = fromEvent(stopButton, 'click').pipe(map(() => false));

const pollFacts = () => {
  return timer(0, 5000).pipe(
    tap(clearError),
    tap(clearFacts),
    exhaustMap(fetchData)
  )
}

const factStream$ = merge(fetch$, stop$).pipe(switchMap(shouldFetch => shouldFetch ? pollFacts() : NEVER))

factStream$.subscribe(addFacts);
