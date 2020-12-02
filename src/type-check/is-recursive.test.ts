import type { TypeAssert } from '../TypeAssert.type';
import { isString } from './is-primitive';
import { isArrayRecursive, isOptArrayRecursive, isOptRecordRecursive, isRecordRecursive } from './is-recursive';

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

  function tryExamples<T>(test: TypeAssert<T>, expected: boolean[]) {
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

  describe('isRecordRecursive', () => {
    tryExamples(isRecordRecursive(isString), [
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
      expect(isRecordRecursive(isString).TYPE_NAME).toBe('Dictionary<string>');
      expect(isRecordRecursive((_obj: unknown): _obj is unknown => true).TYPE_NAME).toBe('Dictionary<unknown>');
    });
  });

  describe('isOptRecordRecursive', () => {
    tryExamples(isOptRecordRecursive(isString), [
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
      expect(isOptRecordRecursive(isString).TYPE_NAME).toBe('Optional<Dictionary<string>>');
      expect(isOptRecordRecursive((_obj: unknown): _obj is unknown => true).TYPE_NAME).toBe('Optional<Dictionary<unknown>>');
    });
  });

  describe('isArrayRecursive', () => {
    tryExamples(isArrayRecursive(isString), [
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
      expect(isArrayRecursive(isString).TYPE_NAME).toBe('string[]');
      expect(isArrayRecursive((_obj: unknown): _obj is unknown => true).TYPE_NAME).toBe('unknown[]');
    });
  });

  describe('isOptArrayRecursive', () => {
    tryExamples(isOptArrayRecursive(isString), [
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
      expect(isOptArrayRecursive(isString).TYPE_NAME).toBe('Optional<string[]>');
      expect(isOptArrayRecursive((_obj: unknown): _obj is unknown => true).TYPE_NAME).toBe('Optional<unknown[]>');
    });
  });
});