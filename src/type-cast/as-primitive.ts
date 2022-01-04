import { inspectType } from '../inspectType';
import type { Optional } from '../Optional.type';

import { isString, isNumber, isDefined, isArray, isBoolean, isFunction, isIndex, isDictionary, isIndexable, isPrimitive } from '../type-check/is-primitive';
import { optTypeCast, typeCast } from './type-cast';

export const asString = typeCast(isString);
export const asNumber = typeCast(isNumber);
export const asIndex = typeCast(isIndex);
export const asIndexable = typeCast(isIndexable);
export const asPrimitive = typeCast(isPrimitive);
export const asBoolean = typeCast(isBoolean);
export const asArray = typeCast(isArray);
export const asDictionary = typeCast(isDictionary);
export const asFunction = typeCast(isFunction);

// NOTE this *could* work with the typeCast helper
// but unfortunately generic parameters cannot be preserved
// when a function is placed into a value
export function asDefined<T> (obj: Optional<T>, fallback?: NonNullable<T>): NonNullable<T> {
  if (isDefined(obj)) {
    return obj;
  }
  if (typeof fallback !== 'undefined') {
    return fallback;
  }
  throw new Error(`Unable to cast ${inspectType(obj)} to NonNullable<unknown>`);
}

export const asOptString = optTypeCast(isString);
export const asOptNumber = optTypeCast(isNumber);
export const asOptIndex = optTypeCast(isIndex);
export const asOptIndexable = optTypeCast(isIndexable);
export const asOptPrimitive = optTypeCast(isPrimitive);
export const asOptBoolean = optTypeCast(isBoolean);
export const asOptArray = optTypeCast(isArray);
export const asOptDictionary = optTypeCast(isDictionary);
export const asOptFunction = optTypeCast(isFunction);