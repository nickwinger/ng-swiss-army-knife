

export function cSharpTicks2Date(ticks: number): Date {
  // ticks are in nanotime; convert to microtime
  const ticksToMicrotime = ticks / 10000;

  // ticks are recorded from 1/1/1; get microtime difference from 1/1/1/ to 1/1/1970
  const epochMicrotimeDiff = 62135600400000; // Math.abs(new Date(0, 0, 1, 0, 0, 0, 0).setFullYear(1));

  // new date is ticks, converted to microtime, minus difference from epoch microtime
  const tickDate = new Date(ticksToMicrotime - epochMicrotimeDiff);

  return tickDate;
}

export function dateAddYears(date, years) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

export function dateSubstractYears(date, years) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() - years);
  return result;
}

export function dateAddMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function dateSubstractMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() - months);
  return result;
}

export function dateAddDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function dateSubstractDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

export function dateAddHours(date, hours) {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}

export function dateSubstractHours(date, hours) {
  const result = new Date(date);
  result.setHours(result.getHours() - hours);
  return result;
}

export function dateAddMinutes(date, minutes) {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}

export function dateSubstractMinutes(date, minutes) {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() - minutes);
  return result;
}

export function dateAddSeconds(date, seconds) {
  const result = new Date(date);
  result.setSeconds(result.getSeconds() + seconds);
  return result;
}

export function dateSubstractSeconds(date, seconds) {
  const result = new Date(date);
  result.setSeconds(result.getSeconds() - seconds);
  return result;
}

export function dateAddMilliSeconds(date, milliseconds) {
  const result = new Date(date);
  result.setMilliseconds(result.getMilliseconds() + milliseconds);
  return result;
}

export function dateSubstractMilliSeconds(date, milliseconds) {
  const result = new Date(date);
  result.setMilliseconds(result.getMilliseconds() - milliseconds);
  return result;
}

export class DateHelper {
  static cSharpTicks2Date = cSharpTicks2Date;
  static dateAddYears = dateAddYears;
  static dateSubstractYears = dateSubstractYears;
  static dateAddMonths = dateAddMonths;
  static dateSubstractMonths = dateSubstractMonths;
  static dateAddDays = dateAddDays;
  static dateSubstractDays = dateSubstractDays;
  static dateAddHours = dateAddHours;
  static dateSubstractHours = dateSubstractHours;
  static dateAddMinutes = dateAddMinutes;
  static dateSubstractMinutes = dateSubstractMinutes;
  static dateAddSeconds = dateAddSeconds;
  static dateSubstractSeconds = dateSubstractSeconds;
  static dateAddMilliSeconds = dateAddMilliSeconds;
  static dateSubstractMilliSeconds = dateSubstractMilliSeconds;
}
