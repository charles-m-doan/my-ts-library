import { TestBed } from "@angular/core/testing";
import * as moment from "moment";
import { MockProvider, ngMocks } from "ng-mocks";
import { BehaviorSubject } from "rxjs";
import { findFieldValue, isLastDayOfMonth, mapPropertiesToObject, overwritePropertiesOfTarget, Property, resetMockProvider } from "./test-util";

describe("overwritePropertiesOfTarget", () => {
    let source: any;
    let target: any;

    beforeEach(() => {
        source = { a: 1, b: 'string' };
        target = { c: true, d: 4 };
    });

    it("should return target object", () => {
        const result = overwritePropertiesOfTarget(source, target);
        expect(result).toBe(target);
    });

    it("should copy all properties from source to target", () => {
        const result = overwritePropertiesOfTarget(source, target);
        expect(result).toEqual({ a: 1, b: 'string', c: true, d: 4 });
    });

    it("should overwrite properties of target", () => {
        const result = overwritePropertiesOfTarget(source, target);
        expect(result).toEqual({ a: 1, b: 'string', c: true, d: 4 });
    });

    it("should copy complex object properties", () => {
        source = { a: 1, b: { x: 2, y: 'complex' } };
        target = { c: 3, d: 4 };
        const result = overwritePropertiesOfTarget(source, target);
        expect(result).toEqual({ a: 1, b: { x: 2, y: 'complex' }, c: 3, d: 4 });
    });

    it("should handle duplicate properties", () => {
        source = { a: 1, b: 'string', c: { x: 2, y: 'complex' }, d: 'duplicate' };
        target = { a: 10, b: true, c: { x: 20, y: 'not complex' }, d: 'duplicate' };
        const result = overwritePropertiesOfTarget(source, target);
        expect(result).toEqual({ a: 1, b: 'string', c: { x: 2, y: 'complex' }, d: 'duplicate' });
    });

});

describe('mapPropertiesToObject', () => {
    let properties: Property[];
    beforeEach(() => {
        properties = [
            { name: 'observable1$', value: new BehaviorSubject<boolean>(false) },
            { name: 'observable2$', value: new BehaviorSubject<number>(7) },
            { name: 'property1', value: 'value1' },
            { name: 'property2', value: 'value2' }
        ];
    });

    it('should map properties to an object', () => {
        const object = mapPropertiesToObject(properties);
        expect(object.observable1$).toEqual(new BehaviorSubject<boolean>(false));
        expect(object.observable2$).toEqual(new BehaviorSubject<number>(7));
        expect(object.property1).toEqual('value1');
        expect(object.property2).toEqual('value2');
    });

    it('should return an empty object when properties array is empty', () => {
        const object = mapPropertiesToObject([]);
        expect(object).toEqual({});
    });
});


describe('findFieldValue', () => {
    const fieldName: string = 'mdmContractIdentifier';

    it('should return the value of the mdmContractIdentifier field on the top level object', () => {
        let obj: any = { mdmContractIdentifier: '123' };
        expect(findFieldValue(obj, fieldName)).toEqual('123');
    });

    it('should return the value of the mdmContractIdentifier field in a nested object', () => {
        let obj: any = { nested: { mdmContractIdentifier: '456' } };
        expect(findFieldValue(obj, fieldName)).toEqual('456');
    });

    it('should return the value of the first mdmContractIdentifier field it finds', () => {
        let obj: any = {
            mdmContractIdentifier: '123',
            nested: { mdmContractIdentifier: '456' }
        };
        expect(findFieldValue(obj, fieldName)).toEqual('123');
    });

    it('should return null if the mdmContractIdentifier field is not found', () => {
        let obj: any = {};
        expect(findFieldValue(obj, fieldName)).toBeNull();
    });

    it('should return null if the object has cyclic references', () => {
        let obj: any = {};
        obj.nested = {};
        obj.nested.nested = obj;
        expect(findFieldValue(obj, fieldName)).toBeNull();
    });

    it('should return the value of the mdmContractIdentifier field in a deeply nested object even with cyclic references', () => {
        let obj: any = {
            nested0: {},
            nested1: {
                nested2: {
                    nested3: {
                        nested4: {
                        }
                    }
                }
            },
            nested5: {
                nested5: {},
                nested6: {
                    mdmContractIdentifier: '789'
                }
            },
        };
        obj.nested5.nested5 = obj;
        obj.nested0.nested0 = obj.nested5;
        expect(findFieldValue(obj, fieldName)).toEqual('789');
    });
});

describe('isLastDayOfMonth', () => {
    it('should return true for the last day of a month', () => {
        const lastDayOfMonth = moment('2022-01-31');
        expect(isLastDayOfMonth(lastDayOfMonth)).toBe(true);
    });

    it('should return false for a day that is not the last day of a month', () => {
        const middleOfMonth = moment('2022-01-15');
        expect(isLastDayOfMonth(middleOfMonth)).toBe(false);
    });

    it('should return true for the last day of February in a leap year', () => {
        const lastDayOfFebruary = moment('2024-02-29');
        expect(isLastDayOfMonth(lastDayOfFebruary)).toBe(true);
    });

    it('should return false for the 28th day of February in a leap year', () => {
        const lastDayOfFebruary = moment('2024-02-28');
        expect(isLastDayOfMonth(lastDayOfFebruary)).toBe(false);
    });
}); 

export class SomeService {
    public firstMethod(): void {}
  
    public secondMethod(): void {}
  }

  describe('resetMockProvider', () => {
    let myService: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          providers: [MockProvider(SomeService)],
        }).compileComponents();
      });
  
    beforeEach(() => {
      ngMocks.autoSpy('jasmine');
      myService = TestBed.inject(SomeService) as any;
    });
  
    it('should reset the call count of all method stubs on the mock provider', () => {
      myService.firstMethod();
      myService.secondMethod();
      myService.secondMethod();
  
      expect(myService.firstMethod).toHaveBeenCalled();
      expect(myService.secondMethod).toHaveBeenCalledTimes(2);
  
      resetMockProvider(myService);
  
      expect(myService.firstMethod).not.toHaveBeenCalled();
      expect(myService.secondMethod).not.toHaveBeenCalled();
    });
  
    it('should not affect properties on the mock provider that are not method stubs', () => {
      myService.myProperty = 'hello';
  
      resetMockProvider(myService);
  
      expect(myService.myProperty).toBe('hello');
    });
  });