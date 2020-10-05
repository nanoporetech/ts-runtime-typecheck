export type UnknownFunction<Type = unknown> = (...args: unknown[]) => Type;
export type UnknownAsyncFunction<Type = unknown> = ( ...args: unknown[]) => Promise<Type>;