import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  public testStr: string;
  public testBool: boolean;
  public observable1$: Observable<boolean>;
  public observable2$: Observable<number>;

  public _observable2: BehaviorSubject<number>;

  constructor() {
    this.testStr = 'a test string';
    this.testBool = false;
    this._observable2 = new BehaviorSubject<number>(0);
    this.observable1$ = this._observable2.asObservable().pipe(
      map(value => value > 0), distinctUntilChanged()
    );
    this.observable2$ = this._observable2.asObservable().pipe(distinctUntilChanged());
  }
}
