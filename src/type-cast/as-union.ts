import type { TypeAssert, UnwrapTypeAssertArray } from '../TypeAssert.type';
import type { OptionalTypeCast, TypeCast } from '../TypeCast.type';

import { isUnion } from '../type-check/is-union';
import { optTypeCast, typeCast } from './type-cast';

export const asUnion = <A extends TypeAssert<unknown>[]>(...tests: A): TypeCast<UnwrapTypeAssertArray<A>> => {
  return typeCast(isUnion(...tests));
};

export const asOptUnion = <A extends TypeAssert<unknown>[]>(...tests: A): OptionalTypeCast<UnwrapTypeAssertArray<A>> => {
  return optTypeCast(isUnion(...tests));
};