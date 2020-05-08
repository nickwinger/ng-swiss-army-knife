import { AbstractControl, ValidatorFn } from '@angular/forms';

/***
 * Checks if a form control date is greater than another form control date
 * @param lowerDateControl the other control which holds the date that must be lower
 * @param formValue2DateFunc if the value of the form controls is not a date provide
 * this function to convert to date
 */
export function dateGreaterThan(lowerDateControl: AbstractControl, formValue2DateFunc?:
  (value: any) => Date): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let lowerDate;
    let greaterDate;
    if (formValue2DateFunc) {
      lowerDate   = formValue2DateFunc(lowerDateControl.value);
      greaterDate = formValue2DateFunc(control.value);
    } else {
      lowerDate   = lowerDateControl.value as Date;
      greaterDate = control.value as Date;
    }
    return lowerDate > greaterDate ?
      {dateGreaterThan: {value: control.value}} : null;
  };
}

export class FormValidators {
  static dateGreaterThan = dateGreaterThan;
}
