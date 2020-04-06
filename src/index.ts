import { FormControl } from './formControl';
import { useState, useEffect } from 'react';
import { createForm, isValidForm } from './formManager';
import { ControlValidator } from './controlValidator';

export const useForm = (controls: any) => {
  const [form, setForm] = useState(createForm(controls));

  useEffect(() => {
    updateForm({});
  }, []);

  const updateForm = (formControls: any) => {
    setForm((prevState) => {
      const controls = { ...prevState.controls, ...formControls };
      return { controls, valid: isValidForm(controls) };
    });
  };

  const handleControlEvent = (event: any) => {
    const { value, name, type, checked } = event.target;
    if (name) {
      let control = { ...form.controls[name] };
      control.value = type === 'checkbox' ? checked : value;
      control = manageControl(control);
      updateForm({ [name]: control });
    }
  };

  /** for this.  use purpose */
  function manageControl(control: FormControl) {
    if (Array.isArray(control.validators)) {
      control.error = false;
      control.errorMessage = '';
      const validation = control.validators.find(
        (validator: ControlValidator) => !validator.validatorfunction.call(form.controls, control.value),
      );
      if (validation) {
        control.error = true;
        control.errorMessage = validation.errorMessage;
      }
    }
    return control;
  }

  const setFormControl = (key: any, value: any) => {
    updateForm({ [key]: { ...form.controls[key], value } });
  };

  return {
    form,
    handleControlEvent,
    setFormControl,
  };
};
