import type { TypeAssert } from '../TypeAssert.type';

import { isNumber, isString } from './is-primitive';
import { isStruct, isOptStruct } from './is-struct';

describe('is struct', () => {
  it('works for an empty struct', () => {
    const isEmptyStruct = isStruct({});
    expect(isEmptyStruct({})).toBeTruthy();
  });

  it('match patterns correctly', () => {
    const isStructA = isStruct({ type: isString });
    const isStructB = isStruct({ value: isNumber });
    const isStructAB = isStruct({ type: isString, value: isNumber });
    const isStructC = isStruct({ member: isStructB });

    class C {
      member = { value: 12 };
    }
    const a = { type: 'hello' };
    const b = { value: 12 };
    const c = new C;
    const ab = { type: 'hello', value: 12 };

    expect(isStructA(a)).toBeTruthy();
    expect(isStructA(b)).toBeFalsy();
    expect(isStructA(c)).toBeFalsy();
    expect(isStructA(ab)).toBeTruthy();

    expect(isStructB(a)).toBeFalsy();
    expect(isStructB(b)).toBeTruthy();
    expect(isStructB(c)).toBeFalsy();
    expect(isStructB(ab)).toBeTruthy();

    expect(isStructAB(a)).toBeFalsy();
    expect(isStructAB(b)).toBeFalsy();
    expect(isStructAB(c)).toBeFalsy();
    expect(isStructAB(ab)).toBeTruthy();

    expect(isStructC(a)).toBeFalsy();
    expect(isStructC(b)).toBeFalsy();
    expect(isStructC(c)).toBeTruthy();
    expect(isStructC(ab)).toBeFalsy();
  });

  it('only accepts objects', () => {
    class Dummy {}

    const examples = [
      42,
      'hello',
      true,
      null,
      undefined,
      () => true,
      [],
      {},
      Symbol('bad'),
      new Dummy()
    ];

    const expected = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true
    ];

    const isEmptyStruct = isStruct({});

    for (let i = 0; i < examples.length; i++) {
      expect(isEmptyStruct(examples[i])).toBe(expected[i]);
    }
  });

  it('does not add a type to the label if the TypeAssert does not hold one', () => {
    const test: TypeAssert<string> = (_obj: unknown): _obj is string => true;
    const { TYPE_NAME } = isStruct({ a: test }); 
    expect(TYPE_NAME).toBe('{ a }');
  });
});

describe('is optional struct', () => {
  it('works for an empty struct', () => {
    const isEmptyStruct = isOptStruct({});
    expect(isEmptyStruct({})).toBeTruthy();
  });

  it('match patterns correctly', () => {
    const isStructA = isOptStruct({ type: isString });
    const isStructB = isOptStruct({ value: isNumber });
    const isStructAB = isOptStruct({ type: isString, value: isNumber });
    const isStructC = isOptStruct({ member: isStructB });

    class C {
      member = { value: 12 };
    }
    const a = { type: 'hello' };
    const b = { value: 12 };
    const c = new C;
    const ab = { type: 'hello', value: 12 };

    expect(isStructA(a)).toBeTruthy();
    expect(isStructA(b)).toBeFalsy();
    expect(isStructA(c)).toBeFalsy();
    expect(isStructA(ab)).toBeTruthy();

    expect(isStructB(a)).toBeFalsy();
    expect(isStructB(b)).toBeTruthy();
    expect(isStructB(c)).toBeFalsy();
    expect(isStructB(ab)).toBeTruthy();

    expect(isStructAB(a)).toBeFalsy();
    expect(isStructAB(b)).toBeFalsy();
    expect(isStructAB(c)).toBeFalsy();
    expect(isStructAB(ab)).toBeTruthy();

    expect(isStructC(a)).toBeTruthy();
    expect(isStructC(b)).toBeTruthy();
    expect(isStructC(c)).toBeTruthy();
    expect(isStructC(ab)).toBeTruthy();
    expect(isStructC({ member: 12 })).toBeFalsy();
    expect(isStructC({ member: { value: 'string' }})).toBeFalsy();
  });

  it('only accepts objects', () => {
    class Dummy {}

    const examples = [
      42,
      'hello',
      true,
      null,
      undefined,
      () => true,
      [],
      {},
      Symbol('bad'),
      new Dummy()
    ];

    const expected = [
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      true,
      false,
      true
    ];

    const isEmptyStruct = isOptStruct({});

    for (let i = 0; i < examples.length; i++) {
      expect(isEmptyStruct(examples[i])).toBe(expected[i]);
    }
  });

  it('does not add a type to the label if the TypeAssert does not hold one', () => {
    const test: TypeAssert<string> = (_obj: unknown): _obj is string => true;
    const { TYPE_NAME } = isOptStruct({ a: test }); 
    expect(TYPE_NAME).toBe('{ a }');
  });

});