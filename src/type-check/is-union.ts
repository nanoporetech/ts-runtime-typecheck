import type { Optional } from '../Optional.type';
import type { TypeAssert, UnwrapTypeAssertArray } from '../TypeAssert.type';
import { isNullish } from './is-primitive';

export function isUnion<A extends TypeAssert<unknown>[]>(...tests: A): TypeAssert<UnwrapTypeAssertArray<A>>{
  const test =  (value: unknown): value is UnwrapTypeAssertArray<A> => tests.some(test => test(value));
  test.TYPE_NAME = tests.map(test => test.TYPE_NAME ?? 'unknown').join(' | ');
  return test;
}

export function isOptUnion<A extends TypeAssert<unknown>[]>(...tests: A): TypeAssert<Optional<UnwrapTypeAssertArray<A>>>{
  const test = (value: unknown): value is UnwrapTypeAssertArray<A> => isNullish(value) || tests.some(test => test(value));
  test.TYPE_NAME = `Optional<${tests.map(test => test.TYPE_NAME ?? 'unknown').join(' | ')}>`;
  return test;
}