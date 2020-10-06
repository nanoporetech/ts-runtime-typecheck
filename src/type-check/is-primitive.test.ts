import type { TypeAssert } from '../TypeAssert.type';
import { isArray, isBoolean, isDefined, isFunction, isIndex, isNullish, isNumber, isRecord, isString, isUndefined } from './is-primitive';

describe('is primitive', () => {
  class Dummy {}

  const examples = [
    42,
    'hello',
    true,
    null,
    undefined,
    () => true,
    [],
    {},
    Symbol('bad'),
    new Dummy()
  ];

  function tryExamples<T>(test: TypeAssert<T>, expected: boolean[]) {
    for (let i = 0; i < examples.length; i++) {
      expect(test(examples[i])).toBe(expected[i]);
    }
  }

  it('isRecord', () => {
    tryExamples(isRecord, [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true
    ]);
  });

  it('isFunction', () => {
    tryExamples(isFunction, [
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false
    ]);
  });

  it('isBoolean', () => {
    tryExamples(isBoolean, [
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]);
  });

  it('isString', () => {
    tryExamples(isString, [
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]);
  });

  it('isNumber', () => {
    tryExamples(isNumber, [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]);
  });

  it('isIndex', () => {
    tryExamples(isIndex, [
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]);
  });

  it('isArray', () => {
    tryExamples(isArray, [
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ]);
  });

  it('isUndefined', () => {
    tryExamples(isUndefined, [
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false
    ]);
  });

  it('isNullish', () => {
    tryExamples(isNullish, [
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false
    ]);
  });

  it('isDefined', () => {
    tryExamples(isDefined, [
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      true
    ]);
  });
});