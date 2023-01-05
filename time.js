import { fromEvent, interval, merge, NEVER } from 'rxjs';


export const count = document.querySelector('.count');
export const startButton = document.getElementById('start');
export const pauseButton = document.getElementById('pause');

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');

export const setCount = (value) => {
  count.innerText = value;
};

let interval$ = interval(1000);
let subscription;

start$.subscribe(() => {
  subscription = interval$.subscribe(setCount);
})

pause$.subscribe(() => {
  subscription.unsubscribe();
});

