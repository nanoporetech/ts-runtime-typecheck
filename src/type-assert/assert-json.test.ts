import {
  assertJSONArray,
  assertJSONObject,
  assertJSONValue,
  assertOptJSONArray,
  assertOptJSONObject,
  assertOptJSONValue
} from './assert-json';

describe('assertJSONValue', () => {
  it('accepts numbers', () => {
    assertJSONValue(12);
  });
  it('accepts strings', () => {
    assertJSONValue('Don\'t panic');
  });
  it('accepts boolean', () => {
    assertJSONValue(true);
    assertJSONValue(false);
  });
  it('accepts null', () => {
    assertJSONValue(null);
  });
  it('accepts arrays', () => {
    assertJSONValue([12, 'help', [], {}]);
  });
  it('accepts records', () => {
    assertJSONValue({
      first: [],
      42: false,
      nested: {
        val: 1
      }
    });
  });
  it('does not accept undefined', () => {
    expect(() => assertJSONValue(undefined)).toThrow('value is not a JSONValue');
  });
  it('does not accept array elements that aren\'t JSONValue', () => {
    expect(() => assertJSONValue([ Symbol('bad') ])).toThrow('value is not a JSONValue');
  });
  it('does not accept object values that aren\'t JSONValue', () => {
    expect(() => assertJSONValue({ val: Symbol('bad') })).toThrow('value is not a JSONValue');
  });
  it('accepts custom label', () => {
    expect(() => assertJSONValue({ val: Symbol('bad') }, 'Symbol(BAD)')).toThrow('Symbol(BAD) is not a JSONValue');
  });
});

describe('assertJSONArray', () => {
  it('accepts an array', () => {
    assertJSONArray([12]);
  });
  it('doesn\'t accept object', () => {
    expect(() => assertJSONArray({ val: 12 })).toThrow('value is not a JSONArray');
  });
  it('doesn\'t accept null', () => {
    expect(() => assertJSONArray(null)).toThrow('value is not a JSONArray');
  });
  it('doesn\'t accept primitives', () => {
    expect(() => assertJSONArray(12)).toThrow('value is not a JSONArray');
    expect(() => assertJSONArray('fail')).toThrow('value is not a JSONArray');
    expect(() => assertJSONArray(false)).toThrow('value is not a JSONArray');
  });

  it('accepts custom label', () => {
    expect(() => assertJSONArray(null, 'Symbol(BAD)')).toThrow('Symbol(BAD) is not a JSONArray');
  });
});

describe('assertJSONObject', () => {
  it('accepts an object', () => {
    assertJSONObject({ val: 12, 42: 'Life' });
  });
  it('doesn\'t accept array', () => {
    expect(() => assertJSONObject([ 12 ])).toThrow('value is not a JSONObject');
  });
  it('doesn\'t accept null', () => {
    expect(() => assertJSONObject(null)).toThrow('value is not a JSONObject');
  });
  it('doesn\'t accept primitives', () => {
    expect(() => assertJSONObject(12)).toThrow('value is not a JSONObject');
    expect(() => assertJSONObject('fail')).toThrow('value is not a JSONObject');
    expect(() => assertJSONObject(false)).toThrow('value is not a JSONObject');
  });

  it('accepts custom label', () => {
    expect(() => assertJSONObject(null, 'Symbol(BAD)')).toThrow('Symbol(BAD) is not a JSONObject');
  });
});

describe('assertOptJSONValue', () => {
  it('accepts numbers', () => {
    assertOptJSONValue(12);
  });
  it('accepts strings', () => {
    assertOptJSONValue('Don\'t panic');
  });
  it('accepts boolean', () => {
    assertOptJSONValue(true);
    assertOptJSONValue(false);
  });
  it('accepts null', () => {
    assertOptJSONValue(null);
  });
  it('accepts arrays', () => {
    assertOptJSONValue([12, 'help', [], {}]);
  });
  it('accepts records', () => {
    assertOptJSONValue({
      first: [],
      42: false,
      nested: {
        val: 1
      }
    });
  });
  it('does not accept symbol', () => {
    expect(() => assertOptJSONValue(Symbol('fail'))).toThrow('value is not a Optional<JSONValue>');
  });
  it('accepts undefined', () => {
    assertOptJSONValue(undefined);
  });
  it('does not accept array elements that aren\'t JSONValue', () => {
    expect(() => assertOptJSONValue([ Symbol('fail') ])).toThrow('value is not a Optional<JSONValue>');
  });
  it('does not accept object values that aren\'t JSONValue', () => {
    expect(() => assertOptJSONValue({ val: Symbol('fail') })).toThrow('value is not a Optional<JSONValue>');
  });
  it('accepts custom label', () => {
    expect(() => assertOptJSONValue({ val: Symbol('bad') }, 'Symbol(BAD)')).toThrow('Symbol(BAD) is not a Optional<JSONValue>');
  });
});

describe('assertOptJSONArray', () => {
  it('accepts an array', () => {
    assertOptJSONArray([ 12 ]);
  });
  it('doesn\'t accept object', () => {
    expect(() => assertOptJSONArray({ val: 12 })).toThrow('value is not a Optional<JSONArray>');
  });
  it('accepts nullish', () => {
    assertOptJSONArray(null);
    assertOptJSONArray(undefined);
  });
  it('doesn\'t accept primitives', () => {
    expect(() => assertOptJSONArray(12)).toThrow('value is not a Optional<JSONArray>');
    expect(() => assertOptJSONArray('fail')).toThrow('value is not a Optional<JSONArray>');
    expect(() => assertOptJSONArray(false)).toThrow('value is not a Optional<JSONArray>');
  });
  it('accepts a custom label', () => {
    expect(() => assertOptJSONArray(false, 'Easter Egg')).toThrow('Easter Egg is not a Optional<JSONArray>');
  });
});

describe('assertOptJSONObject', () => {
  it('accepts an object', () => {
    assertOptJSONObject({ val: 12, 42: 'Life' });
  });
  it('doesn\'t accept array', () => {
    expect(() => assertOptJSONObject([ 12 ])).toThrow('value is not a Optional<JSONObject>');
  });
  it('accepts nullish', () => {
    assertOptJSONObject(null);
    assertOptJSONObject(undefined);
  });
  it('doesn\'t accept primitives', () => {
    expect(() => assertOptJSONObject(12)).toThrow('value is not a Optional<JSONObject>');
    expect(() => assertOptJSONObject('fail')).toThrow('value is not a Optional<JSONObject>');
    expect(() => assertOptJSONObject(false)).toThrow('value is not a Optional<JSONObject>');
  });
  it('accepts a custom label', () => {
    expect(() => assertOptJSONObject(false, 'Easter Egg')).toThrow('Easter Egg is not a Optional<JSONObject>');
  });
});