/**
 * Merges 2 objects in regards that properties that are not found on the
 * mainObject are looked up on the extendedObject
 * @param mainObject Properties are first read here. if e.g. toString()
 * exists on both objects it will be returned from this one
 * @param extendedObject This is the second object that extends the mainObject.
 * Properties not found on the  mainObject are read from this one
 */
export function createAutoIndexer(mainObject: any, extendedObject: any) {
  const handler = {
    get: (obj, prop) => {
      return prop in mainObject ?
        mainObject[prop] :
        extendedObject[prop];
    },
    set: (obj, prop, value) => {
      return prop in mainObject ?
        mainObject[prop] = value :
        extendedObject[prop] = value;
    }
  };

  return new Proxy(mainObject, handler);
}

/***
 * Checks if the given object has a specific constructor name
 * e.g: hasConstructorName(new Date(), 'Date')
 * @param obj the object to check for if it has the correct constructor name
 */
export function hasConstructorName(obj: object, constructorName: string): boolean {
  if (typeof obj !== 'object') {
    return false;
  }

  if (obj.constructor.name !== constructorName) {
    return false;
  }

  return true;
}

export class ObjectHelper {
  static hasConstructorName = hasConstructorName;
  static createAutoIndexer = createAutoIndexer;
}
