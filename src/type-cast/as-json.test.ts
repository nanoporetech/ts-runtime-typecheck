import { asJSONArray, asJSONObject, asJSONValue, asOptJSONArray, asOptJSONObject, asOptJSONValue } from './as-json';

describe('asJSONValue', () => {
  it('accepts numbers', () => {
    expect(asJSONValue(12)).toBe(12);
  });
  it('accepts strings', () => {
    expect(asJSONValue('Don\'t panic')).toBe('Don\'t panic');
  });
  it('accepts boolean', () => {
    expect(asJSONValue(true)).toBe(true);
  });
  it('accepts null', () => {
    expect(asJSONValue(null)).toBe(null);
  });
  it('accepts arrays', () => {
    expect(asJSONValue([12, 'help', [], {}])).toEqual([12, 'help', [], {}]);
  });
  it('accepts records', () => {
    expect(asJSONValue({
      first: [],
      42: false,
      nested: {
        val: 1
      }
    })).toEqual({
      first: [],
      42: false,
      nested: {
        val: 1
      }
    });
  });
  it('does not accept undefined', () => {
    expect(() => asJSONValue(undefined)).toThrow('Unable to cast undefined to JSONValue');
  });
  it('does not accept array elements that aren\'t JSONValue', () => {
    expect(() => asJSONValue([ Symbol('bad') ])).toThrow('Unable to cast object to JSONValue');
  });
  it('does not accept object values that aren\'t JSONValue', () => {
    expect(() => asJSONValue({ val: Symbol('bad') })).toThrow('Unable to cast object to JSONValue');
  });
});

describe('asJSONArray', () => {
  it('accepts an array', () => {
    expect(asJSONArray([ 12 ])).toEqual([ 12 ]);
  });
  it('doesn\'t accept object', () => {
    expect(() => asJSONArray({ val: 12 })).toThrow('Unable to cast object to JSONArray');
  });
  it('doesn\'t accept null', () => {
    expect(() => asJSONArray(null)).toThrow('Unable to cast object to JSONArray');
  });
  it('doesn\'t accept primitives', () => {
    expect(() => asJSONArray(12)).toThrow('Unable to cast number to JSONArray');
    expect(() => asJSONArray('fail')).toThrow('Unable to cast string to JSONArray');
    expect(() => asJSONArray(false)).toThrow('Unable to cast boolean to JSONArray');
  });
});

describe('asJSONObject', () => {
  it('accepts an object', () => {
    expect(asJSONObject({ val: 12, 42: 'Life' })).toEqual({ val: 12, 42: 'Life' });
  });
  it('doesn\'t accept array', () => {
    expect(() => asJSONObject([ 12 ])).toThrow('Unable to cast object to JSONObject');
  });
  it('doesn\'t accept null', () => {
    expect(() => asJSONObject(null)).toThrow('Unable to cast object to JSONObject');
  });
  it('doesn\'t accept primitives', () => {
    expect(() => asJSONObject(12)).toThrow('Unable to cast number to JSONObject');
    expect(() => asJSONObject('fail')).toThrow('Unable to cast string to JSONObject');
    expect(() => asJSONObject(false)).toThrow('Unable to cast boolean to JSONObject');
  });
});

describe('asOptJSONValue', () => {
  it('accepts numbers', () => {
    expect(asOptJSONValue(12)).toBe(12);
  });
  it('accepts strings', () => {
    expect(asOptJSONValue('Don\'t panic')).toBe('Don\'t panic');
  });
  it('accepts boolean', () => {
    expect(asOptJSONValue(true)).toBe(true);
  });
  it('accepts null', () => {
    expect(asOptJSONValue(null)).toBe(undefined);
  });
  it('accepts arrays', () => {
    expect(asOptJSONValue([12, 'help', [], {}])).toEqual([12, 'help', [], {}]);
  });
  it('accepts records', () => {
    expect(asOptJSONValue({
      first: [],
      42: false,
      nested: {
        val: 1
      }
    })).toEqual({
      first: [],
      42: false,
      nested: {
        val: 1
      }
    });
  });
  it('does not accept symbol', () => {
    expect(() => asOptJSONValue(Symbol('fail'))).toThrow('Unable to cast symbol to JSONValue');
  });
  it('accepts undefined', () => {
    expect(asOptJSONValue(undefined)).toBe(undefined);
  });
  it('does not accept array elements that aren\'t JSONValue', () => {
    expect(() => asOptJSONValue([ Symbol('bad') ])).toThrow('Unable to cast object to JSONValue');
  });
  it('does not accept object values that aren\'t JSONValue', () => {
    expect(() => asOptJSONValue({ val: Symbol('bad') })).toThrow('Unable to cast object to JSONValue');
  });
});

describe('asOptJSONArray', () => {
  it('accepts an array', () => {
    expect(asOptJSONArray([ 12 ])).toEqual([ 12 ]);
  });
  it('doesn\'t accept object', () => {
    expect(() => asOptJSONArray({ val: 12 })).toThrow('Unable to cast object to JSONArray');
  });
  it('accepts nullish', () => {
    expect(asOptJSONArray(null)).toBe(undefined);
    expect(asOptJSONArray(undefined)).toBe(undefined);
  });
  it('doesn\'t accept primitives', () => {
    expect(() => asOptJSONArray(12)).toThrow('Unable to cast number to JSONArray');
    expect(() => asOptJSONArray('fail')).toThrow('Unable to cast string to JSONArray');
    expect(() => asOptJSONArray(false)).toThrow('Unable to cast boolean to JSONArray');
  });
});

describe('asOptJSONObject', () => {
  it('accepts an object', () => {
    expect(asOptJSONObject({ val: 12, 42: 'Life' })).toEqual({ val: 12, 42: 'Life' });
  });
  it('doesn\'t accept array', () => {
    expect(() => asOptJSONObject([ 12 ])).toThrow('Unable to cast object to JSONObject');
  });
  it('accepts nullish', () => {
    expect(asOptJSONObject(null)).toBe(undefined);
    expect(asOptJSONObject(undefined)).toBe(undefined);

  });
  it('doesn\'t accept primitives', () => {
    expect(() => asOptJSONObject(12)).toThrow('Unable to cast number to JSONObject');
    expect(() => asOptJSONObject('fail')).toThrow('Unable to cast string to JSONObject');
    expect(() => asOptJSONObject(false)).toThrow('Unable to cast boolean to JSONObject');
  });
});