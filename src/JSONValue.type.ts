export type JSONValue = string | null | number | boolean | JSONObject | JSONArray;
export type JSONArray = Array<JSONValue>;
export interface JSONObject {
  [key: string]: JSONValue;
}
