import { ValidatorFunction } from './types';

export interface IFormControl {
  value: any;
  validators: ControlValidator[];
  touched: boolean;
  error: boolean;
  errorMessage: string;
  scope: any;
}

export interface IControls {  
  [key: string]: IFormControl;
}

export interface IFormValue {  
    [key: string]: any;
  }

export interface IForm {
    controls: IControls;
    valid: boolean;
    value: IFormValue;
}

export interface ControlValidator {
  validatorfunction: ValidatorFunction;
  errorMessage: string;
}
