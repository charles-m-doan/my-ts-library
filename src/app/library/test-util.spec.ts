import { extractName } from "./test-util";

describe('extractName', () => {
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
    it('should return "Object" for object input', () => {
        expect(extractName({})).toEqual('Object');
    });
    it('should return "unknown" for other input', () => {
        expect(extractName(null)).toEqual('unknown');
    });
});
