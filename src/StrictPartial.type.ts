export type StrictPartial<T> = {
  [P in keyof T]?: NonNullable<T[P]>;
}
