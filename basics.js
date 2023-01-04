import { parseDoc } from './parser'

import {of} from 'rxjs';

function ofExample() {
    const source = of(1, 2, 3, 4, 5);
    source.subscribe(val => document.getElementById('of-results').innerText = val);
}


const ofBtn = document.getElementById('of-btn');
ofBtn.addEventListener('click', ofExample);

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('of').innerText = ofExample.toString();
});

parseDoc();
