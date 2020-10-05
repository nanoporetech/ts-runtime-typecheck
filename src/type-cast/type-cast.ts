import { isNullish } from '../type-check/is-primative';

export function optTypeCast<Input, Output> (test: (obj: Input) => Output): (obj: Input | undefined) => Output | undefined {
  return (obj: Input | undefined) => {
    if (isNullish(obj)) {
      return undefined;
    }
    return test(obj);
  };
}

export function typeCast<Output> (typename: string, isType: (obj: unknown) => obj is Output): (obj: unknown, fallback?: Output) => Output {
  return (obj: unknown, fallback?: Output) => {
    if (isType(obj)) {
      return obj as Output;
    }
    if (isNullish(obj) && typeof fallback !== 'undefined') {
      return fallback;
    }
    throw new Error(`Unable to cast ${typeof obj} to ${typename}`);
  };
}