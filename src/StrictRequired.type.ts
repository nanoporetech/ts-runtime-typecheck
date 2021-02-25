export type StrictRequired<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
}
