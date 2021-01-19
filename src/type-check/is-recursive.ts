import type { Optional } from '../Optional.type';
import type { TypeAssert } from '../TypeAssert.type';
import type { Dictionary } from '../Dictionary.type';

import { memoize } from '../memoize';
import { isArray, isNullish, isRecord } from './is-primitive';

export const isRecordRecursive = memoize(<T> (isType: TypeAssert<T>): TypeAssert<Dictionary<T>> => {
  const result = (obj: unknown): obj is Dictionary<T> => {
    return isRecord(obj) && Object.values(obj).every(isType);
  };
  result.TYPE_NAME = `Dictionary<${isType.TYPE_NAME ?? 'unknown'}>`;
  return result;
});

export const isOptRecordRecursive = memoize(<T> (isType: TypeAssert<T>): TypeAssert<Optional<Dictionary<T>>> => {
  const result = (obj: unknown): obj is Dictionary<T> => {
    return isNullish(obj) || isRecord(obj) && Object.values(obj).every(isType);
  };
  result.TYPE_NAME = `Optional<Dictionary<${isType.TYPE_NAME ?? 'unknown'}>>`;
  return result;
});

export const isArrayRecursive = memoize(<T> (isType: TypeAssert<T>): TypeAssert<T[]> => {
  const result = (obj: unknown): obj is T[] => {
    return isArray(obj) && obj.every(isType);
  };
  result.TYPE_NAME = `${isType.TYPE_NAME ?? 'unknown'}[]`;
  return result;
});

export const isOptArrayRecursive = memoize(<T> (isType: TypeAssert<T>): TypeAssert<Optional<T[]>> => {
  const result = (obj: unknown): obj is T[] => {
    return isNullish(obj) || isArray(obj) && obj.every(isType);
  };
  result.TYPE_NAME = `Optional<${isType.TYPE_NAME ?? 'unknown'}[]>`;
  return result;
});