import type { Dictionary } from '../Dictionary.type';
import type { Index, Indexable } from '../Index.type';
import type { Optional } from '../Optional.type';
import type { Primitive } from '../Primitive.type';
import type { UnknownFunction } from '../UnknownFunction.type';
import { isDictionary, isFunction, isIndex, isIndexable, isOptArray, isOptBoolean, isOptDictionary, isOptFunction, isOptIndex, isOptIndexable, isOptNumber, isOptPrimitive, isOptString, isPrimitive } from '../type-check/is-primitive';
import { invariant } from '../invariant';

export function assertNumber (value: unknown, label = 'value'): asserts value is number {
  invariant(typeof value === 'number', `${label} is not a number`);
}

export function assertString (value: unknown, label = 'value'): asserts value is string {
  invariant(typeof value === 'string', `${label} is not a string`);
}

export function assertBoolean (value: unknown, label = 'value'): asserts value is boolean {
  invariant(typeof value === 'boolean', `${label} is not a boolean`);
}

export function assertIndex (value: unknown, label = 'value'): asserts value is Index {
  invariant(isIndex(value), `${label} is not a Index`);
}

export function assertPrimitive (value: unknown, label = 'value'): asserts value is Primitive {
  invariant(isPrimitive(value), `${label} is not a Primitive`);
}

export function assertArray (value: unknown, label = 'value'): asserts value is unknown[] {
  invariant(Array.isArray(value), `${label} is not a unknown[]`);
}

export function assertDictionary (value: unknown, label = 'value'): asserts value is Dictionary {
  invariant(isDictionary(value), `${label} is not a Dictionary`);
}

export function assertIndexable (value: unknown, label = 'value'): asserts value is Indexable {
  invariant(isIndexable(value), `${label} is not a Indexable`);
}

export function assertFunction (value: unknown, label = 'value'): asserts value is UnknownFunction {
  invariant(isFunction(value), `${label} is not a UnknownFunction`);
}

export function assertOptNumber (value: unknown, label = 'value'): asserts value is Optional<number> {
  invariant(isOptNumber(value), `${label} is not a Optional<number>`);
}

export function assertOptString (value: unknown, label = 'value'): asserts value is Optional<string> {
  invariant(isOptString(value), `${label} is not a Optional<string>`);
}

export function assertOptBoolean (value: unknown, label = 'value'): asserts value is Optional<boolean> {
  invariant(isOptBoolean(value), `${label} is not a Optional<boolean>`);
}

export function assertOptIndex (value: unknown, label = 'value'): asserts value is Optional<Index> {
  invariant(isOptIndex(value), `${label} is not a Optional<Index>`);
}

export function assertOptPrimitive (value: unknown, label = 'value'): asserts value is Optional<Primitive> {
  invariant(isOptPrimitive(value), `${label} is not a Optional<Primitive>`);
}

export function assertOptArray (value: unknown, label = 'value'): asserts value is Optional<unknown[]> {
  invariant(isOptArray(value), `${label} is not a Optional<unknown[]>`);
}

export function assertOptDictionary (value: unknown, label = 'value'): asserts value is Optional<Dictionary> {
  invariant(isOptDictionary(value), `${label} is not a Optional<Dictionary>`);
}

export function assertOptIndexable (value: unknown, label = 'value'): asserts value is Optional<Indexable> {
  invariant(isOptIndexable(value), `${label} is not a Optional<Indexable>`);
}

export function assertOptFunction (value: unknown, label = 'value'): asserts value is Optional<UnknownFunction> {
  invariant(isOptFunction(value), `${label} is not a Optional<UnknownFunction>`);
}

