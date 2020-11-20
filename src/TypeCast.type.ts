import type { Optional } from './Optional.type';

export type TypeCast<Output, Input = unknown> = (value: Input, fallback?: Output) => Output;
export type OptionalTypeCast<Output, Input = unknown> = (value: Optional<Input>) => Output | undefined;