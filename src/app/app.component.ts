import {Component} from '@angular/core';
import {Observable} from "rxjs/Rx";


import {Store} from "ngrx/@ngrx/store";
import {BehaviorSubject} from "rxjs/BehaviorSubject";


type Reducer<T> = (state: T, action: Action) => T;

export interface Action {
  type: string;
  payload?: any;
}

export function counter(state: number = 0, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

export class store extends BehaviorSubject<any> {
  constructor(initalState: any) {
    super(initalState);
  }
}


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

