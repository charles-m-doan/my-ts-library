import { Provider } from "@angular/core";
import { Type, MockProvider } from "ng-mocks";
import { cloneDeep } from 'lodash';
import { DEFAULT_MOCK_PROPERTIES_MAP } from "./mock-default-properties-map";

export interface Property {
    name: string;
    value: any;
}

export function createMockProvider<T>(providerType: Type<T>, mockData: any = {}): Provider {
    const assembledData: any = assembleMockData(providerType, mockData);
    return MockProvider(providerType, assembledData);
}

export function assembleMockData<T>(providerType: Type<T>, mockData: any = {}): any {
    // Generate object containing inferred properties (may or may not succeed at generating much)
    const inferredProperties: Property[] = getInferredPropertiesForProvider(providerType);
    const mappedInferredProperties: any = mapPropertiesToObject(inferredProperties);

    // Generate object containing default properties (should return only and exactly what is defined)
    const defaultProperties: Property[] = getDefaultPropertiesForProvider(providerType);
    const mappedDefaultProperties: any = mapPropertiesToObject(defaultProperties);

    // Map properties to assembledData in the proper priority order, in cascading fashion.
    const assembledData: any = {};
    overwritePropertiesOfTarget(mappedInferredProperties, assembledData);
    overwritePropertiesOfTarget(mappedDefaultProperties, assembledData);
    overwritePropertiesOfTarget(mockData, assembledData);

    return assembledData;
}

export function getDefaultPropertiesForProvider<T>(type: Type<T>): Property[] {
    const properties: Property[] = DEFAULT_MOCK_PROPERTIES_MAP.get(type) || [];
    return cloneDeep(properties);
}

export function getInferredPropertiesForProvider<T>(type: Type<T>): Property[] {
    return [];
}

export function mapPropertiesToObject(properties: Property[]): any {
    return {};
}

export function overwritePropertiesOfTarget(source: any, target: any): any {
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}



// --------------------------------------------------------------------------------------------------------
// ----- MAY OR MAY NOT GET USED --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

export function extractPropertyTypeName(input: any): string {
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