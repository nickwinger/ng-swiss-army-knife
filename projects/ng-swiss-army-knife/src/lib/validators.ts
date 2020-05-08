import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { hasConstructorName } from './helper/object';

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

/***
 * This validator function must  be used on the formGroup level, see
 * https://angular.io/guide/form-validation#cross-field-validation
 * @param controlNames the controlNames which at least on must  have a value
 * @param hasValueFunc Optional a function to tell if the control has a value or not
 */
export function anyRequired(controlNames: string[],
                            hasValueFunc: (c: AbstractControl) => boolean
                              = c => !!c.value): ValidatorFn {
  return (fb: FormGroup): ValidationErrors | null => {
    if (!hasConstructorName(fb, 'FormGroup')) {
      throw new Error('Validator anyRequired must be on form level. See https://angular.io/guide/form-validation#cross-field-validation');
    }

    const someHasValue = controlNames.some(
      controlName => hasValueFunc(fb.get(controlName)));

    return someHasValue ? null : {anyRequired: true};
  };
}

export class FormValidators {
  static anyRequired = anyRequired;
  static dateGreaterThan = dateGreaterThan;
}
