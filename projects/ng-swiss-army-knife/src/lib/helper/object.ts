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

export class ObjectHelper {
  static createAutoIndexer = createAutoIndexer;
}
