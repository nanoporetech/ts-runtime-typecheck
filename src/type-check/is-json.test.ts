import { isJSONArray, isJSONObject, isJSONValue, isOptJSONArray, isOptJSONObject, isOptJSONValue } from './is-json';

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

describe('isOptJSONValue', () => {
  it('accepts numbers', () => {
    expect(isOptJSONValue(12)).toBeTruthy();
  });
  it('accepts strings', () => {
    expect(isOptJSONValue('Don\'t panic')).toBeTruthy();
  });
  it('accepts boolean', () => {
    expect(isOptJSONValue(true)).toBeTruthy();
  });
  it('accepts nullish', () => {
    expect(isOptJSONValue(null)).toBeTruthy();
    expect(isOptJSONValue(undefined)).toBeTruthy();
  });
  it('accepts arrays', () => {
    expect(isOptJSONValue([12, 'help', [], {}])).toBeTruthy();
  });
  it('accepts records', () => {
    expect(isOptJSONValue({
      first: [],
      42: false,
      nested: {
        val: 1
      }
    })).toBeTruthy();
  });
  it('does not accept array elements that aren\'t JSONValue', () => {
    expect(isOptJSONValue([ Symbol('bad') ])).toBeFalsy();
  });
  it('does not accept object values that aren\'t JSONValue', () => {
    expect(isOptJSONValue({ val: Symbol('bad') })).toBeFalsy();
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

describe('isOptJSONArray', () => {
  it('accepts an array', () => {
    expect(isOptJSONArray([ 12 ])).toBeTruthy();
  });
  it('doesn\'t accept object', () => {
    expect(isOptJSONArray({ val: 12 })).toBeFalsy();
  });
  it('accepts nullish', () => {
    expect(isOptJSONArray(null)).toBeTruthy();
    expect(isOptJSONArray(undefined)).toBeTruthy();
  });
  it('doesn\'t accept primitives', () => {
    expect(isOptJSONArray(12)).toBeFalsy();
    expect(isOptJSONArray('fail')).toBeFalsy();
    expect(isOptJSONArray(false)).toBeFalsy();
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

describe('isOptJSONObject', () => {
  it('accepts an object', () => {
    expect(isOptJSONObject({ val: 12, 42: 'Life' })).toBeTruthy();
  });
  it('doesn\'t accept array', () => {
    expect(isOptJSONObject([ 12 ])).toBeFalsy();
  });
  it('accepts nullish', () => {
    expect(isOptJSONObject(null)).toBeTruthy();
    expect(isOptJSONObject(undefined)).toBeTruthy();
  });
  it('doesn\'t accept primitives', () => {
    expect(isOptJSONObject(12)).toBeFalsy();
    expect(isOptJSONObject('fail')).toBeFalsy();
    expect(isOptJSONObject(false)).toBeFalsy();
  });
});