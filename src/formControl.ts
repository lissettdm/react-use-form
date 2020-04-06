import { ControlValidator } from './controlValidator';

export interface FormControl {
  value: any;
  validators: ControlValidator[];
  error?: boolean;
  errorMessage?: string;
}
