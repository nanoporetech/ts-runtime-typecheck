import type { Optional } from '../Optional.type';
import type { TypeAssert } from '../TypeAssert.type';
import { isNullish } from './is-primitive';

export function isInstance<T extends new (...args: never[]) => unknown>(ctor: T): TypeAssert<InstanceType<T>> {
  const result = (value: unknown): value is InstanceType<T> => {
    return value instanceof ctor;
  };
  result.TYPE_NAME = ctor.name;
  return result;
}

export function isOptInstance<T extends new (...args: never[]) => unknown>(ctor: T): TypeAssert<Optional<InstanceType<T>>> {
  const result = (value: unknown): value is InstanceType<T> => {
    return isNullish(value) || value instanceof ctor;
  };
  result.TYPE_NAME = ctor.name;
  return result;
}