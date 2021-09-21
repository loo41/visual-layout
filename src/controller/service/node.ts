import React from 'react';
import { CodeConfig, JSONComponent, NodeObject, Props, Style } from 'src/model';
import { NodeOption } from 'src/model';
import { PageService } from '..';
import { EventType } from '../browser';
import { isString } from 'src/controller/util';
import { isNull } from 'lodash';
import Node from 'src/model/node';

export type NodePageService = Pick<
  PageService,
  'options' | 'currentNode' | 'setCurrentNode' | 'getIdx' | 'update'
>;
export default class NodeService extends Node {
  public pageService: NodePageService;
  // eslint-disable-next-line
  constructor(Options: NodeOption, pageService: NodePageService) {
    super(Options);
    this.pageService = pageService;
  }

  createElement = ({ eventType }: { eventType: EventType }): React.ReactElement => {
    return this.create({ node: this, eventType });
  };

  copy = ({ isCopyID }: { isCopyID?: boolean }): NodeService => {
    const { children, element, id } = this;
    return new NodeService(
      {
        ...this.getBaseAttribute(this),
        element,
        id: isCopyID ? id : this.pageService.getIdx(),
        children: isString(children)
          ? children
          : children?.map(children =>
              isString(children) ? children : children.copy({ isCopyID }),
            ),
      },
      this.pageService,
    );
  };

  setStyles = (styles: Style[]) => {
    this.styles = styles;
  };

  setContent = (content: string) => {
    if (Array.isArray(this.children)) {
      if (isString(this.children[0])) {
        this.children[0] = content;
      } else {
        this.children?.unshift(content);
      }
    } else {
      if (!isNull(this.children)) {
        this.children = [content];
      } else {
        console.error(`Error: ${this._name} can not add content`);
      }
    }
  };

  setComponent = (component: JSONComponent, _this: PageService) => {
    const { _name, children, _type, styles, className, hasCanChild, ...props } =
      component;
    this._name = _name;
    this.props = props;
    this.type = _type;
    this.styles = styles || [];
    this.className = className;
    this.hasCanChild = hasCanChild;

    const newNodeService = (options: JSONComponent): NodeService => {
      const { _name, children, _type, styles, className, hasCanChild, ...rest } =
        options;
      return new NodeService(
        {
          _name: options._name,
          type: _type,
          styles: styles,
          className: className,
          hasCanChild: hasCanChild,
          props: rest,
          id: _this.idx,
          children: isString(children)
            ? children
            : children?.map(child =>
                isString(child) ? child : newNodeService(child),
              ),
        },
        this.pageService,
      );
    };

    this.children = isString(children)
      ? children
      : children?.map(child => (isString(child) ? child : newNodeService(child)));
  };

  getComponentConfig = (node: NodeService = this): Props => {
    return {
      _name: node._name,
      _type: node.type,
      styles: node.styles,
      className: node.className,
      hasCanChild: node.hasCanChild,
      ...node.props,
      children: isString(node.children)
        ? node.children
        : node.children?.map(child =>
            isString(child) ? child : this.getComponentConfig(child),
          ),
    };
  };

  clearEffect = () => {
    this.isSelect = false;
    if (!isString(this.children)) {
      this.children?.forEach(node => !isString(node) && node.clearEffect());
    }
  };

  toString = (): string => {
    const { id, children } = this;
    // why isSelect (toString can`t change component no`t update)
    return `${id}:${
      isString(children) ? children : children?.map(node => node.toString())
    }`;
  };

  setClassName = (className: string) => {
    this.className = className;
  };

  setCodeConfig = (codeConfig: CodeConfig) => {
    this.codeConfig = codeConfig;
  };

  getBaseAttribute = (node: NodeService) => {
    const {
      type,
      _name,
      hasCanChild,
      isDelete,
      isSelect,
      isRoot,
      codeConfig,
      styles,
      className,
      props,
      id,
    } = node;
    return {
      type,
      _name,
      hasCanChild,
      isDelete,
      isSelect,
      isRoot,
      styles,
      codeConfig,
      className,
      props,
      id,
    };
  };

  toObject = (): NodeObject => {
    return Object.assign(this.getBaseAttribute(this), {
      children: isString(this.children)
        ? this.children
        : this.children?.map(child => (isString(child) ? child : child.toObject())),
      random: Node.random,
      element: null,
    });
  };
}
