import { fromEvent, asyncScheduler } from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
import {map, switchMap, tap, throttleTime } from 'rxjs/operators';


const url = "https://baconipsum.com/api/?type=all-meat&paras=15&start-with-lorem=1"

const progressBar = document.getElementById('progress-bar');

const getIpsum = () => fromFetch(url).pipe(
  switchMap(response => response.json()),
  tap(data => {
    data.forEach(item => {
      const p = document.createElement('p');
      p.innerText = item;
      document.body.appendChild(p);
    });
  }),
)

const calculateProgress = ({scrollTop, scrollHeight, clientHeight}) => {
  return (scrollTop / (scrollHeight - clientHeight)) * 100
}

const scroll$ = fromEvent(document, 'scroll')
const progress$ = scroll$.pipe(
  throttleTime(30, asyncScheduler, {leading: false, trailing: true}),
  map(({target}) => calculateProgress(target.documentElement)),
  tap(progress => progressBar.style.width = `${progress}%`)
)

progress$.subscribe(console.log)


getIpsum().subscribe()


