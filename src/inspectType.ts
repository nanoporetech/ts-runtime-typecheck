import type { Dictionary } from './Dictionary.type';
import { stringifyDefinition } from './stringifyDefinition';

export interface InspectTypeOptions {
  maxDepth?: number;
}

export function inspectType (value: unknown, opts: InspectTypeOptions = {}): string {
  const { maxDepth = 3 } = opts;

  if (typeof value !== 'object') {
    return typeof value;
  }
  
  if (value === null) {
    return 'null';
  }
  
  if (Array.isArray(value)) {
    // TODO give some indication of the interior type and length
    // this is harder than it seems because the interior
    // could be complex types, or a union of multiple types
    return 'Array';
  }
  
  if (value.constructor.name !== 'Object') {
    return value.constructor.name;
  }
  
  if (maxDepth <= 0) {
    return 'Dictionary';
  }

  // We construct a definition by recursively calling inspectType on the elements of the Dictionary
  const result: Dictionary<string> = {};
  // reduce the depth limit by 1 when we recurse
  const nestedOptions = { ...opts, maxDepth: maxDepth - 1 };

  for (const [k, v] of Object.entries(value)) {
    result[k] = inspectType(v, nestedOptions);
  }

  // Then serialise the definition
  return stringifyDefinition(result);
}