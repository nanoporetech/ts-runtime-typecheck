import type { Index } from '../Index.type';
import type { ObjectDict } from '../ObjectDict.type';
import type { UnknownFunction } from '../UnknownFunction.type';

export function isRecord(obj: unknown): obj is ObjectDict {
  return obj !== null && typeof obj === 'object' && Array.isArray(obj) === false;
}

export function isFunction(obj: unknown): obj is UnknownFunction {
  return typeof obj === 'function';
}

export function isBoolean(obj: unknown): obj is boolean {
  return typeof obj === 'boolean';
}

export function isString(obj: unknown): obj is string {
  return typeof obj === 'string';
}

export function isNumber(obj: unknown): obj is number {
  return typeof obj === 'number';
}

export function isIndex(obj: unknown): obj is Index {
  return typeof obj === 'number' || typeof obj === 'string';
}

export function isArray(obj: unknown): obj is unknown[] {
  return Array.isArray(obj);
}

export function isUndefined(obj: unknown): obj is undefined {
  return typeof obj === 'undefined';
}

export function isNullish(obj: unknown): obj is null | undefined {
  return obj === null || typeof obj === 'undefined';
}

export function isDefined<T>(obj: T | undefined): obj is T {
  return !isNullish(obj);
}