import { fromEvent, merge, interval } from 'rxjs';
import { startWith, take, map } from 'rxjs/operators';
import {
  labelWith,
  startButton,
  pauseButton,
  mergeMethodSelect,
  setStatus,
  bootstrap,
  mergeMethods,
  outputs
} from './utilities';

import {
  emptyElements,
} from '../utilities/dom-manpulation';

let selectedMergeMethod = mergeMethods['merge']


const start$ = fromEvent(startButton, 'click').pipe(map(() => true));
const pause$ = fromEvent(pauseButton, 'click').pipe(map(() => false));

const isRunning$ = merge(start$, pause$).pipe(startWith(false));


const first$ = interval(1000).pipe(map(labelWith('First')), take(4));
const second$ = interval(1000).pipe(map(labelWith('Second')), take(4));
let combined$ = selectedMergeMethod(first$, second$)

let subscribtion = bootstrap({ first$, second$, combined$ });

const mergeMethod$ = fromEvent(mergeMethodSelect, 'change').pipe(map((e) => e.target.value));
mergeMethod$.subscribe((method) => {
  subscribtion.unsubscribe();
  emptyElements(outputs);
  selectedMergeMethod = mergeMethods[method];
  if (method === 'forkJoin') {
    combined$ = selectedMergeMethod([first$, second$]);
  } else {
    combined$ = selectedMergeMethod(first$, second$)
  }
  subscribtion = bootstrap({ first$, second$, combined$ });
});


isRunning$.subscribe(setStatus)
    
