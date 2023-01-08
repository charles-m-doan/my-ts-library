import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { createExampleTeller } from './example-generators';
import { Teller } from './teller';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public teller$: Observable<Teller>;
  private _teller: BehaviorSubject<Teller>;

  constructor() {
    this._teller = new BehaviorSubject(new Teller());
    this.teller$ = this._teller.asObservable();
  }

  public updateTeller(teller: Teller): void {
    this._teller.next(teller);
  }
}
