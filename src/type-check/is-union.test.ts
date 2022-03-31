import { isNullish, isNumber, isString } from './is-primitive';
import { isOptUnion, isUnion } from './is-union';

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
  it('accepts test with no TYPE_NAME', () => {
    expect(isUnion((n: unknown): n is number => n === n).TYPE_NAME).toBe('unknown');
  });
});
describe('isOptUnion', () => {
  it('accepts a single param', () => {
    expect(isOptUnion(isString)('hello')).toBeTruthy();
    expect(isOptUnion(isString)(42)).toBeFalsy();
    expect(isOptUnion(isString)(null)).toBeTruthy();
    expect(isOptUnion(isString)(undefined)).toBeTruthy();
  });
  it('accepts a multiple params', () => {
    expect(isOptUnion(isString, isNumber)('hello')).toBeTruthy();
    expect(isOptUnion(isString, isNumber)(42)).toBeTruthy();
    expect(isOptUnion(isString, isNumber)(true)).toBeFalsy();
    
    expect(isOptUnion(isString, isNumber)(null)).toBeTruthy();
    expect(isOptUnion(isString, isNumber)(undefined)).toBeTruthy();
    expect(isOptUnion(isNullish)(undefined)).toBeTruthy();
  });
  it('accepts test with no TYPE_NAME', () => {
    expect(isOptUnion((n: unknown): n is number => n === n).TYPE_NAME).toBe('Optional<unknown>');
  });
});