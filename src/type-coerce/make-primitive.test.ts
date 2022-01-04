import { makeString, makeBoolean, makeNumber } from './make-primitive';

it('makeString', () => {
  expect(makeString(42)).toBe('42');
  expect(makeString('hello')).toBe('hello');
  expect(makeString(true)).toBe('true');
  expect(() => makeString(null)).toThrow('Unable to cast object to String');
  expect(() => makeString(undefined)).toThrow('Unable to cast undefined to String');
  expect(() => makeString(() => true)).toThrow('Unable to cast function to String');
  expect(() => makeString([])).toThrow('Unable to cast object to String');
  expect(() => makeString({})).toThrow('Unable to cast object to String');
  expect(() => makeString(Symbol('bad'))).toThrow('Unable to cast symbol to String');
});

it('makeNumber', () => {
  expect(makeNumber(42)).toBe(42);
  expect(() => makeNumber('hello')).toThrow('Unable to cast string to Number');
  expect(makeNumber('42')).toBe(42);
  expect(makeNumber(true)).toBe(1);
  expect(makeNumber(false)).toBe(0);
  expect(() => makeNumber(null)).toThrow('Unable to cast object to Number');
  expect(() => makeNumber('4four')).toThrow('Unable to cast string to Number');
  expect(() => makeNumber(undefined)).toThrow('Unable to cast undefined to Number');
  expect(() => makeNumber(() => true)).toThrow('Unable to cast function to Number');
  expect(() => makeNumber([])).toThrow('Unable to cast object to Number');
  expect(() => makeNumber({})).toThrow('Unable to cast object to Number');
  expect(() => makeNumber(Symbol('bad'))).toThrow('Unable to cast symbol to Number');
});

it('makeBoolean', () => {
  expect(makeBoolean(42)).toBe(true);
  expect(makeBoolean(0)).toBe(false);
  expect(() => makeBoolean('hello')).toThrow('Unable to cast string to Boolean');
  expect(makeBoolean('true')).toBe(true);
  expect(makeBoolean('false')).toBe(false);
  expect(makeBoolean(true)).toBe(true);
  expect(makeBoolean(false)).toBe(false);
  expect(() => makeBoolean(null)).toThrow('Unable to cast object to Boolean');
  expect(() => makeBoolean(undefined)).toThrow('Unable to cast undefined to Boolean');
  expect(() => makeBoolean(() => true)).toThrow('Unable to cast function to Boolean');
  expect(() => makeBoolean([])).toThrow('Unable to cast object to Boolean');
  expect(() => makeBoolean({})).toThrow('Unable to cast object to Boolean');
  expect(() => makeBoolean(Symbol('bad'))).toThrow('Unable to cast symbol to Boolean');
});