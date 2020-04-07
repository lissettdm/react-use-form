import { FormControl } from './formControl';

export interface FormControlObject {
    [key: string]: FormControl
}

export interface Form {
  controls: FormControlObject;
  valid: boolean;
}
