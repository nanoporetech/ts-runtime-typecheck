export type FuzzyPartial<T> = {
  [P in keyof T]?: T | null; 
};