import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';
import { UserService } from './user.service';
import { ngMocks } from 'ng-mocks';
import { Teller } from './teller';
import { BehaviorSubject } from 'rxjs';
import { createMockProvider } from '../test-util';
import { ExampleService } from './example.service';

describe('UserService', () => {
  let service: UserService;
  let parent = 0;

  beforeEach(() => {
    parent++;
    console.log('parent beforeEach: ' + parent);
    TestBed.configureTestingModule({
      providers: [
        // TODO: Modify createMockProvider so that it is unecessary to supply a behavior subject every time.
        // And/OR that it will pull the "mockData" from a function that maps Types to mockData - similar to how you began.
        // Obviously whatever is provided to the createMockProvider function should override whatever gets assigned by default.
        createMockProvider(TransactionService, { teller$: new BehaviorSubject(new Teller()) }),
        createMockProvider(ExampleService)
      ]
    });
    ngMocks.autoSpy('jasmine');

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service['transactionService'].updateTeller).toHaveBeenCalled();
  });

  describe('getTransactionId', () => {

    let nested = 0;

    beforeEach(() => {
      nested++;
      console.log('nested beforeEach 1: ' + nested);
    });

    it('should return 12345', () => {
      // GIVEN
      (service['transactionService'] as any).getId.and.returnValue('12345');
      // WHEN
      const actual = service.getTransactionId();
      // THEN
      expect(service['transactionService'].getId).toHaveBeenCalledTimes(1);
      expect(actual).toEqual('12345');
    });

    it('should return 6789', () => {
      // GIVEN
      (service['transactionService'] as any).getId.and.returnValue('6789');
      // WHEN
      const actual = service.getTransactionId();
      // THEN
      expect(service['transactionService'].getId).toHaveBeenCalledTimes(1);
      expect(actual).toEqual('6789');
    });

    it('should return 3456', () => {
      // GIVEN
      (service['transactionService'] as any).getId.and.returnValue('3456');
      // WHEN
      const actual = service.getTransactionId();
      // THEN
      expect(service['transactionService'].getId).toHaveBeenCalledTimes(1);
      expect(actual).toEqual('3456');
    });

  });


  describe('getTransactionId2', () => {

    let nested = 0;

    beforeEach(() => {
      nested++;
      console.log('nested beforeEach 2: ' + nested);
    });

    it('should return 12345', () => {
      // GIVEN
      (service['transactionService'] as any).getId.and.returnValue('12345');
      // WHEN
      const actual = service.getTransactionId();
      // THEN
      expect(service['transactionService'].getId).toHaveBeenCalledTimes(1);
      expect(actual).toEqual('12345');
    });

    it('should return 6789', () => {
      // GIVEN
      (service['transactionService'] as any).getId.and.returnValue('6789');
      // WHEN
      const actual = service.getTransactionId();
      // THEN
      expect(service['transactionService'].getId).toHaveBeenCalledTimes(1);
      expect(actual).toEqual('6789');
    });

    it('should return 3456', () => {
      // GIVEN
      (service['transactionService'] as any).getId.and.returnValue('3456');
      // WHEN
      const actual = service.getTransactionId();
      // THEN
      expect(service['transactionService'].getId).toHaveBeenCalledTimes(1);
      expect(actual).toEqual('3456');
    });

  });

});
