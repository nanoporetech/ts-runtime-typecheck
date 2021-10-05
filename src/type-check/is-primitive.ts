import type { Index, Indexable } from '../Index.type';
import type { Nullish } from '../Nullish.type';
import type { Dictionary } from '../Dictionary.type';
import type { Optional } from '../Optional.type';
import type { UnknownFunction } from '../UnknownFunction.type';
import type { Primitive } from '../Primitive.type';

export function isDictionary(obj: unknown): obj is Dictionary {
  return obj !== null && typeof obj === 'object' && Array.isArray(obj) === false;
}
isDictionary.TYPE_NAME = 'Dictionary';

export function isOptDictionary(obj: unknown): obj is Optional<Dictionary> {
  return isDictionary(obj) || isNullish(obj);
}
isOptDictionary.TYPE_NAME = 'Optional<Dictionary>';

export function isFunction(obj: unknown): obj is UnknownFunction {
  return typeof obj === 'function';
}
isFunction.TYPE_NAME = 'UnknownFunction';

export function isOptFunction(obj: unknown): obj is Optional<UnknownFunction> {
  return isFunction(obj) || isNullish(obj);
}
isOptFunction.TYPE_NAME = 'Optional<UnknownFunction>';

export function isBoolean(obj: unknown): obj is boolean {
  return typeof obj === 'boolean';
}
isBoolean.TYPE_NAME = 'boolean';

export function isOptBoolean(obj: unknown): obj is Optional<boolean> {
  return isBoolean(obj) || isNullish(obj);
}
isOptBoolean.TYPE_NAME = 'Optional<boolean>';

export function isString(obj: unknown): obj is string {
  return typeof obj === 'string';
}
isString.TYPE_NAME = 'string';

export function isOptString(obj: unknown): obj is Optional<string> {
  return isString(obj) || isNullish(obj);
}
isOptString.TYPE_NAME = 'Optional<string>';

export function isNumber(obj: unknown): obj is number {
  return typeof obj === 'number';
}
isNumber.TYPE_NAME = 'number';

export function isOptNumber(obj: unknown): obj is Optional<number> {
  return isNumber(obj) || isNullish(obj);
}
isOptNumber.TYPE_NAME = 'Optional<number>';

export function isIndex(obj: unknown): obj is Index {
  return typeof obj === 'number' || typeof obj === 'string';
}
isIndex.TYPE_NAME = 'Index';

export function isOptIndex(obj: unknown): obj is Optional<Index> {
  return isIndex(obj) || isNullish(obj);
}
isOptIndex.TYPE_NAME = 'Optional<Index>';

export function isPrimitive(obj: unknown): obj is Primitive {
  return typeof obj === 'number' || typeof obj === 'string' || typeof obj === 'boolean';
}
isPrimitive.TYPE_NAME = 'Primitive';

export function isOptPrimitive(obj: unknown): obj is Primitive {
  return isPrimitive(obj) || isNullish(obj);
}
isOptPrimitive.TYPE_NAME = 'Optional<Primitive>';

export function isIndexable(obj: unknown): obj is Indexable {
  return obj !== null && typeof obj === 'object';
}
isIndexable.TYPE_NAME = 'Indexable';

export function isOptIndexable(obj: unknown): obj is Optional<Indexable> {
  return isIndexable(obj) || isNullish(obj);
}
isOptIndexable.TYPE_NAME = 'Optional<Indexable>';

export function isArray(obj: unknown): obj is unknown[] {
  return Array.isArray(obj);
}
isArray.TYPE_NAME = 'unknown[]';

export function isOptArray(obj: unknown): obj is Optional<unknown[]> {
  return isArray(obj) || isNullish(obj);
}
isOptArray.TYPE_NAME = 'Optional<unknown[]>';

export function isUndefined(obj: unknown): obj is undefined {
  return typeof obj === 'undefined';
}
isUndefined.TYPE_NAME = 'undefined';

export function isNullish(obj: unknown): obj is Nullish {
  return obj === null || typeof obj === 'undefined';
}
isNullish.TYPE_NAME = 'Nullish';

export function isDefined<T>(obj: Optional<T>): obj is NonNullable<T> {
  return !isNullish(obj);
}
isDefined.TYPE_NAME = 'NonNullable<unknown>';