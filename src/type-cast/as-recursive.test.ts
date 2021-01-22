import { isNumber, isOptString, isString } from '../type-check/is-primitive';
import { asArrayOf, asOptArrayOf, asOptDictionaryOf, asDictionaryOf } from './as-recursive';

describe('recursive casts', () => {
  const fn = () => false;

  it('asArrayOf', () => {
    const asStringArray = asArrayOf(isString);
    const asOptStringArray = asArrayOf(isOptString);
    // intended
    expect(asStringArray([])).toEqual([]);
    expect(asStringArray(['test', 'test'])).toEqual(['test', 'test']);
    expect(asOptStringArray([null, 'test', undefined])).toEqual([null, 'test', undefined]);

    // fallback
    expect(asStringArray(null, [])).toEqual([]);
    expect(asStringArray(undefined, [])).toEqual([]);
    // should fail
    expect(() => asStringArray([null, 'test'])).toThrow('Unable to cast object to string[]');
    expect(() => asStringArray(12)).toThrow('Unable to cast number to string[]');
    expect(() => asStringArray('hi')).toThrow('Unable to cast string to string[]');
    expect(() => asStringArray(false)).toThrow('Unable to cast boolean to string[]');
    expect(() => asStringArray(null)).toThrow('Unable to cast object to string[]');
    expect(() => asStringArray(undefined)).toThrow('Unable to cast undefined to string[]');
    expect(() => asStringArray({})).toThrow('Unable to cast object to string[]');
    expect(() => asStringArray(fn)).toThrow('Unable to cast function to string[]');
  });

  it('asArrayOf memoization', () => {
    const asStringArray = asArrayOf(isString);
    expect(asStringArray).toBe(asArrayOf(isString));
    expect(asStringArray).not.toBe(asArrayOf(isNumber));
  });

  it('asDictionaryOf', () => {
    const asStringRecord = asDictionaryOf(isString);
    const asOptStringRecord = asDictionaryOf(isOptString);

    expect(asStringRecord({})).toEqual({});
    expect(asStringRecord({ a: 'test', b: 'test' })).toEqual({ a: 'test', b: 'test' });
    expect(asOptStringRecord({ a: 'test', b: null, c: undefined })).toEqual({ a: 'test', b: null, c: undefined });

    // fallback
    expect(asStringRecord(null, {})).toEqual({});
    expect(asStringRecord(undefined, {})).toEqual({});
    // should fail
    expect(() => asStringRecord({ a: 'test', b: null })).toThrow('Unable to cast object to Dictionary<string>');
    expect(() => asStringRecord(12)).toThrow('Unable to cast number to Dictionary<string>');
    expect(() => asStringRecord('hi')).toThrow('Unable to cast string to Dictionary<string>');
    expect(() => asStringRecord(false)).toThrow('Unable to cast boolean to Dictionary<string>');
    expect(() => asStringRecord(null)).toThrow('Unable to cast object to Dictionary<string>');
    expect(() => asStringRecord(undefined)).toThrow('Unable to cast undefined to Dictionary<string>');
    expect(() => asStringRecord([])).toThrow('Unable to cast object to Dictionary<string>');
    expect(() => asStringRecord(fn)).toThrow('Unable to cast function to Dictionary<string>');
  });

  it('asDictionaryOf memoization', () => {
    const asStringRecord = asDictionaryOf(isString);
    expect(asStringRecord).toBe(asDictionaryOf(isString));
    expect(asStringRecord).not.toBe(asDictionaryOf(isNumber));
  });
});

describe('optional recursive casts', () => {
  const fn = () => false;

  it('asOptArrayOf', () => {
    const asOptStringArray = asOptArrayOf(isString);
    const asOptOptStringArray = asOptArrayOf(isOptString);
    // intended
    expect(asOptStringArray([])).toEqual([]);
    expect(asOptStringArray(['test', 'test'])).toEqual(['test', 'test']);
    expect(asOptOptStringArray([null, 'test', undefined])).toEqual([null, 'test', undefined]);
    
    // optionality
    expect(asOptStringArray(null)).toEqual(undefined);
    expect(asOptStringArray(undefined)).toEqual(undefined);
    // should fail
    expect(() => asOptStringArray([null, 'test'])).toThrow('Unable to cast object to Optional<string[]>');
    expect(() => asOptStringArray(12)).toThrow('Unable to cast number to Optional<string[]>');
    expect(() => asOptStringArray('hi')).toThrow('Unable to cast string to Optional<string[]>');
    expect(() => asOptStringArray(false)).toThrow('Unable to cast boolean to Optional<string[]>');
    expect(() => asOptStringArray({})).toThrow('Unable to cast object to Optional<string[]>');
    expect(() => asOptStringArray(fn)).toThrow('Unable to cast function to Optional<string[]>');
  });

  it('asOptArrayOf memoization', () => {
    const asOptStringArray = asOptArrayOf(isString);
    expect(asOptStringArray).toBe(asOptArrayOf(isString));
    expect(asOptStringArray).not.toBe(asOptArrayOf(isNumber));
  });

  it('asOptDictionaryOf', () => {
    const asOptStringRecord = asOptDictionaryOf(isString);
    const asOptOptStringRecord = asOptDictionaryOf(isOptString);
    // intended
    expect(asOptStringRecord({})).toEqual({});
    expect(asOptStringRecord({ a: 'test', b: 'test' })).toEqual({ a: 'test', b: 'test' });
    expect(asOptOptStringRecord({ a: 'test', b: null, c: undefined })).toEqual({ a: 'test', b: null, c: undefined });
    // optionality
    expect(asOptStringRecord(null)).toEqual(undefined);
    expect(asOptStringRecord(undefined)).toEqual(undefined);
    // should fail
    expect(() => asOptStringRecord({ a: 'test', b: null })).toThrow('Unable to cast object to Optional<Dictionary<string>>');
    expect(() => asOptStringRecord(12)).toThrow('Unable to cast number to Optional<Dictionary<string>>');
    expect(() => asOptStringRecord('hi')).toThrow('Unable to cast string to Optional<Dictionary<string>>');
    expect(() => asOptStringRecord(false)).toThrow('Unable to cast boolean to Optional<Dictionary<string>>');
    expect(() => asOptStringRecord([])).toThrow('Unable to cast object to Optional<Dictionary<string>>');
    expect(() => asOptStringRecord(fn)).toThrow('Unable to cast function to Optional<Dictionary<string>>');
  });

  it('asOptDictionaryOf memoization', () => {
    const asOptStringRecord = asOptDictionaryOf(isString);
    expect(asOptStringRecord).toBe(asOptDictionaryOf(isString));
    expect(asOptStringRecord).not.toBe(asOptDictionaryOf(isNumber));
  });
});