import { of, from, interval, fromEvent, merge, NEVER } from 'rxjs';
import { pluck, concatMap, mergeMap, take, map } from 'rxjs/operators';

import {
  getCharacter,
  render,
  startButton,
  pauseButton,
  setStatus,
} from './utilities';

const character$ = of(0, 1, 2, 3, 4).pipe(
  mergeMap((n) => getCharacter(n)),
  map(character => character.name)
);

character$.subscribe(render);
