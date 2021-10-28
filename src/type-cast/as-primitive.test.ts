import { asArray, asBoolean, asDefined, asFunction, asIndex, asIndexable, asNumber, asOptArray, asOptBoolean, asOptFunction, asOptIndex, asOptIndexable, asOptNumber, asOptDictionary, asOptString, asDictionary, asString, asPrimitive, asOptPrimitive } from './as-primitive';

describe('primative casts', () => {
  const fn = () => false;

  it('asString', () => {
    // intended
    expect(asString('test')).toBe('test');
    // fallback
    expect(asString(null, 'hi')).toBe('hi');
    expect(asString(undefined, 'hi')).toBe('hi');
    // should fail
    expect(() => asString(0)).toThrow('Unable to cast number to string');
    expect(() => asString(false)).toThrow('Unable to cast boolean to string');
    expect(() => asString(null)).toThrow('Unable to cast object to string');
    expect(() => asString(undefined)).toThrow('Unable to cast undefined to string');
    expect(() => asString([])).toThrow('Unable to cast object to string');
    expect(() => asString({})).toThrow('Unable to cast object to string');
    expect(() => asString(fn)).toThrow('Unable to cast function to string');
  });
  it('asNumber', () => {
    // intended
    expect(asNumber(12)).toBe(12);
    // fallback
    expect(asNumber(null, 12)).toBe(12);
    expect(asNumber(undefined, 12)).toBe(12);
    // should fail
    expect(() => asNumber('hi')).toThrow('Unable to cast string to number');
    expect(() => asNumber(false)).toThrow('Unable to cast boolean to number');
    expect(() => asNumber(null)).toThrow('Unable to cast object to number');
    expect(() => asNumber(undefined)).toThrow('Unable to cast undefined to number');
    expect(() => asNumber([])).toThrow('Unable to cast object to number');
    expect(() => asNumber({})).toThrow('Unable to cast object to number');
    expect(() => asNumber(fn)).toThrow('Unable to cast function to number');

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
    // should fail
    expect(() => asDefined(undefined)).toThrow('Unable to cast undefined to NonNullable<unknown>');
    expect(() => asDefined(null)).toThrow('Unable to cast object to NonNullable<unknown>');
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
    expect(asIndexable([])).toEqual([]);
    // fallback
    expect(asIndexable(null, {})).toEqual({});
    expect(asIndexable(undefined, {})).toEqual({});
    // should fail
    expect(() => asIndexable(12)).toThrow('Unable to cast number to Indexable');
    expect(() => asIndexable('hi')).toThrow('Unable to cast string to Indexable');
    expect(() => asIndexable(false)).toThrow('Unable to cast boolean to Indexable');
    expect(() => asIndexable(null)).toThrow('Unable to cast object to Indexable');
    expect(() => asIndexable(undefined)).toThrow('Unable to cast undefined to Indexable');
    expect(() => asIndexable(fn)).toThrow('Unable to cast function to Indexable');
  });
  it('asPrimitive', () => {
    // intended
    expect(asPrimitive(12)).toBe(12);
    expect(asPrimitive('a')).toBe('a');
    expect(asPrimitive(false)).toBe(false);
    // fallback
    expect(asPrimitive(null, 12)).toBe(12);
    expect(asPrimitive(undefined, 12)).toBe(12);
    expect(asPrimitive(null, 'a')).toBe('a');
    expect(asPrimitive(undefined, 'a')).toBe('a');
    expect(asPrimitive(null, false)).toBe(false);
    expect(asPrimitive(undefined, true)).toBe(true);
    // should fail
    expect(() => asPrimitive(null)).toThrow('Unable to cast object to Primitive');
    expect(() => asPrimitive(undefined)).toThrow('Unable to cast undefined to Primitive');
    expect(() => asPrimitive([])).toThrow('Unable to cast object to Primitive');
    expect(() => asPrimitive({})).toThrow('Unable to cast object to Primitive');
    expect(() => asPrimitive(fn)).toThrow('Unable to cast function to Primitive');
  });
  it('asBoolean', () => {
    // intended
    expect(asBoolean(false)).toBe(false);
    // fallback
    expect(asBoolean(null, false)).toEqual(false);
    expect(asBoolean(undefined, true)).toEqual(true);
    // should fail
    expect(() => asBoolean(12)).toThrow('Unable to cast number to boolean');
    expect(() => asBoolean('hi')).toThrow('Unable to cast string to boolean');
    expect(() => asBoolean(null)).toThrow('Unable to cast object to boolean');
    expect(() => asBoolean(undefined)).toThrow('Unable to cast undefined to boolean');
    expect(() => asBoolean([])).toThrow('Unable to cast object to boolean');
    expect(() => asBoolean({})).toThrow('Unable to cast object to boolean');
    expect(() => asBoolean(fn)).toThrow('Unable to cast function to boolean');
  });
  it('asArray', () => {
    // intended
    expect(asArray([])).toEqual([]);
    // fallback
    expect(asArray(null, [])).toEqual([]);
    expect(asArray(undefined, [])).toEqual([]);
    // should fail
    expect(() => asArray(12)).toThrow('Unable to cast number to unknown[]');
    expect(() => asArray('hi')).toThrow('Unable to cast string to unknown[]');
    expect(() => asArray(false)).toThrow('Unable to cast boolean to unknown[]');
    expect(() => asArray(null)).toThrow('Unable to cast object to unknown[]');
    expect(() => asArray(undefined)).toThrow('Unable to cast undefined to unknown[]');
    expect(() => asArray({})).toThrow('Unable to cast object to unknown[]');
    expect(() => asArray(fn)).toThrow('Unable to cast function to unknown[]');
  });
  it('asDictionary', () => {
    // intended
    expect(asDictionary({})).toEqual({});
    // fallback
    expect(asDictionary(null, {})).toEqual({});
    expect(asDictionary(undefined, {})).toEqual({});
    // should fail
    expect(() => asDictionary(12)).toThrow('Unable to cast number to Dictionary');
    expect(() => asDictionary('hi')).toThrow('Unable to cast string to Dictionary');
    expect(() => asDictionary(false)).toThrow('Unable to cast boolean to Dictionary');
    expect(() => asDictionary(null)).toThrow('Unable to cast object to Dictionary');
    expect(() => asDictionary(undefined)).toThrow('Unable to cast undefined to Dictionary');
    expect(() => asDictionary([])).toThrow('Unable to cast object to Dictionary');
    expect(() => asDictionary(fn)).toThrow('Unable to cast function to Dictionary');
  });
  it('asFunction', () => {
    // intended
    expect(asFunction(fn)).toBe(fn);
    // fallback
    expect(asFunction(null, fn)).toEqual(fn);
    expect(asFunction(undefined, fn)).toEqual(fn);
    // should fail
    expect(() => asFunction(12)).toThrow('Unable to cast number to UnknownFunction');
    expect(() => asFunction('hi')).toThrow('Unable to cast string to UnknownFunction');
    expect(() => asFunction(false)).toThrow('Unable to cast boolean to UnknownFunction');
    expect(() => asFunction(null)).toThrow('Unable to cast object to UnknownFunction');
    expect(() => asFunction(undefined)).toThrow('Unable to cast undefined to UnknownFunction');
    expect(() => asFunction([])).toThrow('Unable to cast object to UnknownFunction');
    expect(() => asFunction({})).toThrow('Unable to cast object to UnknownFunction');
  });

  it('asOptString', () => {
    // intended
    expect(asOptString('test')).toBe('test');
    expect(asOptString(null)).toBeUndefined();
    expect(asOptString(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptString(0)).toThrow('Unable to cast number to Optional<string>');
    expect(() => asOptString(false)).toThrow('Unable to cast boolean to Optional<string>');
    expect(() => asOptString([])).toThrow('Unable to cast object to Optional<string>');
    expect(() => asOptString({})).toThrow('Unable to cast object to Optional<string>');
    expect(() => asOptString(fn)).toThrow('Unable to cast function to Optional<string>');
  });
  it('asOptNumber', () => {
    // intended
    expect(asOptNumber(12)).toBe(12);
    expect(asOptNumber(null)).toBeUndefined();
    expect(asOptNumber(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptNumber('hi')).toThrow('Unable to cast string to Optional<number>');
    expect(() => asOptNumber(false)).toThrow('Unable to cast boolean to Optional<number>');
    expect(() => asOptNumber([])).toThrow('Unable to cast object to Optional<number>');
    expect(() => asOptNumber({})).toThrow('Unable to cast object to Optional<number>');
    expect(() => asOptNumber(fn)).toThrow('Unable to cast function to Optional<number>');

  });
  it('asOptIndex', () => {
    // intended
    expect(asOptIndex(12)).toBe(12);
    expect(asOptIndex('a')).toBe('a');
    expect(asOptIndex(null)).toBeUndefined();
    expect(asOptIndex(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptIndex(false)).toThrow('Unable to cast boolean to Optional<Index>');
    expect(() => asOptIndex([])).toThrow('Unable to cast object to Optional<Index>');
    expect(() => asOptIndex({})).toThrow('Unable to cast object to Optional<Index>');
    expect(() => asOptIndex(fn)).toThrow('Unable to cast function to Optional<Index>');
  });
  it('asOptPrimitive', () => {
    // intended
    expect(asOptPrimitive(12)).toBe(12);
    expect(asOptPrimitive('a')).toBe('a');
    expect(asOptPrimitive(false)).toBe(false);
    expect(asOptPrimitive(null)).toBeUndefined();
    expect(asOptPrimitive(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptPrimitive([])).toThrow('Unable to cast object to Optional<Primitive>');
    expect(() => asOptPrimitive({})).toThrow('Unable to cast object to Optional<Primitive>');
    expect(() => asOptPrimitive(fn)).toThrow('Unable to cast function to Optional<Primitive>');
  });
  it('asOptIndexable', () => {
    // intended
    expect(asOptIndexable({})).toEqual({});
    expect(asOptIndexable([])).toEqual([]);
    expect(asOptIndexable(null)).toBeUndefined();
    expect(asOptIndexable(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptIndexable(12)).toThrow('Unable to cast number to Optional<Indexable>');
    expect(() => asOptIndexable('hi')).toThrow('Unable to cast string to Optional<Indexable>');
    expect(() => asOptIndexable(false)).toThrow('Unable to cast boolean to Optional<Indexable>');
    expect(() => asOptIndexable(fn)).toThrow('Unable to cast function to Optional<Indexable>');
  });
  it('asOptBoolean', () => {
    // intended
    expect(asOptBoolean(false)).toBe(false);
    expect(asOptBoolean(null)).toBeUndefined();
    expect(asOptBoolean(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptBoolean(12)).toThrow('Unable to cast number to Optional<boolean>');
    expect(() => asOptBoolean('hi')).toThrow('Unable to cast string to Optional<boolean>');
    expect(() => asOptBoolean([])).toThrow('Unable to cast object to Optional<boolean>');
    expect(() => asOptBoolean({})).toThrow('Unable to cast object to Optional<boolean>');
    expect(() => asOptBoolean(fn)).toThrow('Unable to cast function to Optional<boolean>');
  });
  it('asOptArray', () => {
    // intended
    expect(asOptArray([])).toEqual([]);
    expect(asOptArray(null)).toBeUndefined();
    expect(asOptArray(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptArray(12)).toThrow('Unable to cast number to Optional<unknown[]>');
    expect(() => asOptArray('hi')).toThrow('Unable to cast string to Optional<unknown[]>');
    expect(() => asOptArray(false)).toThrow('Unable to cast boolean to Optional<unknown[]>');
    expect(() => asOptArray({})).toThrow('Unable to cast object to Optional<unknown[]>');
    expect(() => asOptArray(fn)).toThrow('Unable to cast function to Optional<unknown[]>');
  });
  it('asOptDictionary', () => {
    // intended
    expect(asOptDictionary({})).toEqual({});
    expect(asOptDictionary(null)).toBeUndefined();
    expect(asOptDictionary(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptDictionary(12)).toThrow('Unable to cast number to Optional<Dictionary>');
    expect(() => asOptDictionary('hi')).toThrow('Unable to cast string to Optional<Dictionary>');
    expect(() => asOptDictionary(false)).toThrow('Unable to cast boolean to Optional<Dictionary>');
    expect(() => asOptDictionary([])).toThrow('Unable to cast object to Optional<Dictionary>');
    expect(() => asOptDictionary(fn)).toThrow('Unable to cast function to Optional<Dictionary>');
  });
  it('asOptFunction', () => {
    // intended
    expect(asOptFunction(fn)).toBe(fn);
    expect(asOptFunction(null)).toBeUndefined();
    expect(asOptFunction(undefined)).toBeUndefined();
    // should fail
    expect(() => asOptFunction(12)).toThrow('Unable to cast number to Optional<UnknownFunction>');
    expect(() => asOptFunction('hi')).toThrow('Unable to cast string to Optional<UnknownFunction>');
    expect(() => asOptFunction(false)).toThrow('Unable to cast boolean to Optional<UnknownFunction>');
    expect(() => asOptFunction([])).toThrow('Unable to cast object to Optional<UnknownFunction>');
    expect(() => asOptFunction({})).toThrow('Unable to cast object to Optional<UnknownFunction>');
  });
});
