import { TypeAssertion } from './TypeAssertion';

export function invariant (condition: boolean, msg: string): asserts condition {
  if (!condition) {
    throw new TypeAssertion(msg);
  }
}
