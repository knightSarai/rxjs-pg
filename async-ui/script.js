import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  mergeMap,
  switchMap,
  tap,
  of,
  merge,
  from,
  filter,
  catchError,
  concat,
  take,
  first,
  EMPTY,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';

import {
  addResults,
  addResult,
  clearResults,
  endpointFor,
  search,
  form,
  renderPokemon
} from './utilities';


const endpoint = 'http://localhost:3333/api/pokemon/';

const searchData = (searchTerm) => {
  return fromFetch(endpoint + 'search/'+ searchTerm).pipe(
    switchMap(response => response.json()),
    map(data => data.pokemon),
  )
}

const getPokemon = (pokemon) => {
  return fromFetch(endpoint + pokemon.id + '/?delay=2000').pipe(
    switchMap(response => response.json())
  )
}

const searchWithAutoComplete$ = fromEvent(search, 'input').pipe(
  debounceTime(1000),
  map(event => event.target.value),
  distinctUntilChanged(),
  switchMap(searchData),
  tap(clearResults),
  tap(addResults),
)


const searchOnSubmit$ = fromEvent(form, 'submit').pipe(
  map(() => search.value),
  switchMap(searchData),
  tap(clearResults),
  // mergeMap will turn the array of pokemon into an observable of pokemon and emit each pokemon
  mergeMap(pokemon => pokemon),
  first(),
  switchMap(pokemon => {
    // turn the pokemon into an observable of pokemon
    // and then merge it with the pokemon data
    const pokemon$ = of(pokemon);
    const additionalData$ = getPokemon(pokemon).pipe(map(data => ({...pokemon, data})))
    // merge will emit each pokemon and data as they come in
    return merge(pokemon$, additionalData$)
  }),
  tap(renderPokemon)
)

searchOnSubmit$.subscribe(console.log);
