import { fromEvent } from 'rxjs';
import { throttleTime, debounce, throttle } from 'rxjs/operators';

import {
  button,
  panicButton,
  addMessageToDOM,
} from './utilities';

const panicClick$ = fromEvent(panicButton, 'click');
// this will return an observable that debounces the click event on the panic button
// Nothing will happen until the use clicks the panic button
let buttonClicks$ = fromEvent(button, 'click').pipe(debounce(() => panicClick$));
// we can use throttle to prevent the second click until the panic button is clicked after
/* buttonClicks$ = fromEvent(button, 'click').pipe(throttle(() => panicClick$)); */

buttonClicks$.subscribe(addMessageToDOM);
