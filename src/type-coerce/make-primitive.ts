import { inspectType } from '../inspectType';
import { isString, isNumber, isBoolean } from '../type-check/is-primitive';

export function makeString(obj: unknown): string {
  if (isString(obj)) {
    return obj;
  }
  if (isNumber(obj) || isBoolean(obj)) {
    return obj.toString();
  }

  throw new Error(`Unable to cast ${inspectType(obj)} to String`);
}

export function makeNumber(obj: unknown): number {
  if (isNumber(obj)) {
    return obj;
  }
  if (isString(obj)) {
    const value = +obj; // unlike parseFloat this will return NaN for strings like '4four'
    if (!isNaN(value)) {
      return value;
    }
  }
  if (isBoolean(obj)) {
    return +obj;
  }

  throw new Error(`Unable to cast ${inspectType(obj)} to Number`);
}

export function makeBoolean(obj: unknown): boolean {
  if (isBoolean(obj)) {
    return obj;
  }
  if (isNumber(obj)) {
    return obj !== 0;
  }
  if (isString(obj)) {
    switch (obj) {
      case 'true':
        return true;
      case 'false':
        return false;
    }
  }

  throw new Error(`Unable to cast ${inspectType(obj)} to Boolean`);
}