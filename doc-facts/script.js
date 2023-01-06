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

const fetchDogFacts = () => {
  return fromFetch(endpoint).pipe(
    tap(clearError),
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

const endpoint = 'http://localhost:3333/api/facts?delay=2000&chaos=true&flakiness=2';

const fetch$ = fromEvent(fetchButton, 'click').pipe(switchMap(fetchDogFacts))

fetch$.subscribe(({facts, error}) => {
  if (error) {
    setError(error);
    return;
  }

  clearFacts();
  addFacts(facts);
});
