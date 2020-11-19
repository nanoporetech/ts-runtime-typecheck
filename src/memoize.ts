import type { Dictionary } from './Dictionary.type';
import type { UnknownFunction } from './UnknownFunction.type';

export function memoize<P extends (UnknownFunction | Dictionary), R> (fn: (par: P) => R): (par: P) => R {
  const map: WeakMap<P, R> = new WeakMap();
  return (par: P) => {
    let result = map.get(par);
    if (!result) {
      result = fn(par);
      map.set(par, result);
    }
    return result;
  };
}