
# React Use Form

  

Small Reactjs hook to manage forms and forms controls. 

  

## Getting Started

  

npm install react-use-form-control

  

**Requires react@^16.13.1 as a peer dependency.**

  

## Basic Usage

#### Basic usage
Here's an example of basic usage:
**input[name=]** is required, without the input property name is hard to identify the control on input event

```javascript

import React from  "react";
import  { useForm }  from  "react-use-form-control";
const controls =  {
	task:  {
		value:  "",
	},
	assignto:  {
		value:  "",
	},
};

const  Todo  =  ()  =>  {
	const  { form, handleControlEvent }  =  useForm(controls);

	return (
	<div  className={"todo-list-main"}>
		<form>
			<input
				name="task" // should be unique
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
			<button  className="primary"  type="button">Save</button>
		</form>
	</div>);
};

export  default Todo;
```

  

### Using validators

This example apply a validation function (type ValidatorFunction = (value: any) => boolean). This validation function will be executed always the control changes.

The **validators** property is an array of validators functions, so you can define many validation function as you require.

```javascript

import React from  "react";
import  { useForm }  from  "react-use-form-control";

const  isRequired  =  (value)  =>  {
	return value;
};

const controls =  {
	task:  {
		value:  "",
		validators: [{
			validatorfunction: isRequired,
			errorMessage:  "Name is required",
		}],
	},
	assignto:  {
		value:  "",
		validators: [{
			validatorfunction: isRequired,
			errorMessage:  "Assing to is required",
		}],
	},
};

const  Todo  =  ()  =>  {
const  { form, handleControlEvent }  =  useForm(controls);

return (
	<div  className={"todo-list-main"}>
		<form>
			{Object.keys(form.controls).map((key) =>
				form.controls[key].error && (
				<span  className={"error-message"}>
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
			<button  className="primary"  type="button"  disabled={!form.valid}>
				Save
			</button>
		</form>
	</div>);
};

export  default Todo;

```

  
  
  

### Dependencies between controls
Many times we have dependencies between controls and we need apply validations based on that.

```javascript

import React from  "react";
import  { useForm }  from  "react-use-form-control";

const  isRequired  =  (value)  =>  {
	return value;
};
const  lunchOnlyForJohn=  function(value)  {
	return  this.task.value ===  'Lunch'  && value ===  'John Smith';
}

const controls =  {
	task:  {
		value:  "",
		validators: [{
			validatorfunction: isRequired,
			errorMessage:  "Name is required",
		}],
	},
	assignto:  {
		value:  "",
		validators: [{
			validatorfunction: lunchOnlyForJohn,
			errorMessage:  "The Lunch task must be assigned to John Smith",
		}],
	},
};

const  Todo  =  ()  =>  {
const  { form, handleControlEvent }  =  useForm(controls);

return (
	<div  className={"todo-list-main"}>
		<form>
			{Object.keys(form.controls).map((key) =>
				form.controls[key].error && (
				<span  className={"error-message"}>
				{form.controls[key].errorMessage}
				</span>
			))}
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
			<button  className="primary"  type="button"  disabled={!form.valid}>
				Save
			</button>
		</form>
	</div>
);
};

export  default Todo;
```
  

### useForm

|Property|Description  |
|-- |-- |
| form |  type of Form |
| handleControlEvent | Control Event (Example: onChange, onClick, etc..)
| setFormControlValue | Sometimes is necessary to update control value without dispatch a control event. Update specific control passing key and value |
| resetForm | Reset the controls to the initial state|
|addFormControl | Add new control, args: name, control( type of FormControl|
|removeFormControl | Remove control, if has relation with other control an error will be throw|


  
  

#### Form

| Property | Type |
|-- |-- |
| controls | {[key: string]: FormControl} |
| valid |  Boolean (optional) |
| value |  Object  {[controlName: string]: value}  |

  
#### FormControl
| Property | Type |
|-- |-- |
| value | any |
| error |  Boolean (optional) |
| errorMessage|  string (optional)|
| validators |  Array  of  ControlValidator (optional)|

#### ControlValidator
| Property | Type |
|-- |-- |
| validatorfunction |  type ValidatorFunction =  (value:  any)  =>  boolean;  |
| errorMessage | string |

  