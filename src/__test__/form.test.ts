import { Form } from '../form';
import { controls, dependenControls, hasValue } from './models/controls';
import { FormControl } from '../formControl';
import { IControls, IForm } from '../interfaces';

let _controls: IControls;
let _dependentControls: IControls;
describe('Form', () => {
  beforeEach(() => {
    _controls = controls;
    _dependentControls = dependenControls;
  });

  test('Create Form function - invalid form with invalid property value', () => {
    const form: IForm = new Form(_controls);
    expect(form).toBeTruthy();
    const formcontrols = form.controls;
    expect(formcontrols.test.error).toBeTruthy();
    expect(formcontrols.test.errorMessage).toBe('test is required');
    expect(form.valid).toBeFalsy();
  });

  test('Create Form function - valid form with valid property value', () => {
    const form: IForm = new Form({
      test: new FormControl(null, 'create form test', [
        {
          validatorfunction: hasValue,
          errorMessage: 'test is required',
        },
      ]),
    });
    expect(form).toBeTruthy();
    const formcontrols = form.controls;
    expect(formcontrols.test.error).toBeFalsy();
    expect(formcontrols.test.errorMessage).toBe('');
    expect(form.valid).toBeTruthy();
  });

  test('Create Form function - validation with dependent controls', () => {
    const form: IForm = new Form(_dependentControls);
    expect(form).toBeTruthy();
    const formcontrols: any = form.controls;
    expect(formcontrols.control2.error).toBeTruthy();
    expect(formcontrols.control2.errorMessage).toBe('Control2 should match with control1');
    expect(form.valid).toBeFalsy();
  });

  test('Create Form function - non arguments', () => {
    const form: IForm = new Form();
    expect(form).toMatchObject({ controls: {}, valid: true });
  });

  test('Should return form value', () => {
    const form: IForm = new Form(_controls);
    expect(form.value).toMatchObject({ test: '' });
  });
});
