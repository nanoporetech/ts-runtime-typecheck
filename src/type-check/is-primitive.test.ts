import type { TypeAssert } from '../TypeAssert.type';
import { isArray, isBoolean, isDefined, isDictionary, isFunction, isIndex, isIndexable, isNullish, isNumber, isOptArray, isOptBoolean, isOptDictionary, isOptFunction, isOptIndex, isOptIndexable, isOptNumber, isOptString, isString, isUndefined } from './is-primitive';

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

  it('isDictionary', () => {
    tryExamples(isDictionary, [
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

  it('isOptDictionary', () => {
    tryExamples(isOptDictionary, [
      false,
      false,
      false,
      true,
      true,
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

  it('isOptFunction', () => {
    tryExamples(isOptFunction, [
      false,
      false,
      false,
      true,
      true,
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

  it('isOptBoolean', () => {
    tryExamples(isOptBoolean, [
      false,
      false,
      true,
      true,
      true,
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

  it('isOptString', () => {
    tryExamples(isOptString, [
      false,
      true,
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

  it('isOptNumber', () => {
    tryExamples(isOptNumber, [
      true,
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

  it('isOptIndex', () => {
    tryExamples(isOptIndex, [
      true,
      true,
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

  it('isIndexable', () => {
    tryExamples(isIndexable, [
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      true
    ]);
  });

  it('isOptIndexable', () => {
    tryExamples(isOptIndexable, [
      false,
      false,
      false,
      true,
      true,
      false,
      true,
      true,
      false,
      true
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

  it('isOptArray', () => {
    tryExamples(isOptArray, [
      false,
      false,
      false,
      true,
      true,
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