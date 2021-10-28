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
const unsafeIsJSONArray = isJSONArray as TypeCheck<JSONArray>;
const unsafeIsJSONObject = isJSONObject as TypeCheck<JSONObject>;

export const asJSONArray = typeCast(unsafeIsJSONArray) as TypeCast<JSONArray, JSONValue>;
export const asJSONObject = typeCast(unsafeIsJSONObject) as TypeCast<JSONObject, JSONValue>;

export const asOptJSONValue = optTypeCast(isJSONValue);
export const asOptJSONArray = optTypeCast(unsafeIsJSONArray) as OptionalTypeCast<JSONArray, JSONValue>;
export const asOptJSONObject = optTypeCast(unsafeIsJSONObject) as OptionalTypeCast<JSONObject, JSONValue>;
