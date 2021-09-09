import { Children } from 'src/model';
import { NodeService } from '..';

const randomStr = (strLen: number = 5) => {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  return new Array(strLen)
    .fill(0)
    .map(() => str.charAt(Math.floor(Math.random() * str.length)))
    .join('');
};

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

export { randomStr, strikeToCamel, isFunction, isString };
