import { FormControl } from './formControl';
import { Form, FormControlObject } from './form';
import { ControlValidator } from './controlValidator';

export const createForm = (formControls: FormControlObject = {}): Form => {
  const controls = Object.create({});
  try {
    Object.keys(formControls).forEach((key: string) => {
      const formControl: FormControl = formControls[key];
      const { value, validators = [], error = false, errorMessage = '' } = formControl;
      const control = { value, validators, error, errorMessage };
      for (const validator of control.validators) {
        if (!validator.validatorfunction.call(controls, control.value)) {
          control.error = true;
          control.errorMessage = validator.errorMessage;
          break;
        }
      }
      controls[key] = control;
    });
    return {
      controls,
      valid: isValidForm(controls),
    };
  } catch (error) {
    throw new Error(`Invalid form format: ${error.message}`);
  }
};

export function isValidForm(controls: FormControlObject) {
  const isValid: boolean = !Object.keys(controls).find((prop: any) =>
    controls[prop].validators.some(
      (validator: ControlValidator) => validator.validatorfunction.call(controls, controls[prop].value) === false,
    ),
  );
  return isValid;
}
