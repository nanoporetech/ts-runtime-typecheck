export interface TypeAssert<T> {
  (value: unknown): value is T;
  TYPE_NAME?: string;
}
export type UnwrapTypeAssert<T extends TypeAssert<unknown>> = T extends TypeAssert<infer P> ? P : never;