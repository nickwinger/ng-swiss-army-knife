import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FormHelper } from './form';

describe('FormHelper', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [FormBuilder]
  }));

  it('should mark form as touched', () => {

    const fb: FormBuilder = TestBed.get(FormBuilder);
    expect(fb).toBeTruthy();

    const form = fb.group({
      username: [''],
      password: ['']
    });

    expect(form.touched).toBe(false);
    expect(form.get('username').touched).toBe(false);
    expect(form.get('password').touched).toBe(false);

    FormHelper.markFormGroupAsTouched(form);

    expect(form.touched).toBe(true);
    expect(form.get('username').touched).toBe(true);
    expect(form.get('password').touched).toBe(true);
  });

  it('should mark form as untouched', () => {

    const fb: FormBuilder = TestBed.get(FormBuilder);
    expect(fb).toBeTruthy();

    const form = fb.group({
      username: [''],
      password: ['']
    });

    expect(form.touched).toBe(false);
    expect(form.get('username').touched).toBe(false);
    expect(form.get('password').touched).toBe(false);

    FormHelper.markFormGroupAsTouched(form);

    expect(form.touched).toBe(true);
    expect(form.get('username').touched).toBe(true);
    expect(form.get('password').touched).toBe(true);

    FormHelper.markFormGroupAsUntouched(form);

    expect(form.touched).toBe(false);
    expect(form.get('username').touched).toBe(false);
    expect(form.get('password').touched).toBe(false);
  });

  it('should mark form as dirty', () => {

    const fb: FormBuilder = TestBed.get(FormBuilder);
    expect(fb).toBeTruthy();

    const form = fb.group({
      username: [''],
      password: ['']
    });

    expect(form.dirty).toBe(false);
    expect(form.get('username').dirty).toBe(false);
    expect(form.get('password').dirty).toBe(false);

    FormHelper.markFormGroupAsDirty(form);

    expect(form.dirty).toBe(true);
    expect(form.get('username').dirty).toBe(true);
    expect(form.get('password').dirty).toBe(true);
  });

  it('should mark form as pristine', () => {

    const fb: FormBuilder = TestBed.get(FormBuilder);
    expect(fb).toBeTruthy();

    const form = fb.group({
      username: [''],
      password: ['']
    });

    expect(form.dirty).toBe(false);
    expect(form.get('username').dirty).toBe(false);
    expect(form.get('password').dirty).toBe(false);

    FormHelper.markFormGroupAsDirty(form);

    expect(form.dirty).toBe(true);
    expect(form.get('username').dirty).toBe(true);
    expect(form.get('password').dirty).toBe(true);

    FormHelper.markFormGroupAsPristine(form);

    expect(form.dirty).toBe(false);
    expect(form.get('username').dirty).toBe(false);
    expect(form.get('password').dirty).toBe(false);
  });

  it('should get dirty controls', () => {

    const fb: FormBuilder = TestBed.get(FormBuilder);
    expect(fb).toBeTruthy();

    const form = fb.group({
      username: [''],
      password: ['']
    });

    form.get('password').markAsDirty();

    const dirtyControls = FormHelper.getDirtyControls(form);
    expect(dirtyControls.length).toBe(1);
    expect(dirtyControls[0].name).toBe('password');
  });
});
