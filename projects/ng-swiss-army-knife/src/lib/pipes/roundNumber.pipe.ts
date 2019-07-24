import { Pipe, PipeTransform } from '@angular/core';
import { roundNumber } from '../helper/misc';

@Pipe({name: 'roundNumber'})
export class RoundNumberPipe implements PipeTransform {
  transform(value: number, digits: number): number {
    return roundNumber(value, digits);
  }
}
