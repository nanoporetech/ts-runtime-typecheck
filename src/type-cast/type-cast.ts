import type { Optional } from '../Optional.type';
import type { TypeCheck } from '../TypeCheck.type';
import type { OptionalTypeCast } from '../TypeCast.type';

import { isNullish } from '../type-check/is-primitive';
import { inspectType } from '../inspectType';

export function optTypeCast<Input, Output> (isType: TypeCheck<Output>): OptionalTypeCast<Output, Optional<Input>> {
  return (obj: Optional<Input>) => {
    if (isNullish(obj)) {
      return undefined;
    }
    if (isType(obj)) {
      return obj;
    }
    throw new Error(`Unable to cast ${inspectType(obj)} to Optional<${isType.TYPE_NAME ?? 'unknown'}>`);
  };
}

export function typeCast<Output> (isType: TypeCheck<Output>): (obj: unknown, fallback?: Output) => Output {
  return (obj: unknown, fallback?: Output) => {
    if (isType(obj)) {
      return obj;
    }
    if (isNullish(obj) && typeof fallback !== 'undefined') {
      return fallback;
    }
    throw new Error(`Unable to cast ${inspectType(obj)} to ${isType.TYPE_NAME ?? 'unknown'}`);
  };
}