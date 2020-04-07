import { FormControl } from './formControl';
import { useState, useEffect } from 'react';
import { createForm, isValidForm } from './formManager';
import { ControlValidator } from './controlValidator';
import { FormControlObject, Form } from './form';

export const useForm = (controls: FormControlObject) => {
  const [form, setForm] = useState(createForm(controls));

  useEffect(() => {
    updateForm({});
  }, []);

  const updateForm = (formControls: FormControlObject) => {
    setForm((prevState) => {
      const updatedControls = { ...prevState.controls, ...formControls };
      return { controls: updatedControls, valid: isValidForm(updatedControls) };
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

  const resetForm = () => {
    updateForm({ ...controls });
  };

  const addFormControl = (name: string, control: FormControl) => {
    updateForm({ [name]: control });
  };

  const removeFormControl = (name: string) => {
    const currentControls: any = { ...form.controls };
    delete currentControls[name];
    try {
      setForm({ controls: currentControls, valid: isValidForm(currentControls) });
    } catch (error) {
      throw new Error(`Unable to remove control. Maybe has dependency relation with other controls: ${error}`);
    }
  };

  return {
    form,
    handleControlEvent,
    setFormControl,
    resetForm,
    addFormControl,
    removeFormControl,
  };
};
