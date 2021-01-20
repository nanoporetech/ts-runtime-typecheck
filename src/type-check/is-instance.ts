import type { Optional } from '../Optional.type';
import type { TypeCheck } from '../TypeCheck.type';
import { isNullish } from './is-primitive';

export function isInstance<T extends new (...args: never[]) => unknown>(ctor: T): TypeCheck<InstanceType<T>> {
  const result = (value: unknown): value is InstanceType<T> => {
    return value instanceof ctor;
  };
  result.TYPE_NAME = ctor.name;
  return result;
}

export function isOptInstance<T extends new (...args: never[]) => unknown>(ctor: T): TypeCheck<Optional<InstanceType<T>>> {
  const result = (value: unknown): value is InstanceType<T> => {
    return isNullish(value) || value instanceof ctor;
  };
  result.TYPE_NAME = ctor.name;
  return result;
}