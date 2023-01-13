import { parseDoc } from './parser'
import { Observable, retry } from 'rxjs';


parseDoc();

const observable$ = new Observable(observer => {
  let count = 0;
  const id = setInterval(() => {
    observer.next(count++);
  }, 1000);

  return () => {
    clearInterval(id);
    console.log('clearInterval');
  }

})

const observable2$ = new Observable(observer => {
  let count = 10;
  const id = setInterval(() => {
    observer.next(count++);
  }, 1000);

  return () => {
    clearInterval(id);
    console.log('clearInterval');
  }

})

const observer = {
  next: value => console.log(value),
  error: error => console.log(error),
  complete: () => console.log('complete')
}

const subscription = observable$.subscribe(observer);
const subscription2 = observable2$.subscribe(observer);
subscription.add(subscription2);

setTimeout(() => {
  subscription.unsubscribe();
}, 3500)



