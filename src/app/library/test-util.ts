export function extractName(obj: any): string {
    if (typeof obj === 'string') {
        return 'string';
    } else if (typeof obj === 'number') {
        return 'number';
    } else if (typeof obj === 'boolean') {
        return 'boolean';
    } else if (obj instanceof Date) {
        return 'Date';
    } else if (obj instanceof Array) {
        return 'Array';
    } else if (obj instanceof Object) {
        return 'Object';
    } else {
        return 'unknown';
    }
}
