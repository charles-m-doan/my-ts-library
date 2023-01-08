import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { createExampleUser } from './example-generators';
import { User } from './models';
import { Profile } from './profile';
import { Teller } from './teller';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private id: string = '1';

  public user$: Observable<User>;
  private _user: BehaviorSubject<User>;

  public profile$: Observable<Profile>;
  private _profile: BehaviorSubject<Profile>;

  constructor(private transactionService: TransactionService) {
    this._user = new BehaviorSubject(createExampleUser());
    this.user$ = this._user.asObservable();

    this._profile = new BehaviorSubject(new Profile(this.id, this._user.value, new Teller(), 0));
    this.profile$ = this._profile.asObservable();

    this.transactionService.teller$.subscribe((teller) => {
      this.updateProfile(teller);
    });

    this.transactionService.updateTeller(new Teller());
  }

  private updateProfile(teller: Teller): void {
    const currentProfile: Profile = this._profile.value;
    const updateProfile: Profile = new Profile(this.id, this._user.value, teller, currentProfile.getFriendCount());
    this._profile.next(updateProfile);
  }

  public getTransactionId(): string {
    return this.transactionService.getId();
  }
}
