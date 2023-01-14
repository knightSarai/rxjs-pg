import { fromEvent, interval, merge, NEVER } from "rxjs";
import { map, scan, takeWhile, startWith, switchMap} from "rxjs/operators";

const COUNTDOWN_SECONDS = 10;

const counter = document.getElementById('counter');
const message = document.getElementById('message');
const startbtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');

const counter$ = interval(1000)

const start$ = fromEvent(startbtn, 'click')
const stop$ = fromEvent(stopBtn, 'click');

merge(
  start$.pipe(map(() => true)),
  stop$.pipe(map(() => false))
).pipe(
  switchMap(value => value ? counter$: NEVER),
  map(() => -1),
  scan((acc, curr) => acc + curr, COUNTDOWN_SECONDS),
  takeWhile(value => value >= 0),
  startWith(COUNTDOWN_SECONDS)
).subscribe(value => {
    counter.innerText = value;
    if (!value) {
      message.innerText = 'Done!';
    }
})
