import { fromEvent } from 'rxjs';
import { Store } from './store';


const usernameSpan = document.getElementById('username');
const getUserBtn = document.querySelector('button');

const getUser$ = fromEvent(getUserBtn, 'click');

const setUsername = username => usernameSpan.innerText = username;

const userStore$ = new Store({
  username: 'no user',
  isAuthed: false
})

userStore$
  .selectState('username')
  .subscribe(setUsername);

userStore$
  .stateChanges()
  .subscribe(console.log);

getUser$
  .subscribe(() => userStore$.updateState({username: 'knight', isAuthed: true}))

