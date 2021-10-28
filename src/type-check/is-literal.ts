import type { Optional } from '../Optional.type';
import type { Primitive } from '../Primitive.type';
import type { TypeCheck } from '../TypeCheck.type';
import { isNullish } from './is-primitive';

export function literalTypeName(literal: Primitive): string {
  switch (typeof literal) {
    case 'string':
      return `"${literal}"`;
    case 'number':
    case 'boolean':
      return literal.toString();
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
  return check;
}