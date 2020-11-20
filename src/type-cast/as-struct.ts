import type { InterfacePattern } from '../InterfacePattern.type';

import { memoize } from '../memoize';
import { isStruct } from '../type-check/is-struct';
import { optTypeCast, typeCast } from './type-cast';

export const asStruct = memoize(<Pattern extends InterfacePattern>(pattern: Pattern) => {
  const check = isStruct(pattern);
  return typeCast(check.TYPE_NAME, check);
});

export const asOptStruct = memoize(<Pattern extends InterfacePattern>(pattern: Pattern) => {
  const check = isStruct(pattern);
  return optTypeCast(check.TYPE_NAME, check);
});