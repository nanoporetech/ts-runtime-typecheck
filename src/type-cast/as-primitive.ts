import type { Dictionary } from '../Dictionary.type';
import type { OptionalTypeCast, TypeCast } from '../TypeCast.type';
import type { Optional } from '../Optional.type';

import { isString, isNullish, isNumber, isDefined, isArray, isBoolean, isFunction, isIndex, isDictionary, isIndexable } from '../type-check/is-primitive';
import { optTypeCast, typeCast } from './type-cast';
import { memoize } from '../memoize';

export const asString = typeCast(isString);
export const asNumber = typeCast(isNumber);
export const asIndex = typeCast(isIndex);
export const asIndexable = typeCast(isIndexable);
export const asBoolean = typeCast(isBoolean);
export const asArray = typeCast(isArray);
export const asDictionary = typeCast(isDictionary);
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
export const asOptDictionary = optTypeCast(isDictionary);
export const asOptFunction = optTypeCast(isFunction);

export const asArrayOf = memoize(<T> (visitor: (obj: unknown) => T): TypeCast<T[]> => {
  return (obj: unknown, fallback?: T[]) => {
    if (isNullish(obj) && typeof fallback !== 'undefined') {
      return fallback;
    }
    return asArray(obj, fallback).map((val: unknown) => visitor(val));
  };
});

export const asDictionaryOf = memoize(<T> (visitor: (obj: unknown) => T): TypeCast<Dictionary<T>> => {
  return (obj: unknown, fallback?: Dictionary<T>) => {
    if (isNullish(obj) && typeof fallback !== 'undefined') {
      return fallback;
    }
    const source = asDictionary(obj);
    const record: Dictionary<T> = {};
    for (const key in source) {
      record[key] = visitor(source[key]);
    }
    return record;
  };
});

export const asOptArrayOf = memoize(<T>(visitor: (obj: unknown) => T): OptionalTypeCast<T[]> => {
  const convert = asArrayOf(visitor);
  return (obj) => {
    if (isNullish(obj)) {
      return undefined;
    }
    return convert(obj);
  };
});

export const asOptDictionaryOf = memoize(<T>(visitor: (obj: unknown) => T): OptionalTypeCast<Dictionary<T>> => {
  const convert = asDictionaryOf(visitor);
  return (obj) => {
    if (isNullish(obj)) {
      return undefined;
    }
    return convert(obj);
  };
});

/** 
 * @deprecated `asRecord` will be removed at a future date, it has been renamed to `asDictionary`.
*/
export const asRecord = asDictionary;
/** 
 * @deprecated `asOptRecord` will be removed at a future date, it has been renamed to `asOptDictionary`.
*/
export const asOptRecord = asOptDictionary;
/** 
 * @deprecated `asArrayRecursive` will be removed at a future date, it has been renamed to `asArrayOf`.
*/
export const asArrayRecursive = asArrayOf;
/** 
 * @deprecated `asRecordRecursive` will be removed at a future date, it has been renamed to `asDictionaryOf`.
*/
export const asRecordRecursive = asDictionaryOf;
/** 
 * @deprecated `asOptArrayRecursive` will be removed at a future date, it has been renamed to `asOptArrayOf`.
*/
export const asOptArrayRecursive = asOptArrayOf;
/** 
 * @deprecated `asOptRecordRecursive` will be removed at a future date, it has been renamed to `asOptDictionaryOf`.
*/
export const asOptRecordRecursive = asOptDictionaryOf;