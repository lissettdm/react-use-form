# React Use Form

Small Reactjs hook to manage form controls. Easy to use, without extra functions that you will never use. Based on validations functions this hook will keep updated the form and it's controls (controls, valid, value), even if you add new controls or remove somes.

## Getting Started

npm install react-use-form-control

**Requires react@^16.13.1 as a peer dependency.**

## Usage
    import { useForm } from "react-use-form-control";
	
	// controls: { name: { value, validators }}, for more details see validations functions.
    const { form } = useForm(controls);
    

Where the controls object should be a object container of type FormControl.

#####useForm
|  Property |  Description |
| ------------ | ------------ |
|  form |  type of Form |
|  handleControlEvent |  Control Event (Example: onChange, onClick, etc..) |
| setFormControlValue | Sometimes is necessary to update control value without dispatch a control event. Update specific control passing key and value |
| resetForm | Reset the controls to the initial state|
|addFormControl | Add new control, args name, control type of FormControl|
|removeFormControl | Remove control, if has relation with other control an error will be throw|


#####Form
|  Property |  Type |
| ------------ | ------------ |
|  controls |  {[key: string]: FormControl} |
|  valid |  Boolean (optional) |
|  value |  Object {[controlName: string]: value} |

#####FormControl
|  Property |  Type |
| ------------ | ------------ |
|  value |  any | 
|  error |  Boolean (optional) |
|  errorMessage| string (optional)|
|  validators | Array of ControlValidator (optional)|

#####ControlValidator
|  Property |  Type |
| ------------ | ------------ |
|  validatorfunction | type ValidatorFunction = (value: any) => boolean;  |
|  errorMessage |   string |

####Basic usage
The following code demonstrates a basic usage example:

**input[name=]** is required, without the input property name is hard to identified the control on input event.
```javascript
	import React from "react";
    import { useForm } from "react-use-form-control";
    
	const controls = {
      task: {
        value: "",
      },
      assignto: {
        value: "",
      },
    };
    
    const Todo = () => {
      const { form, handleControlEvent } = useForm(controls);
    
      return (
        <div className={"todo-list-main"}>
          <form>
            <input
              name="task"
              placeholder="Task"
              value={form.controls.task.value}
              onChange={handleControlEvent}
            />
            <input
              name="assignto"
              placeholder="Assign To"
              value={form.controls.assignto.value}
              onChange={handleControlEvent}
            />
    
            <button className="primary" type="button">
              Save
            </button>
          </form>
        </div>
      );
    };
    
    export default Todo;
```

####Using validators
Lets create a control named task, the task value is required, so we add a validation function to this control. If validation function return false, form.valid will be false.
This example apply a validation function (type ValidatorFunction = (value: any) => boolean).
```javascript
 const controls = {
              task: {
                value: "",
                validators: [
                  {
                    validatorfunction: isRequired,
                    errorMessage: "Name is required",
                  },
                ],
              }
        }

```
This validation function will be execute allways the control changes, if the result is false, the control will be equal to:
```javascript
task: {
                value: "",
				error: true,
				errorMessage: "Name is required",	
                validators: [
                  {
                    validatorfunction: isRequired,
                    errorMessage: "Name is required",
                  },
                ],
              }
```

You can access all the control properties, example: form.controls.task.error.
The **validator** property is a array of validators functions, so you can define many validation function as you required.

```javascript
	import React from "react";
    import { useForm } from "react-use-form-control";
    const isRequired = (value) => {
      return value;
    };
    
    const controls = {
      task: {
        value: "",
        validators: [
          {
            validatorfunction: isRequired,
            errorMessage: "Name is required",
          },
        ],
      },
      assignto: {
        value: "",
        validators: [
          {
            validatorfunction: isRequired,
            errorMessage: "Assing to is required",
          },
        ],
      },
    };
    
    const Todo = () => {
      const { form, handleControlEvent } = useForm(controls);
    
      return (
        <div className={"todo-list-main"}>
          <form>
            {Object.keys(form.controls).map(
              (key) =>
                form.controls[key].error && (
                  <span className={"error-message"}>
                    {form.controls[key].errorMessage}
                  </span>
                )
            )}
            <input
              name="task"
              placeholder="Task"
              value={form.controls.task.value}
              onChange={handleControlEvent}
            />
            <input
              name="assignto"
              placeholder="Assign To"
              value={form.controls.assignto.value}
              onChange={handleControlEvent}
            />
    
            <button className="primary" type="button" disabled={!form.valid}>
              Save
            </button>
          </form>
        </div>
      );
    };
    
    export default Todo;
```



####Validation function depending on other form control value
Many times we have dependencies between controls and we need apply validations based on that.
For this example we will create a lunchOnlyForJohn function, the **this** scope in the validations functions is the form controls.
```javascript
import React from "react";
import { useForm } from "react-use-form-control";

const isRequired = (value) => {
  return value;
};

const lunchOnlyForJohn= function(value) {
  return this.task.value === 'Lunch' && value === 'John Smith';
}

const controls = {
  task: {
    value: "",
    validators: [
      {
        validatorfunction: isRequired,
        errorMessage: "Name is required",
      },
    ],
  },
  assignto: {
    value: "",
    validators: [
      {
        validatorfunction: lunchOnlyForJohn,
        errorMessage: "The Lunch task must be assigned to John Smith",
      },
    ],
  },
};

const Todo = () => {
  const { form, handleControlEvent } = useForm(controls);

  return (
    <div className={"todo-list-main"}>
      <form>
        {Object.keys(form.controls).map(
          (key) =>
            form.controls[key].error && (
              <span className={"error-message"}>
                {form.controls[key].errorMessage}
              </span>
            )
        )}
        <input
          name="task"
          placeholder="Task"
          value={form.controls.task.value}
          onChange={handleControlEvent}
        />
        <input
          name="assignto"
          placeholder="Assign To"
          value={form.controls.assignto.value}
          onChange={handleControlEvent}
        />

        <button className="primary" type="button" disabled={!form.valid}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Todo;

```


