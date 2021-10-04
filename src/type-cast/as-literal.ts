import type { Optional } from '../Optional.type';
import type { Primitive } from '../Primitive.type';
import { isLiteral } from '../type-check/is-literal';
import type { TypeCast } from '../TypeCast.type';
import { optTypeCast, typeCast } from './type-cast';

export function asLiteral<T extends Primitive>(literal: T): TypeCast<T> {
  return typeCast(isLiteral(literal));
}

export function asOptLiteral<T extends Primitive>(literal: T): TypeCast<Optional<T>> {
  return optTypeCast(isLiteral(literal));
}
