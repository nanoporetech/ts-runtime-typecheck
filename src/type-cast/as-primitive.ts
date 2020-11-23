import type { Dictionary } from '../Dictionary.type';
import type { OptionalTypeCast, TypeCast } from '../TypeCast.type';
import type { Optional } from '../Optional.type';

import { isString, isNullish, isNumber, isDefined, isArray, isBoolean, isFunction, isIndex, isRecord, isIndexable } from '../type-check/is-primitive';
import { optTypeCast, typeCast } from './type-cast';
import { memoize } from '../memoize';

export const asString = typeCast(isString);
export const asNumber = typeCast(isNumber);
export const asIndex = typeCast(isIndex);
export const asIndexable = typeCast(isIndexable);
export const asBoolean = typeCast(isBoolean);
export const asArray = typeCast(isArray);
export const asRecord = typeCast(isRecord);
export const asFunction = typeCast(isFunction);

// NOTE this *could* work with the typeCast helper
// but unfortunately generic parameters cannot be preserved
// when a function is placed into a value
export function asDefined<T> (obj: Optional<T>, fallback?: NonNullable<T>): NonNullable<T> {
  if (isDefined(obj)) {
    return obj as NonNullable<T>;
  }
  if (typeof fallback !== 'undefined') {
    return fallback;
  }
  throw new Error(`Unable to cast ${typeof obj} to NonNullable<unknown>`);
}

export const asOptString = optTypeCast(isString);
export const asOptNumber = optTypeCast(isNumber);
export const asOptIndex = optTypeCast(isIndex);
export const asOptIndexable = optTypeCast(isIndexable);
export const asOptBoolean = optTypeCast(isBoolean);
export const asOptArray = optTypeCast(isArray);
export const asOptRecord = optTypeCast(isRecord);
export const asOptFunction = optTypeCast(isFunction);

export const asArrayRecursive = memoize(<T> (visitor: (obj: unknown) => T): TypeCast<T[]> => {
  return (obj: unknown, fallback?: T[]) => {
    if (isNullish(obj) && typeof fallback !== 'undefined') {
      return fallback;
    }
    return asArray(obj, fallback).map((val: unknown) => visitor(val));
  };
});

export const asRecordRecursive = memoize(<T> (visitor: (obj: unknown) => T): TypeCast<Dictionary<T>> => {
  return (obj: unknown, fallback?: Dictionary<T>) => {
    if (isNullish(obj) && typeof fallback !== 'undefined') {
      return fallback;
    }
    const source = asRecord(obj);
    const record: Dictionary<T> = {};
    for (const key in source) {
      record[key] = visitor(source[key]);
    }
    return record;
  };
});

export const asOptArrayRecursive = memoize(<T>(visitor: (obj: unknown) => T): OptionalTypeCast<T[]> => {
  const convert = asArrayRecursive(visitor);
  return (obj) => {
    if (isNullish(obj)) {
      return undefined;
    }
    return convert(obj);
  };
});

export const asOptRecordRecursive = memoize(<T>(visitor: (obj: unknown) => T): OptionalTypeCast<Dictionary<T>> => {
  const convert = asRecordRecursive(visitor);
  return (obj) => {
    if (isNullish(obj)) {
      return undefined;
    }
    return convert(obj);
  };
});