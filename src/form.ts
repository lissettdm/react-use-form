import { FormControl } from './formControl';
import { ControlValidator } from './controlValidator';

export interface FormControlObject {
  [key: string]: FormControl;
}

export class Form {
  private _controls: FormControlObject;

  constructor(_controls: FormControlObject = {}) {
    this._controls = this.formatControls(_controls);
  }

  get controls() {
    return this._controls;
  }

  get valid(): boolean {
    return this.isValidForm();
  }

  get value(): any {
    return this.getValues();
  }

  private formatControls = (formControls: FormControlObject = {}): FormControlObject => {
    const controls = Object.create({});
    try {
      Object.keys(formControls).forEach((key: string) => {
        const { value, validators = [], touched } = formControls[key];
        const control: FormControl = new FormControl(formControls, value, validators, touched);
        controls[key] = control;
      });
      return controls;
    } catch (error) {
      throw new Error(`Invalid form format: ${error.message}`);
    }
  };

  private isValidForm() {
    const isValid: boolean = !Object.keys(this.controls).find((prop: any) =>
      this.controls[prop].validators.some(
        (validator: ControlValidator) =>
          validator.validatorfunction.call(this.controls, this.controls[prop].value) === false,
      ),
    );
    return isValid;
  }

  private getValues() {
    return Object.keys(this.controls).reduce((obj: FormControlObject, prop) => {
      obj[prop] = this.controls[prop].value;
      return obj;
    }, {});
  }
}
