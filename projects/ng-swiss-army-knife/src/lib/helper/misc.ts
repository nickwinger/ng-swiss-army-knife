import { AsyncSubject, Observable } from 'rxjs';
import * as stringify from 'json-stable-stringify';

console.log('EUDTA', stringify);
/**
 * Escapes a html string to be safe, for example to show inside HTML
 * @param unsafe The HTML string which to escape
 */
export function escapeXml(unsafeHTML: string): string {
  return unsafeHTML.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

/**
 * Checks if a string is a number
 * @param ch The string which to check for number
 */
export function isNumber(ch: string): boolean {
  return !isNaN(parseInt(ch));
}

/**
 * Waits for a property on an object to be not undefined
 * And returns this property in an observable
 * @param obj The object which holds the property
 * @param (obj: TObject) => TProperty propertyAccessor the property accessor
 *   function
 * @param (prop: TProperty) => boolean the default checks if the property is
 *   not undefined to be valid and finish waiting. Here you can provide a
 *   custom function, e.g. also checking if it is not null
 * @param number retries How many 100 milliseconds it should wait for the
 *   property
 * @returns Observable<TProperty>
 */
export function waitForProperty<TObject, TProperty>
(obj: TObject, propertyAccessor: (obj: TObject) => TProperty,
 isPropertyValidFunc: (prop: TProperty) => boolean = prop => prop !== undefined,
 retries: number = 50): Observable<TProperty> {
  let retry = 0;
  const returnSubject = new AsyncSubject<TProperty>();

  const interval = setInterval(() => {
    const property = propertyAccessor(obj);
    if (isPropertyValidFunc(property)) {
      clearInterval(interval);
      returnSubject.next(property);
      returnSubject.complete();
    }
    retry++;

    if (retry > retries) {
      clearInterval(interval);
      returnSubject.error('Property still undefined after ' + retries + ' retries');
      returnSubject.complete();
    }

  }, 100);

  return returnSubject.asObservable();
}

/**
 * Sets a css class on the document body if it does not already exists
 * @param cssClass The CSS class which to set on the document body
 */
export function setBodyCssClass(cssClass: string) {
  if (document.body.className.indexOf(cssClass) === -1)
    document.body.className += ' ' + cssClass;
}

/**
 * Removes a css class from the document body
 * @param cssClass The CSS Class which to remove
 */
export function removeBodyCssClass(cssClass: string) {
  document.body.className = document.body.className.replace(cssClass, '');
}

/**
 * Toggles a CSS class on the document body
 * @param cssClass The class which to toggle on the document body
 */
export function toggleBodyCssClass(cssClass: string) {
  if (document.body.className.indexOf(cssClass) === -1)
    document.body.className += ' ' + cssClass;
  else
    document.body.className = document.body.className.replace(cssClass, '');
}

/**
 * Handy function if you want to check both null and undefined
 * @param value The value which to check for null or undefined
 */
export function isNullOrUndefined(value: any): boolean {
  return value === undefined || value === null;
}

/**
 * Checks if an object is empty, meaning it has to properties
 * @param obj The object which to check for empty
 */
export function isObjectEmpty(obj): boolean {
  if (obj === undefined || obj === null) {
    return true;
  }
  return Object.keys(obj).length === 0;
}

/**
 * Takes an object converts it to json and then URI-Encodes it to be used in a
 * URL
 * @param obj The object which to encode
 */
export function encodeURIJson(obj: any): string {
  const json = JSON.stringify(obj);
  return encodeURIComponent(json);
}

/**
 * Takes an URI value which is a json string and converts it to a javascript
 * object
 * @param encodedJson The URIEncoded JSON
 */
export function decodeURIJson<T>(encodedJson: string): T {
  const json = decodeURIComponent(encodedJson);
  return JSON.parse(json);
}

/***
 * Clones an object via json stringify and json parse (so classes with
 * functions won't work here...) However plain objects and arrays are deep
 * cloned, this is why this method exists Also important: Because of deep
 * cloning objects in arrays are also cloned, so perfect for duplicating an
 * array without having the same reference inside Most useful also for
 * immutable Redux-State
 * @param obj The object to clone
*/
export function jsonDeepClone<T>(obj: T): T {
  const json = JSON.stringify(obj);
  return JSON.parse(json);
}

/***
 * Compares 2 objects if they are equal by converting to json and comparing the
 * string So this method does not compare the reference but all the values
 * inside
 * @param obj1 First object to compare
 * @param obj2 Second object to compare
 */
export function jsonIsEqual(obj1: any, obj2: any): boolean {
  const json1 = stringify(obj1);
  const json2 = stringify(obj2);

  return json1 === json2;
}

/***
 * Used to preload image. Returns a stream containing the Html Image Element on
 * success or the error in case of an error
 * @param url The image src url to load
 */
export function loadImage(url: string): Observable<HTMLImageElement> {
  return new Observable(subscriber => {
    const image = new Image();
    image.onload = (ev: Event) => {
      subscriber.next(image);
      subscriber.complete();
    };
    image.onerror = (ev: ErrorEvent) => {
      subscriber.next(ev.error);
      subscriber.complete();
    };
    image.src = url;
  });
}

/***
 * Javascript has no methode for rounding a number to certain amount of digits,
 * so here it is
 * @param num The number which to round
 * @param digits How many digits after the comma
 */
export function roundNumber(num: number, digits: number = 2): number {
  const digitOperator = '1' + '0'.repeat(digits);
  return Math.round(num * +digitOperator) / +digitOperator;
}

export function createThumbnailFromBase64Image(base64Image: string, targetSize: number
                                               ): Observable<string> {
  return new Observable<string>(subscriber => {
    const img = new Image();

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = canvas.height = targetSize;

      ctx.drawImage(
        img,
        width > height ? (width - height) / 2 : 0,
        height > width ? (height - width) / 2 : 0,
        width > height ? height : width,
        width > height ? height : width,
        0, 0,
        targetSize, targetSize
      );

      subscriber.next(canvas.toDataURL());
      subscriber.complete();
    };

    img.src = base64Image;
  });
}

/**
 * Safe calls a function, meaning if the function does not exist on the object
 * or the object is null/undefined it does not throw an error, but return
 * the defaultValue
 * @param obj The object which holds the function to call
 * @param functionToCallGetterFuncOrName a getter function to return the
 * functionToCall or the name of the function as a string
 * @param defaultValue an optional default value to return if the function
 * cannot be called
 * @param params optional parameters for the function
 */
type functionGetter<T> = (obj: T) => Function;
export function safeCall<TObject, TReturnValue>(
  obj: TObject,
  functionToCallGetterFuncOrName: string | functionGetter<TObject>,
  defaultValue: TReturnValue = undefined,
  ...params): TReturnValue {
  if (!obj) {
    return defaultValue;
  }

  const functionToCall = typeof functionToCallGetterFuncOrName === 'string' ?
    obj[functionToCallGetterFuncOrName] : functionToCallGetterFuncOrName(obj);

  if (!functionToCall) {
    return defaultValue;
  }

  return functionToCall.call(obj, ...params);
}

export class MiscHelper {
  static safeCall = safeCall;
  static createThumbnailFromBase64Image = createThumbnailFromBase64Image;
  static escapeXml = escapeXml;
  static isNumber = isNumber;
  static waitForProperty = waitForProperty;
  static setBodyCssClass = setBodyCssClass;
  static removeBodyCssClass = removeBodyCssClass;
  static toggleBodyCssClass = toggleBodyCssClass;
  static isNullOrUndefined = isNullOrUndefined;
  static isObjectEmpty = isObjectEmpty;
  static encodeURIJson = encodeURIJson;
  static decodeURIJson = decodeURIJson;
  static jsonDeepClone = jsonDeepClone;
  static jsonIsEqual = jsonIsEqual;
  static roundNumber = roundNumber;
  static loadImage = loadImage;
}
