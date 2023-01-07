import { createExamplePersonal, createExampleProfile } from "./examples/example-generators";
import { Personal } from "./examples/models";
import { Profile } from "./examples/profile";
import { extractName, isClass } from "./test-util";

describe('extractName', () => {
    it('should return "unknown" for null input', () => {
        expect(extractName(null)).toEqual('unknown');
    });

    it('should return "unknown" for undefined input', () => {
        expect(extractName(null)).toEqual('unknown');
    });

    it('should return "Object" for {} input', () => {
        expect(extractName({})).toEqual('Object');
    });

    it('should return "string" for string input', () => {
        expect(extractName('hello')).toEqual('string');
    });

    it('should return "number" for number input', () => {
        expect(extractName(123)).toEqual('number');
    });

    it('should return "boolean" for boolean input', () => {
        expect(extractName(true)).toEqual('boolean');
    });

    it('should return "Date" for Date input', () => {
        expect(extractName(new Date())).toEqual('Date');
    });

    it('should return "Array" for array input', () => {
        expect(extractName([1, 2, 3])).toEqual('Array');
    });

    it('should return "Object" for Personal input', () => {
        const personal: Personal = createExamplePersonal();
        expect(extractName(personal)).toEqual('Object');
    });

    it('should return "Profile" for Profile input', () => {
        const profile: Profile = createExampleProfile();
        expect(extractName(profile)).toEqual('Profile');
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
