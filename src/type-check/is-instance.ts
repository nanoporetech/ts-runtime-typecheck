import type { TypeAssert } from '../TypeAssert.type';

export function isInstance<T extends new (...args: any[]) => unknown>(ctor: T): TypeAssert<InstanceType<T>> {
  return (value: unknown): value is InstanceType<T> => {
    return value instanceof ctor;
  };
}