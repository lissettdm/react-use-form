import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from '..';
import { controls, dependenControls, hasValue } from './models/controls';
import { FormControl } from '../formControl';

test('Should use useForm hook', () => {
  const { result } = renderHook(() => useForm(controls));
  expect(result.current.form.controls.test.value).toBe('');
  expect(result.current.form.controls.test.error).toBeTruthy();
  expect(result.current.form.controls.test.errorMessage).toBe('test is required');
  expect(result.current.form.valid).toBeFalsy();
});

test('Should update form state - on handleControlEvent', () => {
  const { result } = renderHook(() => useForm(controls));

  act(() => {
    result.current.handleControlEvent({
      target: { name: 'test', value: 'new test value' },
    });
  });
  expect(result.current.form.controls.test.value).toEqual('new test value');
  expect(result.current.form.controls.test.error).toBeFalsy();
  expect(result.current.form.controls.test.errorMessage).toBe('');
  expect(result.current.form.valid).toBeTruthy();
});

test('Should use useForm hook -  dependent controls', () => {
  const { result } = renderHook(() => useForm(dependenControls));
  expect(result.current.form.controls.control2.value).toEqual('');
  expect(result.current.form.controls.control2.error).toBeTruthy();
  expect(result.current.form.controls.control2.errorMessage).toBe('Control2 should match with control1');
  expect(result.current.form.valid).toBeFalsy();
});

test('Should update form state - on handleControlEvent', () => {
  const { result } = renderHook(() => useForm(dependenControls));

  act(() => {
    result.current.handleControlEvent({
      target: { name: 'control2', value: 'should match' },
    });
  });
  expect(result.current.form.controls.control2.value).toEqual('should match');
  expect(result.current.form.controls.control2.error).toBeFalsy();
  expect(result.current.form.controls.control2.errorMessage).toBe('');
  expect(result.current.form.valid).toBeTruthy();
});

test('Should reset form state', () => {
  const { result } = renderHook(() => useForm(dependenControls));
  expect(result.current.form.valid).toBeFalsy();

  act(() => {
    result.current.handleControlEvent({
      target: { name: 'control2', value: 'should match' },
    });
  });
  expect(result.current.form.controls.control2.value).toEqual('should match');
  expect(result.current.form.valid).toBeTruthy();

  act(() => {
    result.current.resetForm();
  });
  expect(result.current.form.valid).toBeFalsy();
});

test('Should add new form control', () => {
  const { result } = renderHook(() => useForm(controls));
  expect(result.current.form.valid).toBeFalsy();

  act(() => {
    result.current.handleControlEvent({
      target: { name: 'test', value: 'Form Test' },
    });
  });
  expect(result.current.form.valid).toBeTruthy();

  act(() => {
    result.current.addFormControl(
      'coverage',
      new FormControl(null, '', [
        {
          validatorfunction: (val: any) => val !== '',
          errorMessage: 'coverage is required',
        },
      ]),
    );
  });
  expect(result.current.form.valid).toBeFalsy();
});

test('Should remove form control', () => {
  const { result } = renderHook(() => useForm(dependenControls));
  expect(result.current.form.valid).toBeFalsy();

  act(() => {
    result.current.handleControlEvent({
      target: { name: 'control2', value: 'should match' },
    });
  });

  expect(result.current.form.valid).toBeTruthy();

  act(() => {
    result.current.removeFormControl('control2');
  });
  expect(Reflect.has(result.current.form.controls, 'control2')).toBeFalsy();
});

test('Should throw error while getting undefined property', () => {
  const { result } = renderHook(() => useForm(dependenControls));
  let err = null;

  try {
    expect(result.current.form.undefinedProp).toBeFalsy();
  } catch (error) {
    err = error;
  }
  expect(err.message).toBe('Invalid property undefinedProp');
});

test('Should throw error while setting a property', () => {
  const { result } = renderHook(() => useForm(dependenControls));
  let err = null;

  try {
    result.current.form.controls = {};
  } catch (error) {
    err = error;
  }
  expect(err.message).toBe('Cannot set property value of controls');
});
