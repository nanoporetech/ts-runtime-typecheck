import { TypeAssertion } from './TypeAssertion';

export function invariant (isValid: boolean, msg: string): asserts isValid {
  if (!isValid) {
    throw new TypeAssertion(msg);
  }
}
