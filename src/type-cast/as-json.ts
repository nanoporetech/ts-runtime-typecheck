import type { JSONValue, JSONArray, JSONObject } from '../JSONValue.type';
import type { TypeAssert } from '../TypeAssert.type';

import { isJSONValue, isJSONArray, isJSONObject } from '../type-check/is-json';
import { optTypeCast, typeCast } from './type-cast';
import { OptionalTypeCast, TypeCast } from '../TypeCast.type';

export const asJSONValue = typeCast('JSONValue', isJSONValue);
/* NOTE: These 2 require some type gymnastics, but that is better than introducing additional runtime complexity.
 * The issue being that we cannot type the test as `<Input, Output> (obj: Input): obj is Output`, because TS will
 * cannot prove Input extends Output, hence `Input` *must* be `unknown`. However, these 2 casts require that the
 * `Input` must be `JSONValue`, this is because validating if unknown is JSONValue is a complex recursive test, 
 * which we want to avoid if possible.
 */
const __isJSONArray = isJSONArray as TypeAssert<JSONArray>;
const __isJSONObject = isJSONObject as TypeAssert<JSONObject>;

export const asJSONArray = typeCast('JSONArray', __isJSONArray) as TypeCast<JSONArray, JSONValue>;
export const asJSONObject = typeCast('JSONObject', __isJSONObject) as TypeCast<JSONObject, JSONValue>;

export const asOptJSONValue = optTypeCast('JSONValue', isJSONValue);
export const asOptJSONArray = optTypeCast('JSONArray', __isJSONArray) as OptionalTypeCast<JSONArray, JSONValue>;
export const asOptJSONObject = optTypeCast('JSONObject', __isJSONObject) as OptionalTypeCast<JSONObject, JSONValue>;
