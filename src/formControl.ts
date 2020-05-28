import { ControlValidator } from './controlValidator';

export class FormControl {
  private _value: any;
  private _validators: ControlValidator[];
  private _touched: boolean;
  private readonly scope: any = {};

  constructor(scope: any = {}, value: any, validators: ControlValidator[] = [], touched: boolean = false) {
    this._value = value;
    this._validators = validators;
    this._touched = touched;
    this.scope = scope;
  }
  get touched(): boolean {
    return this._touched;
  }

  get value(): any {
    return this._value;
  }
  get validators(): ControlValidator[] {
    return this._validators;
  }

  get error(): boolean {
    for (const validator of this.validators) {
      if (!validator.validatorfunction.call(this.scope, this._value)) {
        return true;
      }
    }
    return false;
  }
  get errorMessage(): string {
    for (const validator of this.validators) {
      if (!validator.validatorfunction.call(this.scope, this._value)) {
        return validator.errorMessage;
      }
    }
    return '';
  }

}
