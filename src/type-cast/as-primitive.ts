import type { Indexable } from '../Index.type';
import type { ObjectDict } from '../ObjectDict.type';

import { isString, isNullish, isNumber, isDefined, isArray, isBoolean, isFunction, isIndex, isRecord } from '../type-check/is-primitive';
import { UnknownFunction } from '../UnknownFunction.type';
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

const arrayMemo: WeakMap<UnknownFunction, UnknownFunction> = new WeakMap();
const recordMemo: WeakMap<UnknownFunction, UnknownFunction> = new WeakMap();

export function asArrayRecursive<T>(visitor: (obj: unknown) => T): (obj: unknown, fallback?: T[]) => T[] {
  let fn: unknown = arrayMemo.get(visitor);
  if (!fn) {

    fn = (obj: unknown, fallback?: T[]) => {
      if (isNullish(obj) && typeof fallback !== 'undefined') {
        return fallback;
      }
      return asArray(obj, fallback).map((val: unknown) => visitor(val));
    };

    arrayMemo.set(visitor, fn as UnknownFunction);
  }
  return fn as (obj: unknown, fallback?: T[]) => T[];
}

export function asRecordRecursive<T>(
  visitor: (obj: unknown) => T
): (obj: unknown, fallback?: ObjectDict<T>) => ObjectDict<T> {
  let fn: unknown = recordMemo.get(visitor);
  if (!fn) {

    fn = (obj: unknown, fallback?: ObjectDict<T>) => {
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
    
    recordMemo.set(visitor, fn as UnknownFunction);
  }
  return fn as (obj: unknown, fallback?: ObjectDict<T>) => ObjectDict<T>;
}

export function asOptArrayRecursive<T>(visitor: (obj: unknown) => T): (obj: unknown) => T[] | undefined {
  const convert = asArrayRecursive(visitor);
  return (obj) => {
    if (isNullish(obj)) {
      return undefined;
    }
    return convert(obj);
  };
}

export function asOptRecordRecursive<T>(visitor: (obj: unknown) => T): (obj: unknown) => ObjectDict<T> | undefined {
  const convert = asRecordRecursive(visitor);
  return (obj) => {
    if (isNullish(obj)) {
      return undefined;
    }
    return convert(obj);
  };
}