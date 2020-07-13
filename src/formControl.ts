import { IFormControl, ControlValidator, IForm } from './interfaces';
import { hasProp, ownKeyProp, defineProp } from './formkits.js/proxykits';

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
    const {touched, value, error, errorMessage, validators} = new target(...arg);
    return {touched, value, error, errorMessage, validators};
  },
  get: function (target: any, prop: string) {
    if (prop in target) {
      return target[prop];
    }
    throw new Error(`Invalid property ${prop}`);
  },
  set(_: any, prop: string, __: any) {
    throw new Error(`Cannot set property value of ${prop}`);
  },
  ...hasProp,
  ...ownKeyProp,
  ...defineProp
};

export const FormControl = new Proxy(FormControlTarget, formControlHandler);
