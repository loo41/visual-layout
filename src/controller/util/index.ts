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

const getStylesProps = (node: NodeService) => {
  const { styles, isSelect } = node;

  return (node.pageService?.options.previewStyle || [])
    .concat(isSelect ? node.pageService?.options.selectStyle || [] : [])
    .concat(styles)
    .reduce((styles: { [props: string]: string }, style) => {
      const { key, value } = style;
      styles[strikeToCamel(key)] = value;
      return styles;
    }, {});
};
export { randomStr, strikeToCamel, getStylesProps };
