const hasValue = (value: any) => {
  return !(value === '' || value === undefined || value === null);
};

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
        validatorfunction: function (value: any) {
          const obj: any = this;
          return obj.control1.value === value;
        },
        errorMessage: 'Control2 should match with control1',
      },
    ],
  },
};
