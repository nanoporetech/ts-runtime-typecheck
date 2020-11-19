import { asArray, asArrayRecursive, asBoolean, asDefined, asFunction, asIndex, asIndexable, asNumber, asOptArray, asOptArrayRecursive, asOptBoolean, asOptFunction, asOptIndex, asOptIndexable, asOptNumber, asOptRecord, asOptRecordRecursive, asOptString, asRecord, asRecordRecursive, asString } from './as-primitive';

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

  it('asOptString', () => {
    // intended
    expect(asOptString('test')).toBe('test');
    expect(asOptString(null)).toBeUndefined();
    expect(asOptString(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptString(0)).toThrow('Unable to cast number to String');
    expect(() => asOptString(false)).toThrow('Unable to cast boolean to String');
    expect(() => asOptString([])).toThrow('Unable to cast object to String');
    expect(() => asOptString({})).toThrow('Unable to cast object to String');
    expect(() => asOptString(fn)).toThrow('Unable to cast function to String');
  });
  it('asOptNumber', () => {
    // intended
    expect(asOptNumber(12)).toBe(12);
    expect(asOptNumber(null)).toBeUndefined();
    expect(asOptNumber(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptNumber('hi')).toThrow('Unable to cast string to Number');
    expect(() => asOptNumber(false)).toThrow('Unable to cast boolean to Number');
    expect(() => asOptNumber([])).toThrow('Unable to cast object to Number');
    expect(() => asOptNumber({})).toThrow('Unable to cast object to Number');
    expect(() => asOptNumber(fn)).toThrow('Unable to cast function to Number');

  });
  it('asOptIndex', () => {
    // intended
    expect(asOptIndex(12)).toBe(12);
    expect(asOptIndex('a')).toBe('a');
    expect(asOptIndex(null)).toBeUndefined();
    expect(asOptIndex(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptIndex(false)).toThrow('Unable to cast boolean to Index');
    expect(() => asOptIndex([])).toThrow('Unable to cast object to Index');
    expect(() => asOptIndex({})).toThrow('Unable to cast object to Index');
    expect(() => asOptIndex(fn)).toThrow('Unable to cast function to Index');
  });
  it('asOptIndexable', () => {
    // intended
    expect(asOptIndexable({})).toEqual({});
    expect(asOptIndexable(null)).toBeUndefined();
    expect(asOptIndexable(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptIndexable(12)).toThrow('Unable to cast number to Indexable');
    expect(() => asOptIndexable('hi')).toThrow('Unable to cast string to Indexable');
    expect(() => asOptIndexable(false)).toThrow('Unable to cast boolean to Indexable');
    expect(() => asOptIndexable([])).toThrow('Unable to cast object to Indexable');
    expect(() => asOptIndexable(fn)).toThrow('Unable to cast function to Indexable');
  });
  it('asOptBoolean', () => {
    // intended
    expect(asOptBoolean(false)).toBe(false);
    expect(asOptBoolean(null)).toBeUndefined();
    expect(asOptBoolean(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptBoolean(12)).toThrow('Unable to cast number to Boolean');
    expect(() => asOptBoolean('hi')).toThrow('Unable to cast string to Boolean');
    expect(() => asOptBoolean([])).toThrow('Unable to cast object to Boolean');
    expect(() => asOptBoolean({})).toThrow('Unable to cast object to Boolean');
    expect(() => asOptBoolean(fn)).toThrow('Unable to cast function to Boolean');
  });
  it('asOptArray', () => {
    // intended
    expect(asOptArray([])).toEqual([]);
    expect(asOptArray(null)).toBeUndefined();
    expect(asOptArray(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptArray(12)).toThrow('Unable to cast number to Array');
    expect(() => asOptArray('hi')).toThrow('Unable to cast string to Array');
    expect(() => asOptArray(false)).toThrow('Unable to cast boolean to Array');
    expect(() => asOptArray({})).toThrow('Unable to cast object to Array');
    expect(() => asOptArray(fn)).toThrow('Unable to cast function to Array');
  });
  it('asOptRecord', () => {
    // intended
    expect(asOptRecord({})).toEqual({});
    expect(asOptRecord(null)).toBeUndefined();
    expect(asOptRecord(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptRecord(12)).toThrow('Unable to cast number to Record');
    expect(() => asOptRecord('hi')).toThrow('Unable to cast string to Record');
    expect(() => asOptRecord(false)).toThrow('Unable to cast boolean to Record');
    expect(() => asOptRecord([])).toThrow('Unable to cast object to Record');
    expect(() => asOptRecord(fn)).toThrow('Unable to cast function to Record');
  });
  it('asOptFunction', () => {
    // intended
    expect(asOptFunction(fn)).toBe(fn);
    expect(asOptFunction(null)).toBeUndefined();
    expect(asOptFunction(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptFunction(12)).toThrow('Unable to cast number to Function');
    expect(() => asOptFunction('hi')).toThrow('Unable to cast string to Function');
    expect(() => asOptFunction(false)).toThrow('Unable to cast boolean to Function');
    expect(() => asOptFunction([])).toThrow('Unable to cast object to Function');
    expect(() => asOptFunction({})).toThrow('Unable to cast object to Function');
  });
});

describe('recursive casts', () => {
  const fn = () => false;

  it('asArrayRecursive', () => {
    const asStringArray = asArrayRecursive(asString);
    const asOptStringArray = asArrayRecursive(asOptString);
    // intended
    expect(asStringArray([])).toEqual([]);
    expect(asStringArray(['test', 'test'])).toEqual(['test', 'test']);
    expect(asOptStringArray([null, 'test'])).toEqual([undefined, 'test']);
    // fallback
    expect(asStringArray(null, [])).toEqual([]);
    expect(asStringArray(undefined, [])).toEqual([]);
    // should fail
    expect(() => asStringArray([null, 'test'])).toThrow('Unable to cast object to String');
    expect(() => asStringArray(12)).toThrow('Unable to cast number to Array');
    expect(() => asStringArray('hi')).toThrow('Unable to cast string to Array');
    expect(() => asStringArray(false)).toThrow('Unable to cast boolean to Array');
    expect(() => asStringArray(null)).toThrow('Unable to cast object to Array');
    expect(() => asStringArray(undefined)).toThrow('Unable to cast undefined to Array');
    expect(() => asStringArray({})).toThrow('Unable to cast object to Array');
    expect(() => asStringArray(fn)).toThrow('Unable to cast function to Array');
  });

  it('asArrayRecursive memoization', () => {
    const asStringArray = asArrayRecursive(asString);
    expect(asStringArray).toBe(asArrayRecursive(asString));
    expect(asStringArray).not.toBe(asArrayRecursive(asNumber));
  });

  it('asRecordRecursive', () => {
    const asStringRecord = asRecordRecursive(asString);
    const asOptStringRecord = asRecordRecursive(asOptString);

    expect(asStringRecord({})).toEqual({});
    expect(asStringRecord({ a: 'test', b: 'test' })).toEqual({ a: 'test', b: 'test' });
    expect(asOptStringRecord({ a: 'test', b: null })).toEqual({ a: 'test', b: undefined });
    // fallback
    expect(asStringRecord(null, {})).toEqual({});
    expect(asStringRecord(undefined, {})).toEqual({});
    // should fail
    expect(() => asStringRecord({ a: 'test', b: null })).toThrow('Unable to cast object to String');
    expect(() => asStringRecord(12)).toThrow('Unable to cast number to Record');
    expect(() => asStringRecord('hi')).toThrow('Unable to cast string to Record');
    expect(() => asStringRecord(false)).toThrow('Unable to cast boolean to Record');
    expect(() => asStringRecord(null)).toThrow('Unable to cast object to Record');
    expect(() => asStringRecord(undefined)).toThrow('Unable to cast undefined to Record');
    expect(() => asStringRecord([])).toThrow('Unable to cast object to Record');
    expect(() => asStringRecord(fn)).toThrow('Unable to cast function to Record');
  });

  it('asRecordRecursive memoization', () => {
    const asStringRecord = asRecordRecursive(asString);
    expect(asStringRecord).toBe(asRecordRecursive(asString));
    expect(asStringRecord).not.toBe(asRecordRecursive(asNumber));
  });
});

describe('optional recursive casts', () => {
  const fn = () => false;

  it('asOptArrayRecursive', () => {
    const asOptStringArray = asOptArrayRecursive(asString);
    const asOptOptStringArray = asOptArrayRecursive(asOptString);
    // intended
    expect(asOptStringArray([])).toEqual([]);
    expect(asOptStringArray(['test', 'test'])).toEqual(['test', 'test']);
    expect(asOptOptStringArray([null, 'test'])).toEqual([undefined, 'test']);
    // optionality
    expect(asOptStringArray(null)).toEqual(undefined);
    expect(asOptStringArray(undefined)).toEqual(undefined);
    // should fail
    expect(() => asOptStringArray([null, 'test'])).toThrow('Unable to cast object to String');
    expect(() => asOptStringArray(12)).toThrow('Unable to cast number to Array');
    expect(() => asOptStringArray('hi')).toThrow('Unable to cast string to Array');
    expect(() => asOptStringArray(false)).toThrow('Unable to cast boolean to Array');
    expect(() => asOptStringArray({})).toThrow('Unable to cast object to Array');
    expect(() => asOptStringArray(fn)).toThrow('Unable to cast function to Array');
  });

  it('asOptArrayRecursive memoization', () => {
    const asOptStringArray = asOptArrayRecursive(asString);
    expect(asOptStringArray).toBe(asOptArrayRecursive(asString));
    expect(asOptStringArray).not.toBe(asOptArrayRecursive(asNumber));
  });

  it('asOptRecordRecursive', () => {
    const asOptStringRecord = asOptRecordRecursive(asString);
    const asOptOptStringRecord = asOptRecordRecursive(asOptString);
    // intended
    expect(asOptStringRecord({})).toEqual({});
    expect(asOptStringRecord({ a: 'test', b: 'test' })).toEqual({ a: 'test', b: 'test' });
    expect(asOptOptStringRecord({ a: 'test', b: null })).toEqual({ a: 'test', b: undefined });
    // optionality
    expect(asOptStringRecord(null)).toEqual(undefined);
    expect(asOptStringRecord(undefined)).toEqual(undefined);
    // should fail
    expect(() => asOptStringRecord({ a: 'test', b: null })).toThrow('Unable to cast object to String');
    expect(() => asOptStringRecord(12)).toThrow('Unable to cast number to Record');
    expect(() => asOptStringRecord('hi')).toThrow('Unable to cast string to Record');
    expect(() => asOptStringRecord(false)).toThrow('Unable to cast boolean to Record');
    expect(() => asOptStringRecord([])).toThrow('Unable to cast object to Record');
    expect(() => asOptStringRecord(fn)).toThrow('Unable to cast function to Record');
  });

  it('asOptRecordRecursive memoization', () => {
    const asOptStringRecord = asOptRecordRecursive(asString);
    expect(asOptStringRecord).toBe(asOptRecordRecursive(asString));
    expect(asOptStringRecord).not.toBe(asOptRecordRecursive(asNumber));
  });
});