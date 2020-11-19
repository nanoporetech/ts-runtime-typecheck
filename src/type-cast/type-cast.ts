import type { Optional } from '../Optional.type';
import type { TypeAssert } from '../TypeAssert.type';
import type { OptionalTypeCast } from '../TypeCast.type';

import { isNullish } from '../type-check/is-primitive';

export function optTypeCast<Input, Output> (typename: string, isType: TypeAssert<Output>): OptionalTypeCast<Output, Optional<Input>> {
  return (obj: Optional<Input>) => {
    if (isNullish(obj)) {
      return undefined;
    }
    if (isType(obj)) {
      return obj as Output;
    }
    throw new Error(`Unable to cast ${typeof obj} to Optional<${typename}>`);
  };
}

export function typeCast<Output> (typename: string, isType: TypeAssert<Output>): (obj: unknown, fallback?: Output) => Output {
  return (obj: unknown, fallback?: Output) => {
    if (isType(obj)) {
      return obj as Output;
    }
    if (isNullish(obj) && typeof fallback !== 'undefined') {
      return fallback;
    }
    throw new Error(`Unable to cast ${typeof obj} to ${typename}`);
  };
}