# React Use Form

Small Reactjs hook to manage form controls

## Getting Started

npm install react-use-form-control

**Requires react@^16.13.1 as a peer dependency.**

## Example

import React from 'react';
import { useForm } from 'react-use-form-control';

const controls = {
userName: {
value: '',
},
userLastName: {
value: '',
},
};

const UserComponent = () => {
const { form, handleControlEvent } = useForm(controls);

return (
<form>
<input type={'text'} name={'userName'} value={form.controls.userName} onChange={handleControlEvent} />
<input type={'text'} name={'userName'} value={form.controls.userName} onChange={handleControlEvent} />
<button disabled={!form.valid}>Save</button>
</form>
);
};
