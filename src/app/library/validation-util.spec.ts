import { ValidationUtil } from './validation-util';

describe('ValidationUtil', () => {

  describe('getListOfDefinedProperties', () => {

    it('should return an array of PropertyDef objects for all properties of the object and its nested objects', () => {
      const obj: any = {
        a: {
          b1: { c: null },
          b2: { c: '' },
          b3: { c: 5 }
        }
      };
      const propertyDefs = ValidationUtil.getListOfDefinedProperties(obj);
      expect(propertyDefs).toEqual(jasmine.arrayContaining([
        { path: '.a', defined: true },
        { path: '.a.b1', defined: true },
        { path: '.a.b2', defined: true },
        { path: '.a.b3', defined: true },
        { path: '.a.b1.c', defined: false },
        { path: '.a.b2.c', defined: true },
        { path: '.a.b3.c', defined: true }
      ]));
    });

    it('should return an empty array for an empty object', () => {
      const obj: any = {};
      const propertyDefs = ValidationUtil.getListOfDefinedProperties(obj);
      expect(propertyDefs).toEqual([]);
    });

    it('should return an array with a single PropertyDef object for a flat object with a single property', () => {
      const obj: any = { a: 'foo' };
      const propertyDefs = ValidationUtil.getListOfDefinedProperties(obj);
      expect(propertyDefs).toEqual([{ path: '.a', defined: true }]);
    });

    it('should handle circular references', () => {
      const obj: any = {};
      obj.a = obj;
      const propertyDefs = ValidationUtil.getListOfDefinedProperties(obj);
      expect(propertyDefs).toEqual([{ path: '.a', defined: true }]);
    });
  });

  describe('areNestedPropertiesValid', () => {
    it('should return true for an empty object', () => {
      const obj = {};
      const result = ValidationUtil.areNestedPropertiesValid(obj);
      expect(result).toBe(true);
    });

    it('should return true for an object with all defined properties', () => {
      const obj = {
        a: 1,
        b: 2,
        c: {
          d: 3,
          e: 4
        }
      };
      const result = ValidationUtil.areNestedPropertiesValid(obj);
      expect(result).toBe(true);
    });

    it('should return false for an object with a null property', () => {
      const obj = {
        a: 1,
        b: 2,
        c: null
      };
      const result = ValidationUtil.areNestedPropertiesValid(obj);
      expect(result).toBe(false);
    });

    it('should return false for an object with an undefined property', () => {
      const obj = {
        a: 1,
        b: 2,
        c: undefined
      };
      const result = ValidationUtil.areNestedPropertiesValid(obj);
      expect(result).toBe(false);
    });

    it('should return true for an object with an undefined property that is ignored', () => {
      const obj = {
        a: 1,
        b: 2,
        c: undefined
      };
      const ignoreProps = ['.c'];
      const result = ValidationUtil.areNestedPropertiesValid(obj, ignoreProps);
      expect(result).toBe(true);
    });

    it('should return true for an object with a null property that is ignored', () => {
      const obj = {
        a: 1,
        b: 2,
        c: null
      };
      const ignoreProps = ['.c'];
      const result = ValidationUtil.areNestedPropertiesValid(obj, ignoreProps);
      expect(result).toBe(true);
    });

    it('should return true for an object with a nested object that has all defined properties', () => {
      const obj = {
        a: 1,
        b: 2,
        c: {
          d: 3,
          e: 4
        }
      };
      const result = ValidationUtil.areNestedPropertiesValid(obj);
      expect(result).toBe(true);
    });

    it('should return false for an object with a nested object that has a null property', () => {
      const obj = {
        a: 1,
        b: 2,
        c: {
          d: 3,
          e: null
        }
      };
      const result = ValidationUtil.areNestedPropertiesValid(obj);
      expect(result).toBe(false);
    });

    it('should return false for an object with a nested object that has an undefined property', () => {
      const obj = {
        a: 1,
        b: 2,
        c: {
          d: 3,
          e: undefined
        }
      };
      const result = ValidationUtil.areNestedPropertiesValid(obj);
      expect(result).toBe(false);
    });

    it('should return true for an object with a nested object that has an undefined property that is ignored', () => {
      const obj = {
        a: 1,
        b: 2,
        c: {
          d: 3,
          e: undefined
        }
      };
      const ignoreProps = ['.c.e'];
      const result = ValidationUtil.areNestedPropertiesValid(obj, ignoreProps);
      expect(result).toBe(true);
    });

    it('should return true for an object with a nested object that has a null property that is ignored', () => {
      const obj = {
        a: 1,
        b: 2,
        c: {
          d: 3,
          e: null
        }
      };
      const ignoreProps = ['.c.e'];
      const result = ValidationUtil.areNestedPropertiesValid(obj, ignoreProps);
      expect(result).toBe(true);
    });
  });

});
