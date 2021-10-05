import type { Primitive } from '../Primitive.type';
import { isLiteral } from '../type-check/is-literal';
import type { OptionalTypeCast, TypeCast } from '../TypeCast.type';
import { optTypeCast, typeCast } from './type-cast';

export function asLiteral<T extends Primitive>(literal: T): TypeCast<T> {
  return typeCast(isLiteral(literal));
}

export function asOptLiteral<T extends Primitive>(literal: T): OptionalTypeCast<T> {
  return optTypeCast(isLiteral(literal));
}
