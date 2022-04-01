import { getTypeName } from './TypeCheck';

it('returns the TYPE_NAME of the check', () => {
  const isType = (v: unknown): v is unknown => v === v;
  isType.TYPE_NAME = 'custom type check';

  expect(getTypeName(isType)).toBe('custom type check');
});

it('returns unknown if the check has no TYPE_NAME', () => {
  const isType = (v: unknown): v is unknown => v === v;

  expect(getTypeName(isType)).toBe('unknown');
});