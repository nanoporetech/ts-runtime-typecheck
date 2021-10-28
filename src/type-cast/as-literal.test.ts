import { asLiteral, asOptLiteral } from '../type-cast/as-literal';

describe('literal casts', () => {
  describe('asLiteral', () => {
    it('accepts a matching string', () => {
      expect(asLiteral('hello')('hello')).toBe('hello');
    });
    it('rejects a invalid string', () => {
      expect(() => asLiteral('hello')('goodbye')).toThrow();
    });
    it('does not match falsy values', () => {
      expect(() => asLiteral(0)(false)).toThrow();
    });
    it('does not match incorrect types', () => {
      expect(() => asLiteral(0)('0')).toThrow();
    });
    it('accepts a matching number', () => {
      expect(asLiteral(0)(0)).toBe(0);
    });
    it('does not match opposing boolean values', () => {
      expect(() => asLiteral(false)(true)).toThrow();
    });
    it('accepts a matching boolean', () => {
      expect(asLiteral(true)(true)).toBe(true);
    });
    it('rejects null', () => {
      expect(() => asLiteral(false)(null)).toThrow();
    });
    it('rejects undefined', () => {
      expect(() => asLiteral(false)(undefined)).toThrow();
    });
    it('accepts a default value', () => {
      expect(asLiteral(42)(null, 42)).toBe(42);
    });
  });
  describe('asOptLiteral', () => {
    it('accepts a matching string', () => {
      expect(asOptLiteral('hello')('hello')).toBe('hello');
    });
    it('rejects a invalid string', () => {
      expect(() => asOptLiteral('hello')('goodbye')).toThrow();
    });
    it('does not match falsy values', () => {
      expect(() => asOptLiteral(0)(false)).toThrow();
    });
    it('does not match incorrect types', () => {
      expect(() => asOptLiteral(0)('0')).toThrow();
    });
    it('accepts a matching number', () => {
      expect(asOptLiteral(0)(0)).toBe(0);
    });
    it('does not match opposing boolean values', () => {
      expect(() => asOptLiteral(false)(true)).toThrow();
    });
    it('accepts a matching boolean', () => {
      expect(asOptLiteral(true)(true)).toBe(true);
    });
    it('accepts null', () => {
      expect(asOptLiteral(42)(null)).toBe(undefined);
    });
    it('accepts undefined', () => {
      expect(asOptLiteral(42)(undefined)).toBe(undefined);
    });
  });
});