export interface TypeAssert<T> {
  (value: unknown): value is T;
  TYPE_NAME?: string;
}
// extract the result type from a type assert
export type UnwrapTypeAssert<T extends TypeAssert<unknown>> = T extends TypeAssert<infer P> ? P : never;
// extract the result type from an array of type asserts and return the resulting union
export type UnwrapTypeAssertArray<T extends TypeAssert<unknown>[]> = T extends TypeAssert<infer P>[] ? P : never;