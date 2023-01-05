import { fromEvent, interval, merge, NEVER } from 'rxjs';
import { scan, skipUntil, takeUntil, tap } from 'rxjs/operators';


export const count = document.querySelector('.count');
export const startButton = document.getElementById('start');
export const pauseButton = document.getElementById('pause');

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');

export const setCount = (value) => count.innerText = value;


let counter$ = interval(1000).pipe(
  skipUntil(start$),
  scan((total) => total + 1, 0),
  takeUntil(pause$),
);

counter$.subscribe(setCount);



