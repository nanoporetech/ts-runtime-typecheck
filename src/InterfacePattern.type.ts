import type { Dictionary } from './Dictionary.type';
import type { TypeAssert, UnwrapTypeAssert } from './TypeAssert.type';

export type InterfacePattern = Dictionary<TypeAssert<unknown>>;
export type UnwrapInterfacePattern<Pattern extends InterfacePattern> = { [K in keyof Pattern]: UnwrapTypeAssert<Pattern[K]>};