import { FormControl } from './formControl';
import { useState, useEffect } from 'react';
import { ControlValidator } from './controlValidator';
import { FormControlObject, Form } from './form';

export const useForm = (controls: FormControlObject) => {
  const [form, setForm] = useState(new Form(controls));

  const updateForm = (formControls: FormControlObject) => {
    setForm((prevState) => {
      const updatedControls = { ...prevState.controls, ...formControls };
      return new Form(updatedControls);
    });
  };

  const handleControlEvent = (event: any) => {
    const { value, name, type, checked } = event.target;
    if (name) {
      const validators: ControlValidator[] = form.controls[name].validators;
      const _value = type === 'checkbox' ? checked : value;
      const control = new FormControl(null, _value, validators);
      updateForm({ [name]: control });
    } else {
      throw new Error('Missing property name. <input *name="prop_name"/>')
    }
  };


  const setFormControlValue = (key: any, value: any) => {
    const validators = form.controls[key].validators;
    updateForm({ [key]: new FormControl(null, value, validators)});
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
      setForm(new Form(currentControls));
    } catch (error) {
      throw new Error(`Unable to remove control. Maybe has dependency relation with other controls: ${error}`);
    }
  };

  return {
    form,
    handleControlEvent,
    setFormControlValue,
    resetForm,
    addFormControl,
    removeFormControl,
  };
};
