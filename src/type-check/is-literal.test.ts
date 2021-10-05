import { isLiteral, isOptLiteral } from '../type-check/is-literal';

describe('literal casts', () => {
  describe('isLiteral', () => {
    it('accepts a matching string', () => {
      expect(isLiteral('hello')('hello')).toBeTruthy();
    });
    it('rejects a invalid string', () => {
      expect(isLiteral('hello')('goodbye')).toBeFalsy();
    });
    it('does not match falsy values', () => {
      expect(isLiteral(0)(false)).toBeFalsy();
    });
    it('does not match incorrect types', () => {
      expect(isLiteral(0)('0')).toBeFalsy();
    });
    it('accepts a matching number', () => {
      expect(isLiteral(0)(0)).toBeTruthy();
    });
    it('does not match opposing boolean values', () => {
      expect(isLiteral(false)(true)).toBeFalsy();
    });
    it('accepts a matching boolean', () => {
      expect(isLiteral(true)(true)).toBeTruthy();
    });
    it('rejects null', () => {
      expect(isLiteral(false)(null)).toBeFalsy();
    });
    it('rejects undefined', () => {
      expect(isLiteral(false)(undefined)).toBeFalsy();
    });
  });
  describe('isOptLiteral', () => {
    it('accepts a matching string', () => {
      expect(isOptLiteral('hello')('hello')).toBeTruthy();
    });
    it('rejects a invalid string', () => {
      expect(isOptLiteral('hello')('goodbye')).toBeFalsy();
    });
    it('does not match falsy values', () => {
      expect(isOptLiteral(0)(false)).toBeFalsy();
    });
    it('does not match incorrect types', () => {
      expect(isOptLiteral(0)('0')).toBeFalsy();
    });
    it('accepts a matching number', () => {
      expect(isOptLiteral(0)(0)).toBeTruthy();
    });
    it('does not match opposing boolean values', () => {
      expect(isOptLiteral(false)(true)).toBeFalsy();
    });
    it('accepts a matching boolean', () => {
      expect(isOptLiteral(true)(true)).toBeTruthy();
    });
    it('accepts null', () => {
      expect(isOptLiteral(false)(null)).toBeTruthy();
    });
    it('accepts undefined', () => {
      expect(isOptLiteral(false)(undefined)).toBeTruthy();
    });
  });
});