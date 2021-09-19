import { isObject } from 'src/util';

export type Get = (
  target: object,
  propertyKey: string,
  receiver: ProxyConstructor,
) => void;

export type Set = (
  target: object,
  propertyKey: string,
  value: unknown,
  receiver: ProxyConstructor,
) => void;

function proxy<T extends object>(targe: T, get?: Get, set?: Set): T {
  const handler = <T extends object>() => {
    return {
      get(target: T, propertyKey: string, receiver: ProxyConstructor) {
        const value = Reflect.get(target, propertyKey, receiver);
        if (Array.isArray(value) || isObject(value)) {
          return setProxy(value);
        }

        get?.(target, propertyKey, receiver);
        return value;
      },
      set<U>(target: T, propertyKey: string, value: U, receiver: ProxyConstructor) {
        set?.(target, propertyKey, value, receiver);
        return Reflect.set(target, propertyKey, value, receiver);
      },
    };
  };

  const setProxy = <T extends object>(targe: T): T => {
    return new Proxy(targe, handler());
  };

  return setProxy(targe);
}

export default proxy;
