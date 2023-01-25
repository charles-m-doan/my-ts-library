import { Provider } from "@angular/core";
import { Type, MockProvider } from "ng-mocks";
import { cloneDeep } from 'lodash';
import { DEFAULT_MOCK_PROPERTIES_MAP } from "./mock-default-properties-map";
import { Moment } from "moment";

export interface Property {
    name: string;
    value: any;
}

export function createMockProvider<T>(providerType: Type<T>, mockData: any = {}): Provider {
    const assembledData: any = assembleMockData(providerType, mockData);
    return MockProvider(providerType, assembledData);
}

export function assembleMockData<T>(providerType: Type<T>, mockData: any = {}): any {
    const defaultProperties: Property[] = getDefaultPropertiesForProvider(providerType);
    const mappedDefaultProperties: any = mapPropertiesToObject(defaultProperties);
    const assembledData: any = {};
    overwritePropertiesOfTarget(mappedDefaultProperties, assembledData);
    overwritePropertiesOfTarget(mockData, assembledData);
    return assembledData;
}

export function getDefaultPropertiesForProvider<T>(type: Type<T>): Property[] {
    const properties: Property[] = DEFAULT_MOCK_PROPERTIES_MAP.get(type) || [];
    return cloneDeep(properties);
}

export function mapPropertiesToObject(properties: Property[]): any {
    const object: any = {};
    properties.forEach(property => {
        object[property.name] = property.value;
    });
    return object;
}

export function overwritePropertiesOfTarget(source: any, target: any): any {
    for (const key in source) {
        target[key] = source[key];
    }
    return target;
}


export function findFieldValue(obj, fieldName, searched = new Set()) {
    if (searched.has(obj)) {
        return null;
    }
    searched.add(obj);

    if (obj.hasOwnProperty(fieldName)) {
        return obj[fieldName];
    }

    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            let result = findFieldValue(obj[key], fieldName, searched);
            if (result) {
                return result;
            }
        }
    }

    return null;
}

export function isLastDayOfMonth(date: Moment): boolean {
    return date.isSame(date.clone().endOf('month'), 'day');
}