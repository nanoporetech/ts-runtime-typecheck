import { optTypeCast, typeCast } from './type-cast';

describe('typeCast', () => {
  const passing_test_fn = (_obj: unknown): _obj is unknown => true;
  const passing_cast_fn = typeCast('PassingTest', passing_test_fn);
  const failing_test_fn = (_obj: unknown): _obj is unknown => false;
  const failing_cast_fn = typeCast('FailingTest', failing_test_fn);

  it('emits value with passing test', () => {
    expect(passing_cast_fn(12)).toBe(12);
  });

  it('throws with failing test', () => {
    expect(() => failing_cast_fn(12)).toThrow('Unable to cast number to FailingTest');
  });

  it('throws for nullish value with no fallback', () => {
    expect(() => failing_cast_fn(undefined)).toThrow('Unable to cast undefined to FailingTest');
  });

  it('emits for nullish value with fallback', () => {
    expect(failing_cast_fn(undefined, 12)).toBe(12);
  });
});

describe('optTypeCast', () => {
  const passing_test_fn = (_obj: unknown): _obj is unknown => true;
  const passing_cast_fn = optTypeCast(typeCast('PassingTest', passing_test_fn));
  const failing_test_fn = (_obj: unknown): _obj is unknown => false;
  const failing_cast_fn = optTypeCast(typeCast('FailingTest', failing_test_fn));

  it('emits value with passing test', () => {
    expect(passing_cast_fn(12)).toBe(12);
  });

  it('throws with failing test', () => {
    expect(() => failing_cast_fn(12)).toThrow('Unable to cast number to FailingTest');
  });

  it('emits for nullish value with failing test', () => {
    expect(failing_cast_fn(undefined)).toBe(undefined);
  });

  it('convert null to undefined', () => {
    expect(failing_cast_fn(null)).toBe(undefined);
  });
});