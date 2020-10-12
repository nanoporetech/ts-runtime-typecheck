import type { Optional } from '../Optional.type';
import type { TypeAssert } from '../TypeAssert.type';
import type { OptionalTypeCast, TypeCast } from '../TypeCast.type';

import { isNullish } from '../type-check/is-primitive';

export function optTypeCast<Input, Output> (test: TypeCast<Output, Input>): OptionalTypeCast<Output, Optional<Input>> {
  return (obj: Input | undefined) => {
    if (isNullish(obj)) {
      return undefined;
    }
    return test(obj);
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