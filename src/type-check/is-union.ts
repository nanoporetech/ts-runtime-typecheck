import type { Optional } from '../Optional.type';
import type { TypeCheck, UnwrapTypeCheckArray } from '../TypeCheck.type';
import { isNullish } from './is-primitive';

export function isUnion<A extends TypeCheck<unknown>[]>(...tests: A): TypeCheck<UnwrapTypeCheckArray<A>>{
  const test =  (value: unknown): value is UnwrapTypeCheckArray<A> => tests.some(test => test(value));
  test.TYPE_NAME = tests.map(test => test.TYPE_NAME ?? 'unknown').join(' | ');
  return test;
}

export function isOptUnion<A extends TypeCheck<unknown>[]>(...tests: A): TypeCheck<Optional<UnwrapTypeCheckArray<A>>>{
  const test = (value: unknown): value is UnwrapTypeCheckArray<A> => isNullish(value) || tests.some(test => test(value));
  test.TYPE_NAME = `Optional<${tests.map(test => test.TYPE_NAME ?? 'unknown').join(' | ')}>`;
  return test;
}