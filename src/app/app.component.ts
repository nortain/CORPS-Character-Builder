import {Component} from '@angular/core';
import {Observable} from "rxjs/Observable";

import {Race} from "./shared/character/race/race";
import {Action, Reducer, Store} from "ngrx/@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  counter$: Observable<number>;

  constructor(private store: Store<number>) {
    this.counter$ = this.store.select('counter');
  }

  increment() {
    this.store.dispatch({type: 'INCREMENT'});
  }

  decrement() {
    this.store.dispatch({type: 'DECREMENT'});
  }
}

export const counter: Reducer<number> = (state: number = 0, action: Action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};
