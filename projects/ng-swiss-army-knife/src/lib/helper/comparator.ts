import * as stringify from 'json-stable-stringify';

/***
 * Compares 2 objects if they are equal by converting to json and comparing the
 * string So this method does not compare the reference but all the values
 * inside
 * @param obj1 First object to compare
 * @param obj2 Second object to compare
 */
export function objectIsEqual(obj1: any, obj2: any): boolean {
  const json1 = stringify(obj1);
  const json2 = stringify(obj2);

  return json1 === json2;
}

/***
 * Compares 2 dates, dates can also be undefined or null
 * if both are null or undefined they are also the same...
 * @param date1
 * @param date2
 */
export function isDateEqual(date1: Date, date2: Date): boolean {
  if (!date1 && !date2) {
    return true;
  }
  if (!date1 || !date2) {
    return false;
  }
  if (date1 instanceof Date && date2 instanceof Date) {
    return date1.toISOString() === date2.toISOString();
  }

  throw new Error('isDateEqual: date1 or date2 must be unset or of type Date');
}

export class ComparatorHelper {
  static objectIsEqual = objectIsEqual;
  static isDateEqual = isDateEqual;
}
