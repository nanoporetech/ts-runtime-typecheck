import { assertDefined } from './assert-defined';

const fn = () => false;

it('asDefined', () => {
  // intended
  assertDefined(12);
  assertDefined('hi');
  assertDefined(false);
  assertDefined([]);
  assertDefined({});
  assertDefined(fn);

  // should fail
  expect(() => assertDefined(undefined)).toThrow('value is not defined');
  expect(() => assertDefined(null)).toThrow('value is not defined');
  // custom label
  expect(() => assertDefined(undefined, 'Easter Egg')).toThrow('Easter Egg is not defined');
});