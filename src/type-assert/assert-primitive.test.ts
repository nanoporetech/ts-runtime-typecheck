
import {
  assertBoolean,
  assertArray,
  assertDictionary,
  assertFunction,
  assertIndex,
  assertIndexable,
  assertNumber,
  assertPrimitive,
  assertString,
  assertOptArray,
  assertOptBoolean,
  assertOptDictionary,
  assertOptFunction,
  assertOptIndex,
  assertOptIndexable,
  assertOptNumber,
  assertOptPrimitive,
  assertOptString,
} from './assert-primitive';

const fn = () => false;

it('assertNumber', () => {
  // intended
  assertNumber(12);
  // should fail
  expect(() => assertNumber('hi')).toThrow('value is not a number');
  expect(() => assertNumber(false)).toThrow('value is not a number');
  expect(() => assertNumber([])).toThrow('value is not a number');
  expect(() => assertNumber({})).toThrow('value is not a number');
  expect(() => assertNumber(fn)).toThrow('value is not a number');
  expect(() => assertNumber(undefined)).toThrow('value is not a number');
  expect(() => assertNumber(null)).toThrow('value is not a number');
  // custom label
  expect(() => assertNumber(undefined, 'Easter Egg')).toThrow('Easter Egg is not a number');
});

it('assertString', () => {
  // intended
  assertString('hi');
  // should fail
  expect(() => assertString(12)).toThrow('value is not a string');
  expect(() => assertString(false)).toThrow('value is not a string');
  expect(() => assertString([])).toThrow('value is not a string');
  expect(() => assertString({})).toThrow('value is not a string');
  expect(() => assertString(fn)).toThrow('value is not a string');
  expect(() => assertString(undefined)).toThrow('value is not a string');
  expect(() => assertString(null)).toThrow('value is not a string');
  // custom label
  expect(() => assertString(undefined, 'Easter Egg')).toThrow('Easter Egg is not a string');
});

it('assertBoolean', () => {
  // intended
  assertBoolean(false);
  // should fail
  expect(() => assertBoolean(12)).toThrow('value is not a boolean');
  expect(() => assertBoolean('hi')).toThrow('value is not a boolean');
  expect(() => assertBoolean([])).toThrow('value is not a boolean');
  expect(() => assertBoolean({})).toThrow('value is not a boolean');
  expect(() => assertBoolean(fn)).toThrow('value is not a boolean');
  expect(() => assertBoolean(undefined)).toThrow('value is not a boolean');
  expect(() => assertBoolean(null)).toThrow('value is not a boolean');
  // custom label
  expect(() => assertBoolean(undefined, 'Easter Egg')).toThrow('Easter Egg is not a boolean');
});

it('assertIndex', () => {
  // intended
  assertIndex('hi');
  assertIndex(12);

  // should fail
  expect(() => assertIndex(false)).toThrow('value is not a Index');
  expect(() => assertIndex([])).toThrow('value is not a Index');
  expect(() => assertIndex({})).toThrow('value is not a Index');
  expect(() => assertIndex(fn)).toThrow('value is not a Index');
  expect(() => assertIndex(undefined)).toThrow('value is not a Index');
  expect(() => assertIndex(null)).toThrow('value is not a Index');
  // custom label
  expect(() => assertIndex(undefined, 'Easter Egg')).toThrow('Easter Egg is not a Index');
});

it('assertPrimitive', () => {
  // intended
  assertPrimitive('hi');
  assertPrimitive(12);
  assertPrimitive(false);

  // should fail
  expect(() => assertPrimitive([])).toThrow('value is not a Primitive');
  expect(() => assertPrimitive({})).toThrow('value is not a Primitive');
  expect(() => assertPrimitive(fn)).toThrow('value is not a Primitive');
  expect(() => assertPrimitive(undefined)).toThrow('value is not a Primitive');
  expect(() => assertPrimitive(null)).toThrow('value is not a Primitive');
  // custom label
  expect(() => assertPrimitive(undefined, 'Easter Egg')).toThrow('Easter Egg is not a Primitive');
});

it('assertArray', () => {
  // intended
  assertArray([]);
  // should fail
  expect(() => assertArray('hi')).toThrow('value is not a unknown[]');
  expect(() => assertArray(false)).toThrow('value is not a unknown[]');
  expect(() => assertArray(12)).toThrow('value is not a unknown[]');
  expect(() => assertArray({})).toThrow('value is not a unknown[]');
  expect(() => assertArray(fn)).toThrow('value is not a unknown[]');
  expect(() => assertArray(undefined)).toThrow('value is not a unknown[]');
  expect(() => assertArray(null)).toThrow('value is not a unknown[]');
  // custom label
  expect(() => assertArray(undefined, 'Easter Egg')).toThrow('Easter Egg is not a unknown[]');
});

it('assertDictionary', () => {
  // intended
  assertDictionary({});
  // should fail
  expect(() => assertDictionary('hi')).toThrow('value is not a Dictionary');
  expect(() => assertDictionary(false)).toThrow('value is not a Dictionary');
  expect(() => assertDictionary(12)).toThrow('value is not a Dictionary');
  expect(() => assertDictionary([])).toThrow('value is not a Dictionary');
  expect(() => assertDictionary(fn)).toThrow('value is not a Dictionary');
  expect(() => assertDictionary(undefined)).toThrow('value is not a Dictionary');
  expect(() => assertDictionary(null)).toThrow('value is not a Dictionary');
  // custom label
  expect(() => assertDictionary(undefined, 'Easter Egg')).toThrow('Easter Egg is not a Dictionary');
});

it('assertFunction', () => {
  // intended
  assertFunction(fn);
  // should fail
  expect(() => assertFunction('hi')).toThrow('value is not a UnknownFunction');
  expect(() => assertFunction(false)).toThrow('value is not a UnknownFunction');
  expect(() => assertFunction(12)).toThrow('value is not a UnknownFunction');
  expect(() => assertFunction({})).toThrow('value is not a UnknownFunction');
  expect(() => assertFunction([])).toThrow('value is not a UnknownFunction');
  expect(() => assertFunction(undefined)).toThrow('value is not a UnknownFunction');
  expect(() => assertFunction(null)).toThrow('value is not a UnknownFunction');
  // custom label
  expect(() => assertFunction(undefined, 'Easter Egg')).toThrow('Easter Egg is not a UnknownFunction');
});

it('assertIndexable', () => {
  // intended
  assertIndexable({});
  assertIndexable([]);
  // should fail
  expect(() => assertIndexable('hi')).toThrow('value is not a Indexable');
  expect(() => assertIndexable(false)).toThrow('value is not a Indexable');
  expect(() => assertIndexable(12)).toThrow('value is not a Indexable');
  expect(() => assertIndexable(fn)).toThrow('value is not a Indexable');
  expect(() => assertIndexable(undefined)).toThrow('value is not a Indexable');
  expect(() => assertIndexable(null)).toThrow('value is not a Indexable');
  // custom label
  expect(() => assertIndexable(undefined, 'Easter Egg')).toThrow('Easter Egg is not a Indexable');
});

it('assertOptNumber', () => {
  // intended
  assertOptNumber(12);
  assertOptNumber(undefined);
  assertOptNumber(null);
  // should fail
  expect(() => assertOptNumber('hi')).toThrow('value is not a Optional<number>');
  expect(() => assertOptNumber(false)).toThrow('value is not a Optional<number>');
  expect(() => assertOptNumber([])).toThrow('value is not a Optional<number>');
  expect(() => assertOptNumber({})).toThrow('value is not a Optional<number>');
  expect(() => assertOptNumber(fn)).toThrow('value is not a Optional<number>');
  // custom label
  expect(() => assertOptNumber(false, 'Easter Egg')).toThrow('Easter Egg is not a Optional<number>');
});

it('assertOptString', () => {
  // intended
  assertOptString('hi');
  assertOptString(null);
  assertOptString(undefined);
  // should fail
  expect(() => assertOptString(12)).toThrow('value is not a Optional<string>');
  expect(() => assertOptString(false)).toThrow('value is not a Optional<string>');
  expect(() => assertOptString([])).toThrow('value is not a Optional<string>');
  expect(() => assertOptString({})).toThrow('value is not a Optional<string>');
  expect(() => assertOptString(fn)).toThrow('value is not a Optional<string>');
  // custom label
  expect(() => assertOptString(false, 'Easter Egg')).toThrow('Easter Egg is not a Optional<string>');
});

it('assertOptBoolean', () => {
  // intended
  assertOptBoolean(false);
  assertOptBoolean(undefined);
  assertOptBoolean(null);
  // should fail
  expect(() => assertOptBoolean(12)).toThrow('value is not a Optional<boolean>');
  expect(() => assertOptBoolean('hi')).toThrow('value is not a Optional<boolean>');
  expect(() => assertOptBoolean([])).toThrow('value is not a Optional<boolean>');
  expect(() => assertOptBoolean({})).toThrow('value is not a Optional<boolean>');
  expect(() => assertOptBoolean(fn)).toThrow('value is not a Optional<boolean>');
  // custom label
  expect(() => assertOptBoolean(12, 'Easter Egg')).toThrow('Easter Egg is not a Optional<boolean>');
});

it('assertOptIndex', () => {
  // intended
  assertOptIndex('hi');
  assertOptIndex(12);
  assertOptIndex(null);
  assertOptIndex(undefined);

  // should fail
  expect(() => assertOptIndex(false)).toThrow('value is not a Optional<Index>');
  expect(() => assertOptIndex([])).toThrow('value is not a Optional<Index>');
  expect(() => assertOptIndex({})).toThrow('value is not a Optional<Index>');
  expect(() => assertOptIndex(fn)).toThrow('value is not a Optional<Index>');
  // custom label
  expect(() => assertOptIndex(false, 'Easter Egg')).toThrow('Easter Egg is not a Optional<Index>');
});

it('assertOptPrimitive', () => {
  // intended
  assertOptPrimitive('hi');
  assertOptPrimitive(12);
  assertOptPrimitive(false);
  assertOptPrimitive(null);
  assertOptPrimitive(undefined);

  // should fail
  expect(() => assertOptPrimitive([])).toThrow('value is not a Optional<Primitive>');
  expect(() => assertOptPrimitive({})).toThrow('value is not a Optional<Primitive>');
  expect(() => assertOptPrimitive(fn)).toThrow('value is not a Optional<Primitive>');
  // custom label
  expect(() => assertOptPrimitive([], 'Easter Egg')).toThrow('Easter Egg is not a Optional<Primitive>');
});

it('assertOptArray', () => {
  // intended
  assertOptArray([]);
  assertOptArray(null);
  assertOptArray(undefined);
  // should fail
  expect(() => assertOptArray('hi')).toThrow('value is not a Optional<unknown[]>');
  expect(() => assertOptArray(false)).toThrow('value is not a Optional<unknown[]>');
  expect(() => assertOptArray(12)).toThrow('value is not a Optional<unknown[]>');
  expect(() => assertOptArray({})).toThrow('value is not a Optional<unknown[]>');
  expect(() => assertOptArray(fn)).toThrow('value is not a Optional<unknown[]>');
  // custom label
  expect(() => assertOptArray(false, 'Easter Egg')).toThrow('Easter Egg is not a Optional<unknown[]>');
});

it('assertOptDictionary', () => {
  // intended
  assertOptDictionary({});
  assertOptDictionary(null);
  assertOptDictionary(undefined);
  // should fail
  expect(() => assertOptDictionary('hi')).toThrow('value is not a Optional<Dictionary>');
  expect(() => assertOptDictionary(false)).toThrow('value is not a Optional<Dictionary>');
  expect(() => assertOptDictionary(12)).toThrow('value is not a Optional<Dictionary>');
  expect(() => assertOptDictionary([])).toThrow('value is not a Optional<Dictionary>');
  expect(() => assertOptDictionary(fn)).toThrow('value is not a Optional<Dictionary>');
  // custom label
  expect(() => assertOptDictionary(false, 'Easter Egg')).toThrow('Easter Egg is not a Optional<Dictionary>');
});

it('assertOptFunction', () => {
  // intended
  assertOptFunction(fn);
  assertOptFunction(null);
  assertOptFunction(undefined);
  // should fail
  expect(() => assertOptFunction('hi')).toThrow('value is not a Optional<UnknownFunction>');
  expect(() => assertOptFunction(false)).toThrow('value is not a Optional<UnknownFunction>');
  expect(() => assertOptFunction(12)).toThrow('value is not a Optional<UnknownFunction>');
  expect(() => assertOptFunction({})).toThrow('value is not a Optional<UnknownFunction>');
  expect(() => assertOptFunction([])).toThrow('value is not a Optional<UnknownFunction>');
  // custom label
  expect(() => assertOptFunction(false, 'Easter Egg')).toThrow('Easter Egg is not a Optional<UnknownFunction>');
});

it('assertOptIndexable', () => {
  // intended
  assertOptIndexable({});
  assertOptIndexable([]);
  assertOptIndexable(undefined);
  assertOptIndexable(null);
  // should fail
  expect(() => assertOptIndexable('hi')).toThrow('value is not a Optional<Indexable>');
  expect(() => assertOptIndexable(false)).toThrow('value is not a Optional<Indexable>');
  expect(() => assertOptIndexable(12)).toThrow('value is not a Optional<Indexable>');
  expect(() => assertOptIndexable(fn)).toThrow('value is not a Optional<Indexable>');
  // custom label
  expect(() => assertOptIndexable(false, 'Easter Egg')).toThrow('Easter Egg is not a Optional<Indexable>');
});