import { BehaviorSubject } from "rxjs";
import { createExamplePersonal, createExampleProfile } from "./examples/example-generators";
import { Personal } from "./examples/models";
import { Profile } from "./examples/profile";
import { extractPropertyTypeName, isClass, mapPropertiesToObject, overwritePropertiesOfTarget, Property } from "./test-util";

describe('extractName', () => {
    it('should return "unknown" for null input', () => {
        expect(extractPropertyTypeName(null)).toEqual('unknown');
    });

    it('should return "unknown" for undefined input', () => {
        expect(extractPropertyTypeName(null)).toEqual('unknown');
    });

    it('should return "Object" for {} input', () => {
        expect(extractPropertyTypeName({})).toEqual('Object');
    });

    it('should return "string" for string input', () => {
        expect(extractPropertyTypeName('hello')).toEqual('string');
    });

    it('should return "number" for number input', () => {
        expect(extractPropertyTypeName(123)).toEqual('number');
    });

    it('should return "boolean" for boolean input', () => {
        expect(extractPropertyTypeName(true)).toEqual('boolean');
    });

    it('should return "Date" for Date input', () => {
        expect(extractPropertyTypeName(new Date())).toEqual('Date');
    });

    it('should return "Array" for array input', () => {
        expect(extractPropertyTypeName([1, 2, 3])).toEqual('Array');
    });

    it('should return "Object" for Personal input', () => {
        const personal: Personal = createExamplePersonal();
        expect(extractPropertyTypeName(personal)).toEqual('Object');
    });

    it('should return "Profile" for Profile input', () => {
        const profile: Profile = createExampleProfile();
        expect(extractPropertyTypeName(profile)).toEqual('Profile');
    });
});

describe('isClass', () => {
    it('should return false for null input', () => {
        expect(isClass(null)).toBe(false);
    });

    it('should return false for undefined input', () => {
        expect(isClass(undefined)).toBe(false);
    });

    it('should return false for string input', () => {
        expect(isClass('hello')).toBe(false);
    });

    it('should return false for number input', () => {
        expect(isClass(123)).toBe(false);
    });

    it('should return false for boolean input', () => {
        expect(isClass(true)).toBe(false);
    });

    it('should return false for object created with Object.create(null)', () => {
        const obj = Object.create(null);
        expect(isClass(obj)).toBe(false);
    });

    it('should return true for object created with {}', () => {
        const obj = {};
        expect(isClass(obj)).toBe(true);
    });

    it('should return true for instance of a class', () => {
        class MyClass { }
        const obj = new MyClass();
        expect(isClass(obj)).toBe(true);
    });
});

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
