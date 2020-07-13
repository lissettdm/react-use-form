import { FormControl } from './formControl';
import { useState } from 'react';
import { ControlValidator, IControls, IFormControl, IForm } from './interfaces';
import { Form } from './form';
import { hasProp, ownKeyProp, defineProp } from './formkits.js/proxykits';

export const useForm = (controls: IControls) => {
  const [form, setForm] = useState(new Form(controls));

  const updateForm = (formControls: IControls) => {
    setForm((prevState: IForm) => {
      const updatedControls = { ...prevState.controls, ...formControls };
      return new Form(updatedControls);
    });
  };

  const handleControlEvent = (event: any) => {
    const { value, name, type, checked } = event.target;
    if (name) {
      const validators: ControlValidator[] = form.controls[name].validators;
      const _value = type === 'checkbox' ? checked : value;
      const control = new FormControl(form.controls, _value, validators, true);
      updateForm({ [name]: control });
    } else {
      throw new Error('Missing property name. <input *name="prop_name"/>');
    }
  };

  const setFormControlValue = (key: any, value: any) => {
    const validators = form.controls[key].validators;
    updateForm({ [key]: new FormControl(form.controls, value, validators, true) });
  };

  const resetForm = () => {
    updateForm({ ...controls });
  };

  const addFormControl = (name: string, control: IFormControl) => {
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
    form: new Proxy(form, formHandler),
    handleControlEvent,
    setFormControlValue,
    resetForm,
    addFormControl,
    removeFormControl,
  };
};

const formHandler = {
  construct(target: any, arg: any) {
    const { controls, value, valid } = new target(...arg);
    return { controls, value, valid };
  },
  get(target: any, prop: string) {
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
  ...defineProp,
};
