import { IFormControl, ControlValidator } from './interfaces';
import { baseHandler } from './formkits.js/proxykits';

export class FormControlTarget {
  private _formControl: IFormControl;

  constructor(scope: any = {}, value: any, validators: ControlValidator[] = [], touched: boolean = false) {
    this._formControl = {
      scope,
      value,
      validators,
      touched,
      error: false,
      errorMessage: '',
    };
  }
  get touched(): boolean {
    return this._formControl.touched;
  }

  get value(): any {
    return this._formControl.value;
  }
  get validators(): ControlValidator[] {
    return this._formControl.validators;
  }

  get error(): boolean {
    for (const validator of this.validators) {
      if (!validator.validatorfunction.call(this._formControl.scope, this.value)) {
        return true;
      }
    }
    return false;
  }
  get errorMessage(): string {
    for (const validator of this.validators) {
      if (!validator.validatorfunction.call(this._formControl.scope, this.value)) {
        return validator.errorMessage;
      }
    }
    return '';
  }
}

const formControlHandler = {
  construct(target: any, arg: any) {
    const { touched, value, error, errorMessage, validators } = new target(...arg);
    return { touched, value, error, errorMessage, validators };
  },
  ...baseHandler,
};

export const FormControl = new Proxy(FormControlTarget, formControlHandler);
