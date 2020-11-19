import type { Indexable } from '../Index.type';
import type { Dictionary } from '../Dictionary.type';
import type { OptionalTypeCast, TypeCast } from '../TypeCast.type';
import type { Optional } from '../Optional.type';

import { isString, isNullish, isNumber, isDefined, isArray, isBoolean, isFunction, isIndex, isRecord } from '../type-check/is-primitive';
import { optTypeCast, typeCast } from './type-cast';
import { memoize } from '../memoize';

export const asString = typeCast('String', isString);
export const asNumber = typeCast('Number', isNumber);
export const asIndex = typeCast('Index', isIndex);
export const asIndexable = typeCast<Indexable>('Indexable', isRecord);
export const asBoolean = typeCast('Boolean', isBoolean);
export const asArray = typeCast('Array', isArray);
export const asRecord = typeCast('Record', isRecord);
export const asFunction = typeCast('Function', isFunction);

// NOTE this *could* work with the typeCast helper
// but unfortunately generic parameters cannot be preserved
// when a function is placed into a value
export function asDefined<T> (obj: Optional<T>, fallback?: T): T {
  if (isDefined(obj)) {
    return obj as T;
  }
  if (typeof fallback !== 'undefined') {
    return fallback;
  }
  throw new Error(`Unable to cast ${typeof obj} to Defined`);
}

export const asOptString = optTypeCast(asString);
export const asOptNumber = optTypeCast(asNumber);
export const asOptIndex = optTypeCast(asIndex);
export const asOptIndexable = optTypeCast(asIndexable);
export const asOptBoolean = optTypeCast(asBoolean);
export const asOptArray = optTypeCast(asArray);
export const asOptRecord = optTypeCast(asRecord);
export const asOptFunction = optTypeCast(asFunction);

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