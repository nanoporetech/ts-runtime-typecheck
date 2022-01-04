/**
 * Definition embodies the definition of a type e.g.
 * 
 * ```
 * let a: Definition = 'number';
 * let b: Definition = {
 *   foo: 'number',
 *   bar: { isNext: 'boolean' }
 * }
 * ```
 */
export type Definition = string | {
  [key: string]: Definition
};