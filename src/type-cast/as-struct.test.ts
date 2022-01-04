import { isString } from '../type-check/is-primitive';
import { isStruct } from '../type-check/is-struct';
import { asOptStruct, asStruct } from './as-struct';

const fn = () => false;

describe('asStruct', () => {
  it('empty struct', () => {
    const asEmptyStruct = asStruct({});
    const label = '{}';
    // intended
    expect(asEmptyStruct({})).toEqual({});
    // fallback
    expect(asEmptyStruct(null, {})).toEqual({});
    expect(asEmptyStruct(undefined, {})).toEqual({});
    // should fail
    expect(() => asEmptyStruct('test')).toThrow(`Unable to cast string to ${label}`);
    expect(() => asEmptyStruct(0)).toThrow(`Unable to cast number to ${label}`);
    expect(() => asEmptyStruct(false)).toThrow(`Unable to cast boolean to ${label}`);
    expect(() => asEmptyStruct(null)).toThrow(`Unable to cast null to ${label}`);
    expect(() => asEmptyStruct(undefined)).toThrow(`Unable to cast undefined to ${label}`);
    expect(() => asEmptyStruct([])).toThrow(`Unable to cast Array to ${label}`);
    expect(() => asEmptyStruct(fn)).toThrow(`Unable to cast function to ${label}`);
  });

  it('simple struct', () => {
    const asSimpleStruct = asStruct({ value: isString });
    const label = '{ value: string }';
    // intended
    expect(asSimpleStruct({ value: 'hello' })).toEqual({ value: 'hello' });
    // fallback
    expect(asSimpleStruct(null, { value: 'hello' })).toEqual({ value: 'hello' });
    expect(asSimpleStruct(undefined, { value: 'hello' })).toEqual({ value: 'hello' });
    // should fail
    expect(() => asSimpleStruct({ value: 12 })).toThrow(`Unable to cast { value: number } to ${label}`);
    expect(() => asSimpleStruct({})).toThrow(`Unable to cast {} to ${label}`);
    expect(() => asSimpleStruct('test')).toThrow(`Unable to cast string to ${label}`);
    expect(() => asSimpleStruct(0)).toThrow(`Unable to cast number to ${label}`);
    expect(() => asSimpleStruct(false)).toThrow(`Unable to cast boolean to ${label}`);
    expect(() => asSimpleStruct(null)).toThrow(`Unable to cast null to ${label}`);
    expect(() => asSimpleStruct(undefined)).toThrow(`Unable to cast undefined to ${label}`);
    expect(() => asSimpleStruct([])).toThrow(`Unable to cast Array to ${label}`);
    expect(() => asSimpleStruct(fn)).toThrow(`Unable to cast function to ${label}`);
  });

  it('nested struct', () => {
    const isSimpleStruct = isStruct({ value: isString });
    const asNestedStruct = asStruct({ value: isSimpleStruct });
    const label = '{ value: { value: string } }';
    // intended
    expect(asNestedStruct({ value: { value: 'hello' } })).toEqual({ value: { value: 'hello' } });
    // fallback
    expect(asNestedStruct(null, { value: { value: 'hello' } })).toEqual({ value: { value: 'hello' } });
    expect(asNestedStruct(undefined, { value: { value: 'hello' } })).toEqual({ value: { value: 'hello' } });
    // should fail
    expect(() => asNestedStruct({ value: {}})).toThrow(`Unable to cast { value: {} } to ${label}`);
    expect(() => asNestedStruct({ value: 12 })).toThrow(`Unable to cast { value: number } to ${label}`);
    expect(() => asNestedStruct({})).toThrow(`Unable to cast {} to ${label}`);
    expect(() => asNestedStruct('test')).toThrow(`Unable to cast string to ${label}`);
    expect(() => asNestedStruct(0)).toThrow(`Unable to cast number to ${label}`);
    expect(() => asNestedStruct(false)).toThrow(`Unable to cast boolean to ${label}`);
    expect(() => asNestedStruct(null)).toThrow(`Unable to cast null to ${label}`);
    expect(() => asNestedStruct(undefined)).toThrow(`Unable to cast undefined to ${label}`);
    expect(() => asNestedStruct([])).toThrow(`Unable to cast Array to ${label}`);
    expect(() => asNestedStruct(fn)).toThrow(`Unable to cast function to ${label}`);
  });
});

describe('asOptStruct', () => {
  it('empty struct', () => {
    const asEmptyStruct = asOptStruct({});
    const label = 'Optional<{}>';
    // intended
    expect(asEmptyStruct({})).toEqual({});
    expect(asEmptyStruct(null)).toBeUndefined();
    expect(asEmptyStruct(undefined)).toBeUndefined();
    // should fail
    expect(() => asEmptyStruct('test')).toThrow(`Unable to cast string to ${label}`);
    expect(() => asEmptyStruct(0)).toThrow(`Unable to cast number to ${label}`);
    expect(() => asEmptyStruct(false)).toThrow(`Unable to cast boolean to ${label}`);
    expect(() => asEmptyStruct([])).toThrow(`Unable to cast Array to ${label}`);
    expect(() => asEmptyStruct(fn)).toThrow(`Unable to cast function to ${label}`);
  });

  it('simple struct', () => {
    const asSimpleStruct = asOptStruct({ value: isString });
    const label = 'Optional<{ value: string }>';
    // intended
    expect(asSimpleStruct({ value: 'hello' })).toEqual({ value: 'hello' });
    expect(asSimpleStruct(null)).toBeUndefined();
    expect(asSimpleStruct(undefined)).toBeUndefined();
    // should fail
    expect(() => asSimpleStruct({})).toThrow(`Unable to cast {} to ${label}`);
    expect(() => asSimpleStruct('test')).toThrow(`Unable to cast string to ${label}`);
    expect(() => asSimpleStruct(0)).toThrow(`Unable to cast number to ${label}`);
    expect(() => asSimpleStruct(false)).toThrow(`Unable to cast boolean to ${label}`);
    expect(() => asSimpleStruct([])).toThrow(`Unable to cast Array to ${label}`);
    expect(() => asSimpleStruct(fn)).toThrow(`Unable to cast function to ${label}`);
  });

  it('nested struct', () => {
    const isSimpleStruct = isStruct({ value: isString });
    const asNestedStruct = asOptStruct({ value: isSimpleStruct });
    const label = 'Optional<{ value: { value: string } }>';
    // intended
    expect(asNestedStruct({ value: { value: 'hello' } })).toEqual({ value: { value: 'hello' } });
    expect(asNestedStruct(null)).toBeUndefined();
    expect(asNestedStruct(undefined)).toBeUndefined();
    // should fail
    expect(() => asNestedStruct({ value: {}})).toThrow(`Unable to cast { value: {} } to ${label}`);
    expect(() => asNestedStruct({ value: 12 })).toThrow(`Unable to cast { value: number } to ${label}`);
    expect(() => asNestedStruct({})).toThrow(`Unable to cast {} to ${label}`);
    expect(() => asNestedStruct('test')).toThrow(`Unable to cast string to ${label}`);
    expect(() => asNestedStruct(0)).toThrow(`Unable to cast number to ${label}`);
    expect(() => asNestedStruct(false)).toThrow(`Unable to cast boolean to ${label}`);
    expect(() => asNestedStruct([])).toThrow(`Unable to cast Array to ${label}`);
    expect(() => asNestedStruct(fn)).toThrow(`Unable to cast function to ${label}`);
  });
});

