export interface TypeCheck<T> {
  (value: unknown): value is T;
  TYPE_NAME?: string;
}
// extract the result type from a type assert
export type UnwrapTypeCheck<T extends TypeCheck<unknown>> = T extends TypeCheck<infer P> ? P : never;
// extract the result type from an array of type asserts and return the resulting union
export type UnwrapTypeCheckArray<T extends TypeCheck<unknown>[]> = T extends TypeCheck<infer P>[] ? P : never;