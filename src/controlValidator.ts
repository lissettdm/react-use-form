import {ValidatorFunction} from './types';
export interface ControlValidator {
    validatorfunction: ValidatorFunction;
    errorMessage: string;
}