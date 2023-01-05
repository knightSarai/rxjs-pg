import { parseDoc } from './parser'

import {of, fromEvent} from 'rxjs';

function ofExample() {
    const source = of(1, 2, 3, 4, 5);
    source.subscribe(val => document.getElementById('of-results').innerText = val);
}


const ofBtn = document.getElementById('of-btn');
ofBtn.addEventListener('click', ofExample);

function fromEventExample() {
  const fromEventBtn = document.getElementById('from-event-btn');
  fromEventBtn.addEventListener('click', () => alert("Normal Event Listener"))
  const fromButtonClicks$ = fromEvent(fromEventBtn, 'click')
  fromButtonClicks$.subscribe(() => alert("From Observable"))
}

fromEventExample();

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('of').innerText = ofExample.toString();
  document.getElementById('fromEvent').innerText = fromEventExample.toString();
});

parseDoc();
