import { invariant } from '../invariant';
import type { Optional } from '../Optional.type';
import { isDefined } from '../type-check/is-primitive';

export function assertDefined<T> (value: Optional<T>, label = 'value'): asserts value is NonNullable<T> {
  invariant(isDefined(value), `${label} is not defined`);
}