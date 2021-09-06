import _ from 'lodash';
import { NodeService } from 'src/controller';
import { Doc } from 'src/controller/browser';
import { Component } from 'src/controller/react/container';
import { randomStr } from 'src/controller/util';
import { AST, Style } from '.';

export type NodeOption = AST & {
  isRoot?: boolean;
  children?: NodeService[];
  id?: number;
  content?: string;
};

class Node extends Doc {
  public type: 'element' | 'Component';
  public _name: string;
  public children: NodeService[];
  public isDelete: boolean = false;
  public isSelect: boolean = false;
  public element?: React.ReactElement;
  public isRoot?: boolean = false;
  private _styles?: Style[];
  public className?: string;
  public component?: Component;
  public content?: string;
  public id?: number;
  private static random: number = 1;
  private static classNames: string[] = [];
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
      content,
      id,
      isRoot = false,
    } = Option;
    this.type = type;
    this._name = _name;
    this._styles = styles;
    this.children = children;
    this.element = element;
    this.isRoot = isRoot;
    this.component = component;
    this.content = content;
    this.id = id || Node.Random();

    if (className) {
      this.className = className;
    } else {
      let className = randomStr();
      while (Node.classNames.includes(className)) {
        className = randomStr();
      }

      Node.classNames.push(className);
      this.className = className;
    }
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
