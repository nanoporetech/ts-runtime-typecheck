import type { Definition } from './Definition.type';

export function stringifyDefinition (value: Definition): string {
  if (typeof value === 'string') {
    return value;
  }

  const elements = Object.entries(value);
  if (elements.length === 0) {
    return '{}';
  }
  return `{ ${elements.map(([k, v]) => `${k}: ${stringifyDefinition(v)}`).join(', ')} }`;
}