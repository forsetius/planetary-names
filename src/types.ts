export type Ctor<T> = { new (): T };

export type CtorAnyParams<T> = { new (...args: any[]): T };

export type Default<T = any> = { default: T };
