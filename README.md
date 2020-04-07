# React Use Form

Small Reactjs hook to manage form controls

## Getting Started

npm install react-use-form-control

**Requires react@^16.13.1 as a peer dependency.**

## Usage
    import { useForm } from "react-use-form-control";
	
    const { form, handleControlEvent, setFormControl } = useForm(controls);
    

Where the controls object should be a object container of type FormControl.

#####useForm
|  Property |  Description |
| ------------ | ------------ |
|  form |  type of Form |
|  handleControlEvent |  Control Event (Example: onChange, onClick, etc..) |
| setFormControl | Sometimes is necessary to update control value without dispatch a control event. Update specific control passing key and value |
| resetForm | Reset the controls to the initial state|
|addFormControl | Add new control, args name, control type of FormControl|
|removeFormControl | Remove control, if has relation with other control an error will be throw|


#####Form
|  Property |  Type |
| ------------ | ------------ |
|  controls |  {[key: string]: FormControl} |
|  valid |  Boolean (optional) |

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
This example apply a validation function (type ValidatorFunction = (value: any) => boolean), one for each control.
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
This validation function will be execute on any control change, if the result is false, the control will be equal to:
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
In lunchOnlyForJohn  function the **this** scope is the controls object.
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

