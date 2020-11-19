import type { JSONArray, JSONObject, JSONValue } from '../JSONValue.type';
import type { Optional } from '../Optional.type';

import { isNullish } from './is-primitive';

export function isJSONValue(val: unknown): val is JSONValue {
  // WARN this is recursive and will blow the stack on a circular object
  switch (typeof val) {
  case 'string':
  case 'number':
  case 'boolean':
    return true;
  case 'object': {
    if (val === null) {
      return true;
    }
    if (Array.isArray(val)) {
      return val.every(isJSONValue);
    }
    return Object.values(val).every(isJSONValue);
  }
  }
  return false;
}
isJSONValue.TYPE_NAME = 'JSONValue';

export function isOptJSONValue(val: unknown): val is Optional<JSONValue> {
  return isNullish(val) || isJSONValue(val);
}
isOptJSONValue.TYPE_NAME = 'Optional<JSONValue>';

export function isJSONArray(val: JSONValue): val is JSONArray {
  return Array.isArray(val);
}
isJSONArray.TYPE_NAME = 'JSONArray';

export function isJSONObject(val: JSONValue): val is JSONObject {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}
isJSONObject.TYPE_NAME = 'JSONObject';
