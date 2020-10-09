import { isString } from '../type-check/is-primitive';
import { asArray, asArrayRecursive, asBoolean, asDefined, asFunction, asIndex, asIndexable, asNumber, asOptArrayRecursive, asOptRecordRecursive, asOptString, asRecord, asRecordRecursive, asString } from './as-primitive';

describe('primative casts', () => {
  const fn = () => false;

  it('asString', () => {
    // intended
    expect(asString('test')).toBe('test');
    // fallback
    expect(asString(null, 'hi')).toBe('hi');
    expect(asString(undefined, 'hi')).toBe('hi');
    // should fail
    expect(() => asString(0)).toThrow('Unable to cast number to String');
    expect(() => asString(false)).toThrow('Unable to cast boolean to String');
    expect(() => asString(null)).toThrow('Unable to cast object to String');
    expect(() => asString(undefined)).toThrow('Unable to cast undefined to String');
    expect(() => asString([])).toThrow('Unable to cast object to String');
    expect(() => asString({})).toThrow('Unable to cast object to String');
    expect(() => asString(fn)).toThrow('Unable to cast function to String');
  });
  it('asNumber', () => {
    // intended
    expect(asNumber(12)).toBe(12);
    // fallback
    expect(asNumber(null, 12)).toBe(12);
    expect(asNumber(undefined, 12)).toBe(12);
    // should fail
    expect(() => asNumber('hi')).toThrow('Unable to cast string to Number');
    expect(() => asNumber(false)).toThrow('Unable to cast boolean to Number');
    expect(() => asNumber(null)).toThrow('Unable to cast object to Number');
    expect(() => asNumber(undefined)).toThrow('Unable to cast undefined to Number');
    expect(() => asNumber([])).toThrow('Unable to cast object to Number');
    expect(() => asNumber({})).toThrow('Unable to cast object to Number');
    expect(() => asNumber(fn)).toThrow('Unable to cast function to Number');

  });
  it('asDefined', () => {
    // intended
    expect(asDefined(12)).toBe(12);
    expect(asDefined('hi')).toBe('hi');
    expect(asDefined(false)).toBe(false);
    expect(asDefined([])).toEqual([]);
    expect(asDefined({})).toEqual({});
    expect(asDefined(fn)).toBe(fn);
    // fallback
    expect(asDefined(null, 12)).toBe(12);
    expect(asDefined(undefined, 12)).toBe(12);
    // technically allowed, not very useful though
    // not sure if it should be defined behavior
    expect(asDefined(undefined, null)).toBe(null);
    // should fail
    expect(() => asDefined(undefined)).toThrow('Unable to cast undefined to Defined');
    expect(() => asDefined(null)).toThrow('Unable to cast object to Defined');
  });
  it('asIndex', () => {
    // intended
    expect(asIndex(12)).toBe(12);
    expect(asIndex('a')).toBe('a');
    // fallback
    expect(asIndex(null, 12)).toBe(12);
    expect(asIndex(undefined, 12)).toBe(12);
    expect(asIndex(null, 'a')).toBe('a');
    expect(asIndex(undefined, 'a')).toBe('a');
    // should fail
    expect(() => asIndex(false)).toThrow('Unable to cast boolean to Index');
    expect(() => asIndex(null)).toThrow('Unable to cast object to Index');
    expect(() => asIndex(undefined)).toThrow('Unable to cast undefined to Index');
    expect(() => asIndex([])).toThrow('Unable to cast object to Index');
    expect(() => asIndex({})).toThrow('Unable to cast object to Index');
    expect(() => asIndex(fn)).toThrow('Unable to cast function to Index');
  });
  it('asIndexable', () => {
    // intended
    expect(asIndexable({})).toEqual({});
    // fallback
    expect(asIndexable(null, {})).toEqual({});
    expect(asIndexable(undefined, {})).toEqual({});
    // should fail
    expect(() => asIndexable(12)).toThrow('Unable to cast number to Indexable');
    expect(() => asIndexable('hi')).toThrow('Unable to cast string to Indexable');
    expect(() => asIndexable(false)).toThrow('Unable to cast boolean to Indexable');
    expect(() => asIndexable(null)).toThrow('Unable to cast object to Indexable');
    expect(() => asIndexable(undefined)).toThrow('Unable to cast undefined to Indexable');
    expect(() => asIndexable([])).toThrow('Unable to cast object to Indexable');
    expect(() => asIndexable(fn)).toThrow('Unable to cast function to Indexable');
  });
  it('asBoolean', () => {
    // intended
    expect(asBoolean(false)).toBe(false);
    // fallback
    expect(asBoolean(null, false)).toEqual(false);
    expect(asBoolean(undefined, true)).toEqual(true);
    // should fail
    expect(() => asBoolean(12)).toThrow('Unable to cast number to Boolean');
    expect(() => asBoolean('hi')).toThrow('Unable to cast string to Boolean');
    expect(() => asBoolean(null)).toThrow('Unable to cast object to Boolean');
    expect(() => asBoolean(undefined)).toThrow('Unable to cast undefined to Boolean');
    expect(() => asBoolean([])).toThrow('Unable to cast object to Boolean');
    expect(() => asBoolean({})).toThrow('Unable to cast object to Boolean');
    expect(() => asBoolean(fn)).toThrow('Unable to cast function to Boolean');
  });
  it('asArray', () => {
    // intended
    expect(asArray([])).toEqual([]);
    // fallback
    expect(asArray(null, [])).toEqual([]);
    expect(asArray(undefined, [])).toEqual([]);
    // should fail
    expect(() => asArray(12)).toThrow('Unable to cast number to Array');
    expect(() => asArray('hi')).toThrow('Unable to cast string to Array');
    expect(() => asArray(false)).toThrow('Unable to cast boolean to Array');
    expect(() => asArray(null)).toThrow('Unable to cast object to Array');
    expect(() => asArray(undefined)).toThrow('Unable to cast undefined to Array');
    expect(() => asArray({})).toThrow('Unable to cast object to Array');
    expect(() => asArray(fn)).toThrow('Unable to cast function to Array');
  });
  it('asRecord', () => {
    // intended
    expect(asRecord({})).toEqual({});
    // fallback
    expect(asRecord(null, {})).toEqual({});
    expect(asRecord(undefined, {})).toEqual({});
    // should fail
    expect(() => asRecord(12)).toThrow('Unable to cast number to Record');
    expect(() => asRecord('hi')).toThrow('Unable to cast string to Record');
    expect(() => asRecord(false)).toThrow('Unable to cast boolean to Record');
    expect(() => asRecord(null)).toThrow('Unable to cast object to Record');
    expect(() => asRecord(undefined)).toThrow('Unable to cast undefined to Record');
    expect(() => asRecord([])).toThrow('Unable to cast object to Record');
    expect(() => asRecord(fn)).toThrow('Unable to cast function to Record');
  });
  it('asFunction', () => {
    // intended
    expect(asFunction(fn)).toBe(fn);
    // fallback
    expect(asFunction(null, fn)).toEqual(fn);
    expect(asFunction(undefined, fn)).toEqual(fn);
    // should fail
    expect(() => asFunction(12)).toThrow('Unable to cast number to Function');
    expect(() => asFunction('hi')).toThrow('Unable to cast string to Function');
    expect(() => asFunction(false)).toThrow('Unable to cast boolean to Function');
    expect(() => asFunction(null)).toThrow('Unable to cast object to Function');
    expect(() => asFunction(undefined)).toThrow('Unable to cast undefined to Function');
    expect(() => asFunction([])).toThrow('Unable to cast object to Function');
    expect(() => asFunction({})).toThrow('Unable to cast object to Function');
  });
});

describe('recursive casts', () => {
  const fn = () => false;

  it('asArrayRecursive', () => {
    expect(asArrayRecursive([], isString)).toEqual([]);
    expect(asArrayRecursive(['test', 'test'], asString)).toEqual(['test', 'test']);
    expect(asArrayRecursive([null, 'test'], asOptString)).toEqual([undefined, 'test']);
    // fallback
    expect(asArrayRecursive(null, asString, [])).toEqual([]);
    expect(asArrayRecursive(undefined, asString, [])).toEqual([]);
    // should fail
    expect(() => asArrayRecursive([null, 'test'], asString)).toThrow('Unable to cast object to String');
    expect(() => asArrayRecursive(12, asString)).toThrow('Unable to cast number to Array');
    expect(() => asArrayRecursive('hi', asString)).toThrow('Unable to cast string to Array');
    expect(() => asArrayRecursive(false, asString)).toThrow('Unable to cast boolean to Array');
    expect(() => asArrayRecursive(null, asString)).toThrow('Unable to cast object to Array');
    expect(() => asArrayRecursive(undefined, asString)).toThrow('Unable to cast undefined to Array');
    expect(() => asArrayRecursive({}, asString)).toThrow('Unable to cast object to Array');
    expect(() => asArrayRecursive(fn, asString)).toThrow('Unable to cast function to Array');
  });
  it('asRecordRecursive', () => {
    expect(asRecordRecursive({}, isString)).toEqual({});
    expect(asRecordRecursive({ a: 'test', b: 'test' }, asString)).toEqual({ a: 'test', b: 'test' });
    expect(asRecordRecursive({ a: 'test', b: null }, asOptString)).toEqual({ a: 'test', b: undefined });
    // fallback
    expect(asRecordRecursive(null, asString, {})).toEqual({});
    expect(asRecordRecursive(undefined, asString, {})).toEqual({});
    // should fail
    expect(() => asRecordRecursive({ a: 'test', b: null }, asString)).toThrow('Unable to cast object to String');
    expect(() => asRecordRecursive(12, asString)).toThrow('Unable to cast number to Record');
    expect(() => asRecordRecursive('hi', asString)).toThrow('Unable to cast string to Record');
    expect(() => asRecordRecursive(false, asString)).toThrow('Unable to cast boolean to Record');
    expect(() => asRecordRecursive(null, asString)).toThrow('Unable to cast object to Record');
    expect(() => asRecordRecursive(undefined, asString)).toThrow('Unable to cast undefined to Record');
    expect(() => asRecordRecursive([], asString)).toThrow('Unable to cast object to Record');
    expect(() => asRecordRecursive(fn, asString)).toThrow('Unable to cast function to Record');
  });
});

describe('optional recursive casts', () => {
  const fn = () => false;

  it('asOptArrayRecursive', () => {
    // intended
    expect(asOptArrayRecursive([], asString)).toEqual([]);
    expect(asOptArrayRecursive(['test', 'test'], asString)).toEqual(['test', 'test']);
    expect(asOptArrayRecursive([null, 'test'], asOptString)).toEqual([undefined, 'test']);
    // optionality
    expect(asOptArrayRecursive(null, asString)).toEqual(undefined);
    expect(asOptArrayRecursive(undefined, asString)).toEqual(undefined);
    // should fail
    expect(() => asOptArrayRecursive([null, 'test'], asString)).toThrow('Unable to cast object to String');
    expect(() => asOptArrayRecursive(12, asString)).toThrow('Unable to cast number to Array');
    expect(() => asOptArrayRecursive('hi', asString)).toThrow('Unable to cast string to Array');
    expect(() => asOptArrayRecursive(false, asString)).toThrow('Unable to cast boolean to Array');
    expect(() => asOptArrayRecursive({}, asString)).toThrow('Unable to cast object to Array');
    expect(() => asOptArrayRecursive(fn, asString)).toThrow('Unable to cast function to Array');
  });
  it('asOptRecordRecursive', () => {
    // intended
    expect(asOptRecordRecursive({}, asString)).toEqual({});
    expect(asOptRecordRecursive({ a: 'test', b: 'test' }, asString)).toEqual({ a: 'test', b: 'test' });
    expect(asOptRecordRecursive({ a: 'test', b: null }, asOptString)).toEqual({ a: 'test', b: undefined });
    // optionality
    expect(asOptRecordRecursive(null, asString)).toEqual(undefined);
    expect(asOptRecordRecursive(undefined, asString)).toEqual(undefined);
    // should fail
    expect(() => asOptRecordRecursive({ a: 'test', b: null }, asString)).toThrow('Unable to cast object to String');
    expect(() => asRecordRecursive(12, asString)).toThrow('Unable to cast number to Record');
    expect(() => asRecordRecursive('hi', asString)).toThrow('Unable to cast string to Record');
    expect(() => asRecordRecursive(false, asString)).toThrow('Unable to cast boolean to Record');
    expect(() => asRecordRecursive([], asString)).toThrow('Unable to cast object to Record');
    expect(() => asRecordRecursive(fn, asString)).toThrow('Unable to cast function to Record');

  });
});