import type { Indexable } from '../Index.type';
import type { Dictionary } from '../Dictionary.type';
import type { OptionalTypeCast, TypeCast } from '../TypeCast.type';
import type { Optional } from '../Optional.type';

import { isString, isNullish, isNumber, isDefined, isArray, isBoolean, isFunction, isIndex, isRecord } from '../type-check/is-primitive';
import { optTypeCast, typeCast } from './type-cast';
import { memoize } from '../memoize';

export const asString = typeCast('string', isString);
export const asNumber = typeCast('number', isNumber);
export const asIndex = typeCast('Index', isIndex);
export const asIndexable = typeCast<Indexable>('Indexable', isRecord);
export const asBoolean = typeCast('boolean', isBoolean);
export const asArray = typeCast('unknown[]', isArray);
export const asRecord = typeCast('Dictionary', isRecord);
export const asFunction = typeCast('UnknownFunction', isFunction);

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

export const asOptString = optTypeCast('string', isString);
export const asOptNumber = optTypeCast('number', isNumber);
export const asOptIndex = optTypeCast('Index', isIndex);
export const asOptIndexable = optTypeCast<unknown, Indexable>('Indexable', isRecord);
export const asOptBoolean = optTypeCast('boolean', isBoolean);
export const asOptArray = optTypeCast('unknown[]', isArray);
export const asOptRecord = optTypeCast('Dictionary', isRecord);
export const asOptFunction = optTypeCast('UnknownFunction', isFunction);

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