import { inspectType } from './inspectType';

describe('inspectType', () => {
  it('string', () => {
    expect(inspectType('hello')).toBe('string');
  });
  it('number', () => {
    expect(inspectType(12)).toBe('number');
  });
  it('boolean', () => {
    expect(inspectType(false)).toBe('boolean');
  });
  it('Array', () => {
    expect(inspectType([])).toBe('Array');
  });
  it('null', () => {
    expect(inspectType(null)).toBe('null');
  });
  it('empty object', () => {
    expect(inspectType({})).toBe('{}');
  });
  it('empty object with 0 depth', () => {
    expect(inspectType({}, 0)).toBe('Dictionary');
  });
  it('object with single element', () => {
    expect(inspectType({ hello: 'world' })).toBe('{ hello: string }');
  });
  it('object with multiple element', () => {
    expect(inspectType({ hello: 'world', foo: 'bar' })).toBe('{ hello: string, foo: string }');
  });
  it('object with default max depth nesting', () => {
    expect(inspectType({ hello: { bar: { foo: { secret: '' }}} })).toBe('{ hello: { bar: { foo: Dictionary } } }');
  });
  it('instance of class', () => {
    class Alpha {}
    expect(inspectType(new Alpha)).toBe('Alpha');
  });
});