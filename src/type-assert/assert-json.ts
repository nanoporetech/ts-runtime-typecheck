import { isJSONArray, isJSONObject, isJSONValue, isOptJSONArray, isOptJSONObject, isOptJSONValue } from '../type-check/is-json';
import { invariant } from '../invariant';
import type { JSONValue, JSONArray } from '../JSONValue.type';
import type { Optional } from '../Optional.type';

export function assertJSONValue (value: unknown, label = 'value'): asserts value is JSONValue {
  invariant(isJSONValue(value), `${label} is not a JSONValue`);
}

export function assertJSONArray (value: JSONValue, label = 'value'): asserts value is JSONArray {
  invariant(isJSONArray(value), `${label} is not a JSONArray`);
}

export function assertJSONObject (value: JSONValue, label = 'value'): asserts value is JSONArray {
  invariant(isJSONObject(value), `${label} is not a JSONObject`);
}

export function assertOptJSONValue (value: unknown, label = 'value'): asserts value is Optional<JSONValue> {
  invariant(isOptJSONValue(value), `${label} is not a Optional<JSONValue>`);
}

export function assertOptJSONArray (value: Optional<JSONValue>, label = 'value'): asserts value is Optional<JSONArray> {
  invariant(isOptJSONArray(value), `${label} is not a Optional<JSONArray>`);
}

export function assertOptJSONObject (value: Optional<JSONValue>, label = 'value'): asserts value is Optional<JSONArray> {
  invariant(isOptJSONObject(value), `${label} is not a Optional<JSONObject>`);
}