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

