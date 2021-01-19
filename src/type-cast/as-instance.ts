import type { OptionalTypeCast, TypeCast } from '../TypeCast.type';

import { memoize } from '../memoize';
import { isInstance } from '../type-check/is-instance';
import { optTypeCast, typeCast } from './type-cast';

export const asInstance = memoize(<T extends new (...args: never[]) => unknown>(ctor: T): TypeCast<InstanceType<T>> => {
  return typeCast(isInstance(ctor));
});

export const asOptInstance = memoize(<T extends new (...args: never[]) => unknown>(ctor: T): OptionalTypeCast<InstanceType<T>> => {
  return optTypeCast(isInstance(ctor));
});