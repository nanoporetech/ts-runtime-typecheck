import type { JSONValue, JSONArray, JSONObject } from '../JSONValue.type';

import { isJSONValue, isJSONArray, isJSONObject } from '../type-check/is-json';
import { optTypeCast, typeCast } from './type-cast';

export const asJSONValue = typeCast('JSONValue', isJSONValue);
/* NOTE: These 2 require some type gymnastics, but that is better than introducing additional runtime complexity.
 * The issue being that we cannot type the test as `<Input, Output> (obj: Input): obj is Output`, because TS will
 * cannot prove Input extends Output, hence `Input` *must* be `unknown`. However, these 2 casts require that the
 * `Input` must be `JSONValue`, this is because validating if unknown is JSONValue is a complex recursive test, 
 * which we want to avoid if possible.
 */
export const asJSONArray: (obj: JSONValue, fallback?: JSONArray) => JSONArray = typeCast('JSONArray', isJSONArray as (obj: unknown) => obj is JSONArray);
export const asJSONObject: (obj: JSONValue, fallback?: JSONObject) => JSONObject = typeCast('JSONObject', isJSONObject as (obj: unknown) => obj is JSONObject);

export const asOptJSONValue = optTypeCast(asJSONValue);
export const asOptJSONArray = optTypeCast(asJSONArray);
export const asOptJSONObject = optTypeCast(asJSONObject);
