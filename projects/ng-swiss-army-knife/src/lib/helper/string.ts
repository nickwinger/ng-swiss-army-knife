/**
 * Padding the string left
 * @param s the string which to pad
 * @param length the length the string should be padded to
 * @param padChar the char which to use to fill up the string
 */
export function padLeft(s: string, length: number, padChar: string): string {
  while (s.length < length)
    s = padChar + s;

  return s;
}

/**
 * Padding the string right
 * @param s the string which to pad
 * @param length the length the string should be padded to
 * @param padChar the char which to use to fill up the string
 */
export function padRight(s: string, length: number, padChar: string): string {
  while (s.length < length)
    s += padChar;

  return s;
}

/**
 * Replace all occurences in the string
 * @param str The string in which to replace something
 * @param find The string to replace
 * @param replace The string that will replace the find string
 */
export function replaceAll(str: string, find: string, replace: string): string {
  let ret = '';
  for (const ch of str) {
    if (ch === find) {
      ret += replace;
    } else {
      ret += ch;
    }
  }

  return ret;
}

export class StringHelper {
  static replaceAll = replaceAll;
  static padLeft = padLeft;
  static padRight = padRight;
}
