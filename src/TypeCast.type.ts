import type { Optional } from './Optional.type';

export interface TypeCast<Output, Input = unknown> {
  (value: Input): Output;
  /**
   * @deprecated The argument parameter is depreciated.
   * Please use `asType(value ?? fallback)` instead.
   */
  (value: Input, fallback?: Output): Output;
}
// export type TypeCast<Output, Input = unknown> = (value: Input, fallback?: Output) => Output;
export type OptionalTypeCast<Output, Input = unknown> = (value: Optional<Input>) => Output | undefined;