import type { InterfacePattern, UnwrapInterfacePattern } from '../InterfacePattern.type';
import type { TypeCheck, UnwrapTypeCheck } from '../TypeCheck.type';
import type { Optional } from '../Optional.type';

import { memoize } from '../memoize';
import { isNullish, isDictionary } from './is-primitive';

function structLabel (pattern: InterfacePattern): string {
  const entries = Object.entries(pattern);
  return entries.length === 0 ? '{}' : `{ ${entries.map(([name, check]) => check.TYPE_NAME ? `${name}: ${check.TYPE_NAME}` : name).join('; ')} }`;
}

export const isStruct = memoize(<Pattern extends InterfacePattern> (pattern: Pattern): TypeCheck<{[K in keyof Pattern]: UnwrapTypeCheck<Pattern[K]>}> & { TYPE_NAME: string } => {
  const fn = (val: unknown): val is UnwrapInterfacePattern<Pattern> => {
    if (!isDictionary(val)) {
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

export const isOptStruct = memoize(<Pattern extends InterfacePattern> (pattern: Pattern): TypeCheck<Optional<{[K in keyof Pattern]: UnwrapTypeCheck<Pattern[K]>}>> & { TYPE_NAME: string } => {
  const fn = (val: unknown): val is Optional<UnwrapInterfacePattern<Pattern>> => {
    if (isNullish(val)) {
      return true;
    }

    if (!isDictionary(val)) {
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