const PREFIX = '_';
export const hasProp = {
  has(target: any, key: string) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  },
};

export const ownKeyProp = {
  ownKeysProps: (obj: any) =>
    Reflect.ownKeys(obj).filter((prop) => typeof prop !== 'string' || !prop.startsWith(PREFIX)),
};

export const defineProp = {
  defineProperty(target: any, key: string, descriptor: any) {
    throw new Error(`Invalid attempt to define property ${key}`);
  },
};

export const baseHandler = {
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

