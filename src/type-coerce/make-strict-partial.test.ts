import type { Optional } from '../Optional.type';
import { makeStrictPartial } from './make-strict-partial';

describe('make-strict-partial', () => {
  it ('removes undefined keys from the object', () => {
    interface Source {
      a: Optional<string>;
      b: Optional<boolean>;
      c: Optional<number>;
    }
    const source: Source = {
      a: undefined,
      b: undefined,
      c: 12,
    };
    const result = makeStrictPartial(source);
    expect(Object.keys(result)).toStrictEqual(['c']);
    expect(result.c).toBe(12);
  });
});