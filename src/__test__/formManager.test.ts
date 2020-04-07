import { createForm } from '../formManager';
import { Form } from '../form';
import { controls, dependenControls } from './models/controls';

test('Create Form function - invalid form with invalid property value', () => {
  const form: Form = createForm(controls);
  expect(form).toBeTruthy();
  const formcontrols = form.controls;
  expect(formcontrols.test.error).toBeTruthy();
  expect(formcontrols.test.errorMessage).toBe('test is required');
  expect(form.valid).toBeFalsy();
});

test('Create Form function - valid form with valid property value', () => {
  controls.test.value = 'create form test';
  const form: Form = createForm(controls);
  expect(form).toBeTruthy();
  const formcontrols = form.controls;
  expect(formcontrols.test.error).toBeFalsy();
  expect(formcontrols.test.errorMessage).toBe('');
  expect(form.valid).toBeTruthy();
});

test('Create Form function - validation with dependent controls', () => {
  const form: Form = createForm(dependenControls);
  expect(form).toBeTruthy();
  const formcontrols: any = form.controls;
  expect(formcontrols.control2.error).toBeTruthy();
  expect(formcontrols.control2.errorMessage).toBe('Control2 should match with control1');
  expect(form.valid).toBeFalsy();
});

test('Create Form function - non arguments', () => {
  const form: Form = createForm();
  expect(form).toMatchObject({ controls: {}, valid: true });
});
