import { isNumber, isString } from '../type-check/is-primitive';
import { asOptUnion, asUnion } from './as-union';

describe('asUnion', () => {
  it('accepts a single param', () => {
    const cast = asUnion(isString);
    expect(cast('hello')).toBe('hello');
    expect(() => cast(42)).toThrow('Unable to cast number to string');
  });
  it('accepts a multiple params', () => {
    const cast = asUnion(isString, isNumber);

    expect(cast('hello')).toBe('hello');
    expect(cast(42)).toBe(42);
    expect(() => cast(null)).toThrow('Unable to cast null to string | number');
  });
});
describe('asOptUnion', () => {
  it('accepts a single param', () => {
    const cast = asOptUnion(isString);

    expect(cast('hello')).toBe('hello');
    expect(() => cast(42)).toThrow('Unable to cast number to Optional<string>');
    expect(cast(null)).toBe(undefined);
    expect(cast(undefined)).toBe(undefined);
  });
  it('accepts a multiple params', () => {
    const cast = asOptUnion(isString, isNumber);

    expect(cast('hello')).toBe('hello');
    expect(cast(42)).toBe(42);
    expect(() => cast(true)).toThrow('Unable to cast boolean to Optional<string | number>');
    
    expect(cast(null)).toBe(undefined);
    expect(cast(undefined)).toBe(undefined);
  });
});