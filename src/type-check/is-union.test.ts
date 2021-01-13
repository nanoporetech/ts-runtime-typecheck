import { isNullish, isNumber, isString } from './is-primitive';
import { isUnion } from './is-union';

describe('isUnion', () => {
  it('accepts a single param', () => {
    expect(isUnion(isString)('hello')).toBeTruthy();
    expect(isUnion(isString)(42)).toBeFalsy();
  });
  it('accepts a multiple params', () => {
    expect(isUnion(isString, isNumber)('hello')).toBeTruthy();
    expect(isUnion(isString, isNumber)(42)).toBeTruthy();
    expect(isUnion(isString, isNumber)(true)).toBeFalsy();
    expect(isUnion(isString, isNumber, isNullish)(null)).toBeTruthy();
  });
});