import type { Indexable } from '../Index.type';
import type { ObjectDict } from '../ObjectDict.type';

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

export function asArrayRecursive<T>(obj: unknown, visitor: (obj: unknown) => T, fallback?: T[]): T[] {
  if (isNullish(obj) && typeof fallback !== 'undefined') {
    return fallback;
  }
  return asArray(obj, fallback).map((val: unknown) => visitor(val));
}

export function asRecordRecursive<T>(
  obj: unknown,
  visitor: (obj: unknown) => T,
  fallback?: ObjectDict<T>,
): ObjectDict<T> {
  if (isNullish(obj) && typeof fallback !== 'undefined') {
    return fallback;
  }
  const source = asRecord(obj);
  const record: ObjectDict<T> = {};
  for (const key in source) {
    record[key] = visitor(source[key]);
  }
  return record;
}

export function asOptArrayRecursive<T>(obj: unknown, visitor: (obj: unknown) => T): T[] | undefined {
  if (isNullish(obj)) {
    return undefined;
  }
  return asArrayRecursive(obj, visitor);
}

export function asOptRecordRecursive<T>(obj: unknown, visitor: (obj: unknown) => T): ObjectDict<T> | undefined {
  if (isNullish(obj)) {
    return undefined;
  }
  return asRecordRecursive(obj, visitor);
}