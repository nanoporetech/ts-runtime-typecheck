export type TypeCast<Output, Input = unknown> = (value: Input, fallback?: Output) => Output;
export type OptionalTypeCast<Output, Input = unknown> = (value: Input) => Output | undefined;