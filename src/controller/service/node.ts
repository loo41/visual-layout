import React from 'react';
import { AST, Node, Style } from 'src/model';
import { NodeOption } from 'src/model/node';
import { PageService } from '..';
import { EventType } from '../browser';

export default class NodeService extends Node {
  constructor(Options: NodeOption, public pageService?: PageService) {
    super(Options);
  }

  createElement = ({ eventType }: { eventType: EventType }): React.ReactElement => {
    return this.create({ node: this, eventType });
  };

  copy = (node?: NodeService): NodeService => {
    const { type, name, styles, children, element, className, component, isRoot } =
      node || this;
    return new NodeService(
      {
        type,
        styles,
        element,
        name,
        isRoot,
        className,
        component,
        children: children?.map(children => children.copy()) || [],
      },
      this.pageService,
    );
  };

  setStyles = (styles: Style[]) => {
    this.styles = styles;
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
