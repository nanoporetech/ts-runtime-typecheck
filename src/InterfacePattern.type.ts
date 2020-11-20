import type { Dictionary } from './Dictionary.type';
import type { TypeAssert, UnwrapTypeAssert } from './TypeAssert.type';

export type InterfacePattern = Dictionary<TypeAssert<unknown>>;
// NOTE while the below does work, we are not currently using it as over-complicates the visible return type ( while still be functionally identical )
export type UnwrapInterfacePattern<Pattern extends InterfacePattern> = { [K in keyof Pattern]: UnwrapTypeAssert<Pattern[K]>};