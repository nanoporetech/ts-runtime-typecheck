import type { Indexable } from '../Index.type';
import type { ObjectDict } from '../ObjectDict.type';
import type { OptionalTypeCast, TypeCast } from '../TypeCast.type';
import type { UnknownFunction } from '../UnknownFunction.type';

import { isString, isNullish, isNumber, isDefined, isArray, isBoolean, isFunction, isIndex, isRecord } from '../type-check/is-primitive';
import { optTypeCast, typeCast } from './type-cast';

export const asString = typeCast('String', isString);
export const asNumber = typeCast('Number', isNumber);
export const asDefined = typeCast('Defined', isDefined);
export const asIndex = typeCast('Index', isIndex);
export const asIndexable = typeCast<Indexable>('Indexable', isRecord);
export const asBoolean = typeCast('Boolean', isBoolean);
export const asArray = typeCast('Array', isArray);
export const asRecord = typeCast('Record', isRecord);
export const asFunction = typeCast('Function', isFunction);

export const asOptString = optTypeCast(asString);
export const asOptNumber = optTypeCast(asNumber);
export const asOptIndex = optTypeCast(asIndex);
export const asOptIndexable = optTypeCast(asIndexable);
export const asOptBoolean = optTypeCast(asBoolean);
export const asOptArray = optTypeCast(asArray);
export const asOptRecord = optTypeCast(asRecord);
export const asOptFunction = optTypeCast(asFunction);

function memoize<P extends UnknownFunction, R> (fn: (par: P) => R): (par: P) => R {
  const map: WeakMap<P, R> = new WeakMap();
  return (par: P) => {
    let result = map.get(par);
    if (!result) {
      result = fn(par);
      map.set(par, result);
    }
    return result;
  };
}

export const asArrayRecursive = memoize(<T> (visitor: (obj: unknown) => T): TypeCast<T[]> => {
  return (obj: unknown, fallback?: T[]) => {
    if (isNullish(obj) && typeof fallback !== 'undefined') {
      return fallback;
    }
    return asArray(obj, fallback).map((val: unknown) => visitor(val));
  };
});

export const asRecordRecursive = memoize(<T> (visitor: (obj: unknown) => T): TypeCast<ObjectDict<T>> => {
  return (obj: unknown, fallback?: ObjectDict<T>) => {
    if (isNullish(obj) && typeof fallback !== 'undefined') {
      return fallback;
    }
    const source = asRecord(obj);
    const record: ObjectDict<T> = {};
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

export const asOptRecordRecursive = memoize(<T>(visitor: (obj: unknown) => T): OptionalTypeCast<ObjectDict<T>> => {
  const convert = asRecordRecursive(visitor);
  return (obj) => {
    if (isNullish(obj)) {
      return undefined;
    }
    return convert(obj);
  };
});