import { AST, Node, Style } from 'src/model';
import { NodeOption } from 'src/model/node';
import { PageService } from '..';

export default class NodeService extends Node {
  constructor(Options: NodeOption, public pageService?: PageService) {
    super(Options);
  }

  copy = (node?: NodeService): NodeService => {
    const { type, styles, children, element, className, isRoot } = node || this;
    return new NodeService(
      {
        type,
        styles,
        element,
        isRoot,
        className,
        children: children?.map(children => children.copy()) || [],
      },
      this.pageService,
    );
  };

  setStyles = (styles: Style[]) => {
    this.styles = styles;
  };

  innerHTML = (ele: HTMLElement) => {
    this.element = ele;
  };

  clearEffect = () => {
    this.isSelect = false;
    this.children.forEach(node => node.clearEffect());
  };

  toString = (): string => {
    const { id, children } = this;
    // why isSelect (toString can`t change component no`t update)
    return `${id}:${children.map(node => node.toString())}`;
  };

  setClassName = (className: string) => {
    this.className = className;
  };

  static createNodeService = (target: AST): NodeService => {
    return new NodeService({
      ...target,
      children: target.children.map(node => NodeService.createNodeService(node)),
    });
  };
}
