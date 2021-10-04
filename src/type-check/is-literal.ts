import { isNullish, TypeCheck } from '..';
import type { Optional } from '../Optional.type';
import type { Primitive } from '../Primitive.type';

export function literalTypeName(literal: Primitive): string {
  switch (typeof literal) {
    case 'string':
      return `"${literal}"`;
    case 'number':
    case 'boolean':
      return literal.toString();
    default:
      throw new Error(`Expected literal value to be a Primitive, but was of type ${typeof literal}.`);
  }
}

export function isLiteral<T extends Primitive>(literal: T): TypeCheck<T> {
  const check = (obj: unknown): obj is T => obj === literal;
  check.TYPE_NAME = literalTypeName(literal);
  return check;
}

export function isOptLiteral<T extends Primitive>(literal: T): (obj: unknown) => obj is Optional<T> {
  const check = (obj: unknown): obj is Optional<T> => isNullish(obj) || obj === literal;
  check.TYPE_NAME = literalTypeName(literal);
  return (obj: unknown): obj is T => isNullish(obj) || obj === literal;
}