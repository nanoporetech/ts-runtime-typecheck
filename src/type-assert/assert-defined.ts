import type { Optional } from '../Optional.type';
import { isDefined } from '../type-check/is-primitive';
import { TypeAssertion } from '../TypeAssertion';

export function assertDefined<T> (value: Optional<T>, label = 'value'): asserts value is NonNullable<T> {
  if (!isDefined(value)) {
    throw new TypeAssertion(`${label} is not defined`);
  }
}