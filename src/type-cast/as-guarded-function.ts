import { inspectType } from '../inspectType';
import { invariant } from '../invariant';
import { assertFunction } from '../type-assert/assert-primitive';
import { getTypeName } from '../TypeCheck';
import type { TypeCheck, UnwrapTypeCheck, UnwrapTypeCheckTuple } from '../TypeCheck.type';

export function asGuardedFunction<Params extends TypeCheck<unknown>[], Result extends TypeCheck<unknown>> (fn: unknown, resultCheck: Result, ...paramChecks: Params): (...params: UnwrapTypeCheckTuple<Params>) => UnwrapTypeCheck<Result> {
  assertFunction(fn);
  
  return (...params: UnwrapTypeCheckTuple<Params>): UnwrapTypeCheck<Result> => {
    invariant(params.length === paramChecks.length, `Expected ${paramChecks.length} arguments, but got ${params.length}.`);

    for (const [index, check] of paramChecks.entries()) {
      const value = params[index];
      invariant(check(value), `Argument of type '${inspectType(value)}' is not assignable to params_${index} of type '${getTypeName(check)}'`);
    }

    const result = fn(...params);

    invariant(resultCheck(result), `Return value of type '${inspectType(result)}' is not assignable to type '${getTypeName(resultCheck)}'`);

    return result as UnwrapTypeCheck<Result>;
  };
}