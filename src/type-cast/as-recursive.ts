import type { OptionalTypeCast, TypeCast } from '../TypeCast.type';
import type { Dictionary } from '../Dictionary.type';
import type { TypeAssert } from '../TypeAssert.type';
import { memoize } from '../memoize';
import { isArrayOf, isDictionaryOf } from '../type-check/is-recursive';
import { optTypeCast, typeCast } from './type-cast';

export const asArrayOf = memoize(<T>(visitor: TypeAssert<T>): TypeCast<T[]> => {
  return typeCast(isArrayOf(visitor));
});

export const asDictionaryOf = memoize(<T>(visitor: TypeAssert<T>): TypeCast<Dictionary<T>> => {
  return typeCast(isDictionaryOf(visitor));
});

export const asOptArrayOf = memoize(<T>(visitor: TypeAssert<T>): OptionalTypeCast<T[]> => {
  return optTypeCast(isArrayOf(visitor));
});

export const asOptDictionaryOf = memoize(<T>(visitor: TypeAssert<T>): OptionalTypeCast<Dictionary<T>> => {
  return optTypeCast(isDictionaryOf(visitor));
});