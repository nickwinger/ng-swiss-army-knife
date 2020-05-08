import { TestBed } from '@angular/core/testing';
import {
  dateAddDays, dateAddHours, dateAddMinutes, dateAddMonths, dateAddSeconds, dateAddYears, dateSubstractDays, isDate, isNow, isToday,
  isYesterday
} from './date';

describe('DateHelper', () => {
  beforeEach(() => TestBed.configureTestingModule({
  }));

  it('should add 40 years to date', () => {
    const date = new Date(2020, 0, 11, 12, 12, 12, 12);
    const newDate = dateAddYears(date, 40);

    expect(newDate.getFullYear()).toBe(2060);
    expect(newDate.getMonth()).toBe(0);
    expect(newDate.getDate()).toBe(11);
    expect(newDate.getHours()).toBe(12);
    expect(newDate.getMinutes()).toBe(12);
    expect(newDate.getSeconds()).toBe(12);
    expect(newDate.getMilliseconds()).toBe(12);
  });

  it('should add 14 months to date', () => {
    const date = new Date(2020, 0, 11, 12, 12, 12, 12);
    const newDate = dateAddMonths(date, 14);

    expect(newDate.getFullYear()).toBe(2021);
    expect(newDate.getMonth()).toBe(2);
    expect(newDate.getDate()).toBe(11);
    expect(newDate.getHours()).toBe(12);
    expect(newDate.getMinutes()).toBe(12);
    expect(newDate.getSeconds()).toBe(12);
    expect(newDate.getMilliseconds()).toBe(12);
  });

  it('should add 40 days to date', () => {
    const date = new Date(2020, 0, 11, 12, 12, 12, 12);
    const newDate = dateAddDays(date, 40);

    expect(newDate.getFullYear()).toBe(2020);
    expect(newDate.getMonth()).toBe(1);
    expect(newDate.getDate()).toBe(20);
    expect(newDate.getHours()).toBe(12);
    expect(newDate.getMinutes()).toBe(12);
    expect(newDate.getSeconds()).toBe(12);
    expect(newDate.getMilliseconds()).toBe(12);
  });

  it('should substract 40 days from date', () => {
    const date = new Date(2020, 0, 21, 12, 12, 12, 12);
    const newDate = dateSubstractDays(date, 40);

    expect(newDate.getFullYear()).toBe(2019);
    expect(newDate.getMonth()).toBe(11);
    expect(newDate.getDate()).toBe(12);
    expect(newDate.getHours()).toBe(12);
    expect(newDate.getMinutes()).toBe(12);
    expect(newDate.getSeconds()).toBe(12);
    expect(newDate.getMilliseconds()).toBe(12);
  });

  it('should add 26 hours to date', () => {
    const date = new Date(2020, 0, 11, 12, 12, 12, 12);
    const newDate = dateAddHours(date, 26);

    expect(newDate.getFullYear()).toBe(2020);
    expect(newDate.getMonth()).toBe(0);
    expect(newDate.getDate()).toBe(12);
    expect(newDate.getHours()).toBe(14);
    expect(newDate.getMinutes()).toBe(12);
    expect(newDate.getSeconds()).toBe(12);
    expect(newDate.getMilliseconds()).toBe(12);
  });

  it('should add 1441 minutes to date', () => {
    const date = new Date(2020, 0, 11, 12, 12, 12, 12);
    const newDate = dateAddMinutes(date, 1441);

    expect(newDate.getFullYear()).toBe(2020);
    expect(newDate.getMonth()).toBe(0);
    expect(newDate.getDate()).toBe(12);
    expect(newDate.getHours()).toBe(12);
    expect(newDate.getMinutes()).toBe(13);
    expect(newDate.getSeconds()).toBe(12);
    expect(newDate.getMilliseconds()).toBe(12);
  });

  it('should add 86401 seconds to date', () => {
    const date = new Date(2020, 0, 11, 12, 12, 12, 12);
    const newDate = dateAddSeconds(date, 86401);

    expect(newDate.getFullYear()).toBe(2020);
    expect(newDate.getMonth()).toBe(0);
    expect(newDate.getDate()).toBe(12);
    expect(newDate.getHours()).toBe(12);
    expect(newDate.getMinutes()).toBe(12);
    expect(newDate.getSeconds()).toBe(13);
    expect(newDate.getMilliseconds()).toBe(12);
  });

  it('should be today', () => {
    const testDate = new Date(Date.now());

    expect(isToday(testDate)).toBe(true);
  });

  it('should be yesterday', () => {
    const testDate = dateSubstractDays(new Date(Date.now()), 1);

    expect(isYesterday(testDate)).toBe(true);
  });

  it('should be now', () => {
    const testDate = new Date(Date.now());

    expect(isNow(testDate)).toBe(true);
  });

  it('should be a date object', () => {
    const testDate = new Date(Date.now());

    expect(isDate(testDate)).toBe(true);
  });

  it('should not be a date object', () => {
    const testDate = {
      foo: 'bar'
    };

    expect(isDate(testDate)).toBe(false);
  });
});
