import type { TypeCheck, UnwrapTypeCheckArray } from '../TypeCheck.type';
import type { OptionalTypeCast, TypeCast } from '../TypeCast.type';

import { isUnion } from '../type-check/is-union';
import { optTypeCast, typeCast } from './type-cast';

export const asUnion = <A extends TypeCheck<unknown>[]>(...tests: A): TypeCast<UnwrapTypeCheckArray<A>> => {
  return typeCast(isUnion(...tests));
};

export const asOptUnion = <A extends TypeCheck<unknown>[]>(...tests: A): OptionalTypeCast<UnwrapTypeCheckArray<A>> => {
  return optTypeCast(isUnion(...tests));
};