import type { InterfacePattern, UnwrapInterfacePattern } from '../InterfacePattern.type';
import type { TypeAssert, UnwrapTypeAssert } from '../TypeAssert.type';
import type { Optional } from '../Optional.type';

import { memoize } from '../memoize';
import { isNullish, isRecord } from './is-primitive';

function structLabel (pattern: InterfacePattern): string {
  const entries = Object.entries(pattern);
  return entries.length === 0 ? '{}' : `{ ${entries.map(([name, check]) => check.TYPE_NAME ? `${name}: ${check.TYPE_NAME}` : name).join('; ')} }`;
}

export const isStruct = memoize(<Pattern extends InterfacePattern> (pattern: Pattern): TypeAssert<{[K in keyof Pattern]: UnwrapTypeAssert<Pattern[K]>}> & { TYPE_NAME: string } => {
  const fn = (val: unknown): val is UnwrapInterfacePattern<Pattern> => {
    if (!isRecord(val)) {
      return false;
    }

    for (const [prop, check] of Object.entries(pattern)) {
      if (!check(val[prop])) {
        return false;
      }
    }

    return true;
  };

  fn.TYPE_NAME = structLabel(pattern);

  return fn;
});

export const isOptStruct = memoize(<Pattern extends InterfacePattern> (pattern: Pattern): TypeAssert<Optional<{[K in keyof Pattern]: UnwrapTypeAssert<Pattern[K]>}>> & { TYPE_NAME: string } => {
  const fn = (val: unknown): val is Optional<UnwrapInterfacePattern<Pattern>> => {
    if (isNullish(val)) {
      return true;
    }

    if (!isRecord(val)) {
      return false;
    }

    for (const [prop, check] of Object.entries(pattern)) {
      if (!check(val[prop])) {
        return false;
      }
    }

    return true;
  };
  fn.TYPE_NAME = structLabel(pattern);
  return fn;
});