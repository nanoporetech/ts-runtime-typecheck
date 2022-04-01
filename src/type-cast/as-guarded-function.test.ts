import { isNullish, isNumber, isOptNumber, isUndefined } from '../type-check/is-primitive';
import type { UnknownFunction } from '../UnknownFunction.type';
import { asGuardedFunction } from './as-guarded-function';

it('accepts a function', () => {
  asGuardedFunction(() => { null; }, isUndefined);
});

it('throws if a non-function value is passed', () => {
  expect(() => asGuardedFunction(42, isUndefined)).toThrow('value is not a UnknownFunction');
});

it('wrapped function throws if the return value is the wrong type', () => {
  const guarded = asGuardedFunction(() => 'hello', isNumber);
  expect(() => guarded()).toThrow('');
});

it('wrapped function throws if an argument is the wrong type', () => {
  const guarded = asGuardedFunction((val: number) => val * 2, isNumber, isNumber) as UnknownFunction;
  expect(() => guarded('hi')).toThrow('');
});

it('wrapped function allows arguments to be undefined for optional checks', () => {
  const guarded = asGuardedFunction((val?: number) => val, isOptNumber, isOptNumber);
  guarded(undefined);
});

it('wrapped function throws if more arguments are provided than params', () => {
  const guarded = asGuardedFunction(() => null, isNullish) as UnknownFunction;
  expect(() => guarded(42)).toThrow('');
});

it('passes through the return value if the correct type', () => {
  const guarded = asGuardedFunction(() => 42, isNumber);
  expect(guarded()).toEqual(42);
});