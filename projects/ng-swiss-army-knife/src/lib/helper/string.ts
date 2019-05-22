import { escapeXml } from './misc';

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

export class StringHelper {
  static padLeft = padLeft;
  static padRight = padRight;
}
