import _ from 'lodash';
import { NodeService } from 'src/controller';
import { Doc } from 'src/controller/browser';
import { Component } from 'src/controller/react/container';
import { Children, NodeOption, Style } from '.';
class Node extends Doc {
  public type: 'Element' | 'Component';
  public _name: string;
  public hasCanChild?: boolean;
  public children?: Children<NodeService | string>;
  public isDelete: boolean = false;
  public isSelect: boolean = false;
  public element?: React.ReactElement;
  public isRoot?: boolean = false;
  private _styles?: Style[];
  public className?: string;
  public component?: Component;
  public id: number;
  private static random: number = 1;
  constructor(Option: NodeOption) {
    super();
    const {
      type,
      styles,
      children,
      _name,
      element,
      className,
      component,
      id,
      hasCanChild,
      isRoot = false,
    } = Option;
    this.type = type;
    this._name = _name;
    this._styles = styles;
    this.children = children;
    this.element = element;
    this.isRoot = isRoot;
    this.component = component;
    this.id = id || Node.Random();
    this.hasCanChild = hasCanChild;
    this.className = className;
  }

  static Random() {
    return Node.random++;
  }

  set styles(styles: Style[]) {
    this._styles = styles;
  }

  get styles() {
    this._styles = _.uniqBy(this._styles, 'key');
    return this._styles;
  }
}

export default Node;
