import type { JSONValue, JSONArray, JSONObject } from '../JSONValue.type';
import type { TypeCheck } from '../TypeCheck.type';
import type { OptionalTypeCast, TypeCast } from '../TypeCast.type';

import { isJSONValue, isJSONArray, isJSONObject } from '../type-check/is-json';
import { optTypeCast, typeCast } from './type-cast';

export const asJSONValue = typeCast(isJSONValue);
/* NOTE: These 2 require some type gymnastics, but that is better than introducing additional runtime complexity.
 * The issue being that we cannot type the test as `<Input, Output> (obj: Input): obj is Output`, because TS will
 * cannot prove Input extends Output, hence `Input` *must* be `unknown`. However, these 2 casts require that the
 * `Input` must be `JSONValue`, this is because validating if unknown is JSONValue is a complex recursive test, 
 * which we want to avoid if possible.
 */
const __isJSONArray = isJSONArray as TypeCheck<JSONArray>;
const __isJSONObject = isJSONObject as TypeCheck<JSONObject>;

export const asJSONArray = typeCast(__isJSONArray) as TypeCast<JSONArray, JSONValue>;
export const asJSONObject = typeCast(__isJSONObject) as TypeCast<JSONObject, JSONValue>;

export const asOptJSONValue = optTypeCast(isJSONValue);
export const asOptJSONArray = optTypeCast(__isJSONArray) as OptionalTypeCast<JSONArray, JSONValue>;
export const asOptJSONObject = optTypeCast(__isJSONObject) as OptionalTypeCast<JSONObject, JSONValue>;
