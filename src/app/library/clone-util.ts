
import { cloneDeep } from 'lodash';

export function clone<T>(object: T): T {
    return cloneDeep(object);
}