export interface TypeAssert<T> {
  (value: unknown): value is T;
  TYPE_NAME?: string;
}
