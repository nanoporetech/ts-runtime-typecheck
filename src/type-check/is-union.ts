import type { TypeAssert, UnwrapTypeAssertArray } from '../TypeAssert.type';

export function isUnion<A extends TypeAssert<unknown>[]>(...tests: A): TypeAssert<UnwrapTypeAssertArray<A>>{
  return (value: unknown): value is UnwrapTypeAssertArray<A> => tests.some(test => test(value));
}