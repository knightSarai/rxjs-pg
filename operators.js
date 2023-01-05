import { fromEvent, interval, merge, NEVER } from 'rxjs';
import { scan, map, skipUntil, takeUntil, tap, switchMap} from 'rxjs/operators';


export const count = document.querySelector('.count');
export const startButton = document.getElementById('start');
export const pauseButton = document.getElementById('pause');

export const setCount = (value) => count.innerText = value;

const start$ = fromEvent(startButton, 'click').pipe(map(() => true));
const pause$ = fromEvent(pauseButton, 'click').pipe(map(() => false));

const counter$ = merge(start$, pause$).pipe(
  switchMap(isRunning => isRunning ? interval(1000) : NEVER),
  scan((total) => total + 1, 0),
)

counter$.subscribe(setCount);
