import { Children } from 'src/model';
import { NodeService } from '..';

const strikeToCamel = (str: string) => {
  return (str + '').replace(/-\D/g, function (match) {
    return match.charAt(1).toUpperCase();
  });
};

const isFunction = (obj: any) =>
  Object.prototype.toString.call(obj) === '[object Function]';

function isString<T>(
  children?: Children<NodeService> | Children | T,
): children is string {
  return typeof children === 'string';
}

const isElement = (value: unknown) => {
  return value && typeof value === 'object' && (value as NodeService)?._name;
};

export { strikeToCamel, isFunction, isString, isElement };
