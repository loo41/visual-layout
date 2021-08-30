import { NodeService } from '..';

class Doc {
  create = (node: NodeService): HTMLElement => {
    const { type, children } = node;
    const ele = document.createElement(type);
    node.innerHTML(ele);
    this.renderStyles(ele, node);
    children?.forEach(page => ele.appendChild(this.create(page)));
    return ele;
  };

  renderStyles = (ele: HTMLElement, node: NodeService) => {
    const { styles, isSelect } = node;
    if (styles?.length) {
      ele.style.cssText = (node.pageService?.options.previewStyle || [])
        .concat(isSelect ? node.pageService?.options.selectStyle || [] : [])
        .concat(styles)
        .map(({ key, value }) => `${key}: ${value}`)
        .join(';');
    }
  };
}

export default Doc;
