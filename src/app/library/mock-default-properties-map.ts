import { BehaviorSubject } from "rxjs";
import { createExampleUser } from "./examples/example-generators";
import { ExampleService } from "./examples/example.service";
import { TransactionService } from "./examples/transaction.service";
import { UserService } from "./examples/user.service";
import { Property } from "./test-util";

export const DEFAULT_MOCK_PROPERTIES_MAP: Map<{ new(...args: any[]): any }, Property[]> = createMockDefaultPropertiesMap();

export function createMockDefaultPropertiesMap(): Map<{ new(...args: any[]): any }, Property[]> {
    let map = new Map<{ new(...args: any[]): any }, Property[]>();

    map.set(ExampleService, [
        { name: 'testStr', value: '' },
        { name: 'testBool', value: false },
        { name: 'observable2$', value: new BehaviorSubject(0) }
    ]);

    map.set(TransactionService, [
        { name: 'teller$', value: new BehaviorSubject({}) }
    ]);

    map.set(UserService, [
        { name: 'id', value: '3' },
        { name: 'user$', value: new BehaviorSubject(createExampleUser()) }
    ]);

    return map;
}