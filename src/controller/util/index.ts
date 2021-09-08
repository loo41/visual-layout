import { NodeService } from '..';
import { EventType } from '../browser';

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

const getStylesProps = (node: NodeService, eventType?: EventType) => {
  const { styles, isSelect } = node;

  const previewStyle =
    node.pageService?.options.previewStyle.filter(
      ({ isCanUse }) => !eventType || eventType === EventType.layout || isCanUse,
    ) || [];

  return previewStyle
    .concat(isSelect ? node.pageService?.options.selectStyle || [] : [])
    .concat(styles)
    .reduce((styles: { [props: string]: string }, style) => {
      const { key, value } = style;
      styles[strikeToCamel(key)] = value;
      return styles;
    }, {});
};

export { randomStr, strikeToCamel, getStylesProps, isFunction };
