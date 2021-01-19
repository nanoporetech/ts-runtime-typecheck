import type { OptionalTypeCast, TypeCast } from '../TypeCast.type';
import type { Dictionary } from '../Dictionary.type';
import type { TypeAssert } from '../TypeAssert.type';

import { memoize } from '../memoize';
import { isArrayRecursive, isRecordRecursive } from '../type-check/is-recursive';
import { optTypeCast, typeCast } from './type-cast';

export const asArrayRecursive = memoize(<T>(visitor: TypeAssert<T>): TypeCast<T[]> => {
  return typeCast(isArrayRecursive(visitor));
});

export const asRecordRecursive = memoize(<T>(visitor: TypeAssert<T>): TypeCast<Dictionary<T>> => {
  return typeCast(isRecordRecursive(visitor));
});

export const asOptArrayRecursive = memoize(<T>(visitor: TypeAssert<T>): OptionalTypeCast<T[]> => {
  return optTypeCast(isArrayRecursive(visitor));
});

export const asOptRecordRecursive = memoize(<T>(visitor: TypeAssert<T>): OptionalTypeCast<Dictionary<T>> => {
  return optTypeCast(isRecordRecursive(visitor));
});