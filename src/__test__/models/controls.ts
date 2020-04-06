const hasValue = (value: any) => {
  return !(value === '' || value === undefined || value === null);
};

const equals = (value1: any, value2: any) => value1 === value2;

export const controls: any = {
  test: {
    value: '',
    validators: [
      {
        validatorfunction: hasValue,
        errorMessage: 'test is required',
      },
    ],
  },
};

export const dependenControls: any = {
  control1: {
    value: 'should match',
    validators: [
      {
        validatorfunction: hasValue,
        errorMessage: 'Control1 is required',
      },
    ],
  },
  control2: {
    value: '',
    validators: [
      {
        validatorfunction(value: any) {
          const obj: any = this;
          return obj.control1.value === value;
        },
        errorMessage: 'Control2 should match with control1',
      },
    ],
  },
};
