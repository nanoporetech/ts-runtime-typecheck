import type { InterfacePattern } from '../InterfacePattern.type';

import { memoize } from '../memoize';
import { isStruct } from '../type-check/is-struct';
import { optTypeCast, typeCast } from './type-cast';

export const asStruct = memoize(<Pattern extends InterfacePattern>(pattern: Pattern) => {
  return typeCast(isStruct(pattern));
});

export const asOptStruct = memoize(<Pattern extends InterfacePattern>(pattern: Pattern) => {
  return optTypeCast(isStruct(pattern));
});