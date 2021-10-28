import { invariant } from './invariant';
import { TypeAssertion } from './TypeAssertion';

it('throws with a falsy value', () => {
  expect(() => invariant(false, 'message A')).toThrow('message A');
});

it('does not throw with a truthy value', () => {
  invariant(true, 'message B');
});

it('throws a type assertion', () => {
  try {
    invariant(false, 'message C');
    throw 'spanner';
  } catch (error) {
    expect(error).toBeInstanceOf(TypeAssertion);
  }
});

it('uses the provided error for the message', () => {
  expect(() => invariant(false, 'this is a possible error message')).toThrow('this is a possible error message');
});