import { AbstractControl, Form, FormControl, FormGroup } from "@angular/forms";

function callFuncOnFormGroupAndChildren(formGroup: FormGroup, nameOfFunc: string) {
  if (!formGroup.controls)
    return;

  Object.keys(formGroup.controls)
    .map(formControlName => formGroup.controls[formControlName])
    .forEach(control => {
      if (control instanceof FormControl) {
        control[nameOfFunc]();
      } else if (control instanceof FormGroup) {
        this.callFuncOnFormGroupAndChildren(control);
      }
    });
}

/**
 * marks the form and all it's children, including other formGroups or controls
 * as touched
 * @param formGroup The form group to mark as touched
 */
export function markFormGroupAsTouched(formGroup: FormGroup) {
  callFuncOnFormGroupAndChildren(formGroup, 'markAsTouched');
}

/**
 * marks the form and all it's children, including other formGroups or controls
 * as untouched
 * @param formGroup The form group to mark as untouched
 */
export function markFormGroupAsUntouched(formGroup: FormGroup) {
  callFuncOnFormGroupAndChildren(formGroup, 'markAsUntouched');
}

/**
 * marks the form and all it's children, including other formGroups or controls
 * as dirty
 * @param formGroup The form group to mark as untouched
 */
export function markFormGroupAsDirty(formGroup: FormGroup) {
  callFuncOnFormGroupAndChildren(formGroup, 'markAsDirty');
}

/**
 * marks the form and all it's children, including other formGroups or controls
 * as pristine
 * @param formGroup The form group to mark as pristine
 */
export function markFormGroupAsPristine(formGroup: FormGroup) {
  callFuncOnFormGroupAndChildren(formGroup, 'markAsPristine');
}

/**
 * marks the form and all it's children, including other formGroups or controls
 * as pending
 * @param formGroup The form group to mark as pending
 */
export function markFormGroupAsPending(formGroup: FormGroup) {
  callFuncOnFormGroupAndChildren(formGroup, 'markAsPending');
}

export interface ControlWithName {
  control: AbstractControl;
  name: string;
}

/**
 * get all dirty controls inside a form
 * @param form The form in which to check for dirty controls
 */
export function getDirtyControls(form: FormGroup): ControlWithName[] {
  return Object.keys(form.controls)
    .map(k => <ControlWithName>{control: form.controls[k], name: k})
    .filter(c => c.control.dirty);
}

export class FormHelper {
  static markFormGroupAsTouched = markFormGroupAsTouched;
  static getDirtyControls = getDirtyControls;
  static markFormGroupAsUntouched = markFormGroupAsUntouched;
  static markFormGroupAsDirty = markFormGroupAsDirty;
  static markFormGroupAsPristine = markFormGroupAsPristine;
  static markFormGroupAsPending = markFormGroupAsPending;
}
