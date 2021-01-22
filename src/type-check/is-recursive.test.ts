import type { TypeCheck } from '../TypeCheck.type';
import { isString } from './is-primitive';
import { isArrayOf, isDictionaryOf, isOptArrayOf, isOptDictionaryOf } from './is-recursive';

describe('is primitive', () => {
  class Dummy {}

  const examples: unknown[] = [
    42,
    'hello',
    true,
    () => true,
    Symbol('bad'),
    new Dummy(),

    null,
    undefined,
    
    [],
    [ 'a', 'b', 'c' ],
    [ 1, 2, 3 ],
    [ 'a', 'b', 3 ],

    {},
    {
      a: 'a', b: 'b', c: 'c'
    },
    {
      a: 1, b: 2, c: 3
    },
    {
      a: 'a', b: 'b', c: 3
    },
  ];

  function tryExamples<T>(test: TypeCheck<T>, expected: boolean[]) {
    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const passes = expected[i];
      let label = '';
      switch (typeof example) {
      case 'symbol':
        label = example.toString();
        break;
      case 'object':
        if (example === null) {
          label = 'null';
        }
        else {
          label = JSON.stringify(example);
        }
        break;
      default:
        label = example + '';
        break;
      }
      it(`${label} is ${test.TYPE_NAME} === ${passes}`, () => {
        expect(test(example)).toBe(passes);
      });
    }
  }

  describe('isDictionaryOf', () => {
    tryExamples(isDictionaryOf(isString), [
      false,
      false,
      false,
      false,
      false,
      true,

      false,
      false,

      false,
      false,
      false,
      false,

      true,
      true,
      false,
      false,
    ]);

    it('uses correct labels', () => {
      expect(isDictionaryOf(isString).TYPE_NAME).toBe('Dictionary<string>');
      expect(isDictionaryOf((_obj: unknown): _obj is unknown => true).TYPE_NAME).toBe('Dictionary<unknown>');
    });
  });

  describe('isOptDictionaryOf', () => {
    tryExamples(isOptDictionaryOf(isString), [
      false,
      false,
      false,
      false,
      false,
      true,

      true,
      true,

      false,
      false,
      false,
      false,

      true,
      true,
      false,
      false,
    ]);

    it('uses correct labels', () => {
      expect(isOptDictionaryOf(isString).TYPE_NAME).toBe('Optional<Dictionary<string>>');
      expect(isOptDictionaryOf((_obj: unknown): _obj is unknown => true).TYPE_NAME).toBe('Optional<Dictionary<unknown>>');
    });
  });

  describe('isArrayOf', () => {
    tryExamples(isArrayOf(isString), [
      false,
      false,
      false,
      false,
      false,
      false,

      false,
      false,

      true,
      true,
      false,
      false,

      false,
      false,
      false,
      false,
    ]);

    it('uses correct labels', () => {
      expect(isArrayOf(isString).TYPE_NAME).toBe('string[]');
      expect(isArrayOf((_obj: unknown): _obj is unknown => true).TYPE_NAME).toBe('unknown[]');
    });
  });

  describe('isOptArrayOf', () => {
    tryExamples(isOptArrayOf(isString), [
      false,
      false,
      false,
      false,
      false,
      false,

      true,
      true,

      true,
      true,
      false,
      false,

      false,
      false,
      false,
      false,
    ]);

    it('uses correct labels', () => {
      expect(isOptArrayOf(isString).TYPE_NAME).toBe('Optional<string[]>');
      expect(isOptArrayOf((_obj: unknown): _obj is unknown => true).TYPE_NAME).toBe('Optional<unknown[]>');
    });
  });
});