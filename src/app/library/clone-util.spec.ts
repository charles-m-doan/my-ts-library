import { clone } from "./clone-util";
import { TransactionService } from "./examples/transaction.service";
import { UserService } from "./examples/user.service";

describe('clone', () => {
    it('should return a deep copy of an object', () => {
        let obj = {
            a: 1,
            b: '2',
            c: true,
            d: [1, 2, 3],
            e: { f: 'g' }
        };
        let copy = clone(obj);

        expect(copy).toEqual(obj);
        expect(copy).not.toBe(obj);
        expect(copy.e).not.toBe(obj.e);
        expect(copy.d).not.toBe(obj.d);
    });

    it('should return a deep copy of an array', () => {
        let arr = [1, 2, 3, [4, 5, 6], { a: 'b' }];
        let copy = clone(arr);

        expect(copy).toEqual(arr);
        expect(copy).not.toBe(arr);
        expect(copy[3]).not.toBe(arr[3]);
        expect(copy[4]).not.toBe(arr[4]);
    });

    it('should return a deep copy of a primitive value', () => {
        let num = 123;
        let copy = clone(num);

        expect(copy).toBe(num);
    });

    it('should make a deep copy of a simple object and preserve the class type', () => {
        class TestClass {
            public prop: string;

            constructor(prop: string) {
                this.prop = prop;
            }
        }

        const original = new TestClass('test');
        const copy = clone(original);

        expect(copy).toEqual(original);
        expect(copy).not.toBe(original);
        expect(copy instanceof TestClass).toBe(true);
    });

    it('should make a deep copy of an object with nested objects and preserve the class types', () => {
        class TestClass {
            public prop: string;
            public nested: NestedTestClass;

            constructor(prop: string, nested: NestedTestClass) {
                this.prop = prop;
                this.nested = nested;
            }
        }

        class NestedTestClass {
            public prop: number;

            constructor(prop: number) {
                this.prop = prop;
            }
        }

        const original = new TestClass('test', new NestedTestClass(42));
        const copy = clone(original);

        expect(copy).toEqual(original);
        expect(copy).not.toBe(original);
        expect(copy instanceof TestClass).toBe(true);
        expect(copy.nested instanceof NestedTestClass).toBe(true);
    });

    it('should make a deep copy of an array and preserve the class types of its elements', () => {
        class TestClass {
            public prop: string;

            constructor(prop: string) {
                this.prop = prop;
            }
        }

        const original = [new TestClass('test1'), new TestClass('test2')];
        const copy = clone(original);

        expect(copy).toEqual(original);
        expect(copy).not.toBe(original);
        expect(copy[0] instanceof TestClass).toBe(true);
        expect(copy[1] instanceof TestClass).toBe(true);
    });

    it('should make a deep copy of an object with a circular reference and preserve the class types', () => {
        class TestClass {
            public prop: string;
            public self: TestClass;

            constructor(prop: string, self: TestClass) {
                this.prop = prop;
                this.self = self;
            }
        }

        const original = new TestClass('test', null);
        original.self = original;
        const copy = clone(original);

        expect(copy).toEqual(original);
        expect(copy).not.toBe(original);
        expect(copy instanceof TestClass).toBe(true);
        expect(copy.self).toBe(copy);
    });

    it('should return the same object if it is null or a primitive type', () => {
        expect(clone(null)).toBe(null);
        expect(clone(undefined)).toBe(undefined);
        expect(clone(42)).toBe(42);
        expect(clone('test')).toBe('test');
        expect(clone(true)).toBe(true);
    });

    it('should make a deep copy of an object with a complex structure and preserve the class types', () => {
        interface NestedInterface1 {
            field1: string;
            field2: number;
            field3: NestedClass1;
        }

        interface NestedInterface2 {
            field1: boolean;
            field2: string;
        }

        class NestedClass1 {
            constructor(public field1: number, public field2: string) { };
        }

        class NestedClass2 {
            constructor(public field1: string, public field2: boolean, public field3: NestedInterface2) { };
        }

        interface ParentInterface {
            field1: string;
            field2: number;
            field3: boolean;
            field4: string;
            field5: number;
            field6: string;
            field7: boolean;
            field8: string;
            nestedInterface1: NestedInterface1;
            nestedInterface2: NestedInterface2;
            nestedClass1: NestedClass1;
            nestedClass2: NestedClass2;
        }

        const original: ParentInterface = {
            field1: 'value1',
            field2: 10,
            field3: true,
            field4: 'value4',
            field5: 20,
            field6: 'value6',
            field7: false,
            field8: 'value8',
            nestedInterface1: {
                field1: 'nestedValue1',
                field2: 100,
                field3: new NestedClass1(-7, 'asdfag')
            },
            nestedInterface2: {
                field1: true,
                field2: 'nestedValue4'
            },
            nestedClass1: new NestedClass1(15, 'cats'),
            nestedClass2: new NestedClass2('arhehadfhah', true, {
                field1: false,
                field2: 'nestedValue5'
            })
        };

        const copy = clone(original);

        expect(copy).toEqual(original);
        expect(JSON.stringify(copy)).toEqual(JSON.stringify(original));
        expect(copy).not.toBe(original);
        expect(copy.nestedInterface1).toEqual(original.nestedInterface1);
        expect(copy.nestedInterface1).not.toBe(original.nestedInterface1);
        expect(copy.nestedInterface2).toEqual(original.nestedInterface2);
        expect(copy.nestedInterface2).not.toBe(original.nestedInterface2);
        expect(copy.nestedClass1).toEqual(original.nestedClass1);
        expect(copy.nestedClass1).not.toBe(original.nestedClass1);
        expect(copy.nestedClass2).toEqual(original.nestedClass2);
        expect(copy.nestedClass2).not.toBe(original.nestedClass2);
        expect(copy.nestedInterface1.field3).toEqual(original.nestedInterface1.field3);
        expect(copy.nestedInterface1.field3).not.toBe(original.nestedInterface1.field3);
        expect(copy.nestedClass2.field3).toEqual(original.nestedClass2.field3);
        expect(copy.nestedClass2.field3).not.toBe(original.nestedClass2.field3);
    });

    it('should make a deep copy of a service with dependencies, preserving types', () => {
        const transactionService: TransactionService = new TransactionService();
        const original: UserService = new UserService(transactionService);

        const copy = clone(original);

        expect(copy).toEqual(original);
        expect(copy).not.toBe(original);
        expect(copy instanceof UserService).toBe(true);

        expect(copy['transactionService']).toEqual(transactionService);
        expect(copy['transactionService']).not.toBe(transactionService);
        expect(copy['transactionService'] instanceof TransactionService).toBe(true);
    });
});
