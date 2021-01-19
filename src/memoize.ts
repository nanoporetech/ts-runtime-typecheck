// eslint-disable-next-line @typescript-eslint/ban-types
export function memoize<P extends object, R> (fn: (par: P) => R): (par: P) => R {
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