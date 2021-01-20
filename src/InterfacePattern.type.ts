import type { Dictionary } from './Dictionary.type';
import type { TypeCheck, UnwrapTypeCheck } from './TypeCheck.type';

export type InterfacePattern = Dictionary<TypeCheck<unknown>>;
export type UnwrapInterfacePattern<Pattern extends InterfacePattern> = { [K in keyof Pattern]: UnwrapTypeCheck<Pattern[K]>};