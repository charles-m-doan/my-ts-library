import { BehaviorSubject, Observable, of } from "rxjs";
import { User, Personal, ContactInfo, Address, Transaction } from "./models";
import { Teller } from "./teller";

export class Profile {
    public user$: Observable<User>;
    private _user: BehaviorSubject<User>;

    public personal: Personal;
    public contactInfo: ContactInfo;
    public address: Address;
    public transactions: Transaction[];

    public id: string;
    private friendCount: number;

    constructor(id: string, user: User, teller: Teller, friendCount: number) {
        this.id = id;
        this.friendCount = friendCount;
        this._user = new BehaviorSubject(user);
        this.user$ = this._user.asObservable();
        this.personal = user.personal;
        this.contactInfo = user.contactInfo;
        this.address = user.address;
        this.transactions = teller.getTransactions(user);
    }

    public getFriendCount(): number {
        return this.friendCount;
    }

    public getEmail(): string {
        return this.contactInfo.email;
    }

    public getPhoneNumber(): string {
        return this.contactInfo.phone;
    }

    public getTransactionCount(): number {
        return this.transactions.length;
    }

    public isFriendless(): boolean {
        return this.friendCount === 0;
    }

    public getAddress(): Address {
        return this.address;
    }
}
