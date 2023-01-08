import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Teller } from './teller';
import { TransactionService } from './transaction.service';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockTransactionService: any = {
    teller$: new BehaviorSubject(new Teller())
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TransactionService, useValue: mockTransactionService
        }
      ]
    });
    service = TestBed.inject(UserService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
