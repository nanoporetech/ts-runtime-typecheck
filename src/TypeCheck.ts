import type { TypeCheck } from './TypeCheck.type';

export function getTypeName (isType: TypeCheck<unknown>): string {
  return isType.TYPE_NAME ?? 'unknown';
}