import { Provider } from "@angular/core";
import { Type, MockProvider } from "ng-mocks";

export function extractName(input: any): string {
    if (input == null) {
        return 'unknown';
    } else if (typeof input === 'string') {
        return 'string';
    } else if (typeof input === 'number') {
        return 'number';
    } else if (typeof input === 'boolean') {
        return 'boolean';
    } else if (input instanceof Date) {
        return 'Date';
    } else if (Array.isArray(input)) {
        return 'Array';
    } else {
        return Object.getPrototypeOf(input).constructor.name;
    }
}

export function isClass(input: any): boolean {
    try {
        return typeof input === 'object' && input.constructor !== undefined;
    } catch {
        return false;
    }
}

export function createMockProvider<T>(serviceType: Type<T>, mockData: any = {}): Provider {
    return MockProvider(serviceType, mockData);
}
