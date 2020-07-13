import { FormControl } from './formControl';
import { ControlValidator, IForm, IFormControl, IFormValue, IControls } from './interfaces';

export class Form {
  private _form: IForm;

  constructor(_controls: IControls = {}) {
    this._form = {
      controls: this._formatControls(_controls),
      valid: this._isValidForm(_controls),
      value: this._getValues(_controls),
    };
  }

  get controls(): IControls {
    return this._form.controls;
  }

  get valid(): boolean {
    return this._form.valid;
  }

  get value(): IFormValue {
    return this._form.value;
  }

  private _formatControls = (formControls: IControls = {}): IControls => {
    const controls = Object.create({});
    try {
      Object.keys(formControls).forEach((key: string) => {
        const { value, validators = [], touched } = formControls[key];
        const control: IFormControl = new FormControl(formControls, value, validators, touched);
        controls[key] = control;
      });
      return controls;
    } catch (error) {
      throw new Error(`Invalid form format: ${error.message}`);
    }
  };

  private _isValidForm(_controls: IControls) {
    const isValid: boolean = !Object.keys(_controls).find((prop: any) =>
      _controls[prop].validators.some(
        (validator: ControlValidator) => validator.validatorfunction.call(_controls, _controls[prop].value) === false,
      ),
    );
    return isValid;
  }

  private _getValues(_controls: IControls) {
    return Object.keys(_controls).reduce((obj: IControls, prop) => {
      obj[prop] = _controls[prop].value;
      return obj;
    }, {});
  }
}

