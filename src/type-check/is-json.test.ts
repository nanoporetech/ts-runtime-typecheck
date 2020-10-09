import './is-json';
import { isJSONArray, isJSONObject, isJSONValue } from './is-json';

describe('isJSONValue', () => {
  it('accepts numbers', () => {
    expect(isJSONValue(12)).toBeTruthy();
  });
  it('accepts strings', () => {
    expect(isJSONValue('Don\'t panic')).toBeTruthy();
  });
  it('accepts boolean', () => {
    expect(isJSONValue(true)).toBeTruthy();
  });
  it('accepts null', () => {
    expect(isJSONValue(null)).toBeTruthy();
  });
  it('accepts arrays', () => {
    expect(isJSONValue([12, 'help', [], {}])).toBeTruthy();
  });
  it('accepts records', () => {
    expect(isJSONValue({
      first: [],
      42: false,
      nested: {
        val: 1
      }
    })).toBeTruthy();
  });
  it('does not accept undefined', () => {
    expect(isJSONValue(undefined)).toBeFalsy();
  });
  it('does not accept array elements that aren\'t JSONValue', () => {
    expect(isJSONValue([ Symbol('bad') ])).toBeFalsy();
  });
  it('does not accept object values that aren\'t JSONValue', () => {
    expect(isJSONValue({ val: Symbol('bad') })).toBeFalsy();
  });
});

describe('isJSONArray', () => {
  it('accepts an array', () => {
    expect(isJSONArray([ 12 ])).toBeTruthy();
  });
  it('doesn\'t accept object', () => {
    expect(isJSONArray({ val: 12 })).toBeFalsy();
  });
  it('doesn\'t accept null', () => {
    expect(isJSONArray(null)).toBeFalsy();
  });
  it('doesn\'t accept primitives', () => {
    expect(isJSONArray(12)).toBeFalsy();
    expect(isJSONArray('fail')).toBeFalsy();
    expect(isJSONArray(false)).toBeFalsy();
  });
});

describe('isJSONObject', () => {
  it('accepts an object', () => {
    expect(isJSONObject({ val: 12, 42: 'Life' })).toBeTruthy();
  });
  it('doesn\'t accept array', () => {
    expect(isJSONObject([ 12 ])).toBeFalsy();
  });
  it('doesn\'t accept null', () => {
    expect(isJSONObject(null)).toBeFalsy();
  });
  it('doesn\'t accept primitives', () => {
    expect(isJSONObject(12)).toBeFalsy();
    expect(isJSONObject('fail')).toBeFalsy();
    expect(isJSONObject(false)).toBeFalsy();
  });
});
