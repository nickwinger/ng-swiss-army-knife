

export function cSharpTicks2Date(ticks: number): Date {
  // ticks are in nanotime; convert to microtime
  const ticksToMicrotime = ticks / 10000;

  // ticks are recorded from 1/1/1; get microtime difference from 1/1/1/ to 1/1/1970
  const epochMicrotimeDiff = 62135600400000; // Math.abs(new Date(0, 0, 1, 0, 0, 0, 0).setFullYear(1));

  // new date is ticks, converted to microtime, minus difference from epoch microtime
  const tickDate = new Date(ticksToMicrotime - epochMicrotimeDiff);

  return tickDate;
}

export class DateHelper {
  static cSharpTicks2Date = cSharpTicks2Date;
}
