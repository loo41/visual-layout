import React from 'react';
import { AST, Node, Pages, Style } from 'src/model';
import { NodeOption } from 'src/model/node';
import { PageService } from '..';
import { EventType } from '../browser';
import { Component } from 'src/controller/react/container';

export type JSONComponent = Omit<Component, 'children'> & {
  _name: string;
  children?: JSONComponent[] | string;
};

export default class NodeService extends Node {
  constructor(Options: NodeOption, public pageService?: PageService) {
    super(Options);
  }

  createElement = ({ eventType }: { eventType: EventType }): React.ReactElement => {
    return this.create({ node: this, eventType });
  };

  copy = (node?: NodeService): NodeService => {
    const {
      type,
      styles,
      children,
      element,
      content,
      className,
      component,
      isRoot,
    } = node || this;
    return new NodeService(
      {
        type,
        styles,
        element,
        [Pages.NODE_NAME]: (node || this)[Pages.NODE_NAME],
        isRoot,
        className,
        component,
        content,
        children: children?.map(children => children.copy()) || [],
      },
      this.pageService,
    );
  };

  setStyles = (styles: Style[]) => {
    this.styles = styles;
  };

  setContent = (content: string) => {
    this.content = content;
  };

  setComponent = (component: Component) => {
    this.component = component;
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

  componentToJSON = (Component?: Component): JSONComponent | undefined => {
    const component = Component || this.component;

    return (
      component && {
        _name: component[Pages.COMPONENT_NAME],
        ...component,
        children:
          typeof component?.children === 'string'
            ? component?.children
            : (component?.children
                ?.map(child => this.componentToJSON(child))
                .filter(_ => _) as JSONComponent[]),
      }
    );
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
