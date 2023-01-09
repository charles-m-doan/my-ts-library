export interface PropertyDef {
    path: string;
    defined: boolean;
}

export class ValidationUtil {

    public static areNestedPropertiesValid(obj: any, ignoreProps: string[] = []): boolean {
        const propertyDefs: PropertyDef[] = this.getListOfDefinedProperties(obj);
        // Remove the PropertyDef objects where "path" matches one of the strings in "ignoreProps"
        const filteredPropertyDefs: PropertyDef[] = propertyDefs.filter(def => !ignoreProps.includes(def.path));
        // Return true if every remaining PropertDef has "defined" equal to true, else return false
        return filteredPropertyDefs.every(def => def.defined);
    }

    public static getListOfDefinedProperties(obj: any, visitedObjects: Set<any> = new Set()): PropertyDef[] {
        const propertyDefs: PropertyDef[] = [];
        if (!!obj) {
            // Add the current object to the visited objects set to avoid circular references
            visitedObjects.add(obj);

            for (const prop of Object.keys(obj)) {
                // Check if the property is defined
                const isDefined: boolean = (obj[prop] !== null && obj[prop] !== undefined);
                // Add the property to the propertyDefs array
                propertyDefs.push({
                    path: `.${prop}`,
                    defined: isDefined
                });
                // If the property is an object and we haven't visited it before,
                // get the defined properties of the nested object
                if (typeof obj[prop] === 'object' && !visitedObjects.has(obj[prop])) {
                    const nestedPropertyDefs = this.getListOfDefinedProperties(obj[prop], visitedObjects);
                    // Prefix the paths of the nested properties with the current property's path
                    nestedPropertyDefs.forEach(nestedDef => {
                        nestedDef.path = `${propertyDefs[propertyDefs.length - 1].path}${nestedDef.path}`;
                    });
                    // Add the nested properties to the propertyDefs array
                    propertyDefs.push(...nestedPropertyDefs);
                }
            }
        }
        return propertyDefs;
    }
}
