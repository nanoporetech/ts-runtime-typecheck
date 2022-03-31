import { optTypeCast, typeCast } from './type-cast';

describe('typeCast', () => {
  const passingTestFn = (obj: unknown): obj is unknown => obj === obj;
  passingTestFn.TYPE_NAME = 'PassingTest';
  const passingCastFn = typeCast(passingTestFn);
  const failingTestFn = (obj: unknown): obj is unknown => obj !== obj;
  failingTestFn.TYPE_NAME = 'FailingTest';
  const failingCastFn = typeCast(failingTestFn);

  it('emits value with passing test', () => {
    expect(passingCastFn(12)).toBe(12);
  });

  it('throws with failing test', () => {
    expect(() => failingCastFn(12)).toThrow('Unable to cast number to FailingTest');
  });

  it('throws for nullish value with no fallback', () => {
    expect(() => failingCastFn(undefined)).toThrow('Unable to cast undefined to FailingTest');
  });

  it('emits for nullish value with fallback', () => {
    expect(failingCastFn(undefined, 12)).toBe(12);
  });

  const failingTestNoLabelFn = (obj: unknown): obj is unknown => obj !== obj;
  const failingCastNoLabelFn = typeCast(failingTestNoLabelFn);

  it('throws "unknown" with failing test and no label', () => {
    expect(() => failingCastNoLabelFn(12)).toThrow('Unable to cast number to unknown');
  });
});

describe('optTypeCast', () => {
  const passingTestFn = (obj: unknown): obj is unknown => obj === obj;
  passingTestFn.TYPE_NAME = 'PassingTest';
  const passingCastFn = optTypeCast(passingTestFn);
  const failingTestFn = (obj: unknown): obj is unknown => obj !== obj;
  failingTestFn.TYPE_NAME = 'FailingTest';
  const failingCastFn = optTypeCast(failingTestFn);

  it('emits value with passing test', () => {
    expect(passingCastFn(12)).toBe(12);
  });

  it('throws with failing test', () => {
    expect(() => failingCastFn(12)).toThrow('Unable to cast number to Optional<FailingTest>');
  });

  it('emits for nullish value with failing test', () => {
    expect(failingCastFn(undefined)).toBe(undefined);
  });

  it('convert null to undefined', () => {
    expect(failingCastFn(null)).toBe(undefined);
  });

  const failingTestNoLabelFn = (obj: unknown): obj is unknown => obj !== obj;
  const failingCastNoLabelFn = optTypeCast(failingTestNoLabelFn);

  it('throws "unknown" with failing test and no label', () => {
    expect(() => failingCastNoLabelFn(12)).toThrow('Unable to cast number to Optional<unknown>');
  });
});