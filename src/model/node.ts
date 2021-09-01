import _ from 'lodash';
import { type } from 'os';
import { NodeService } from 'src/controller';
import { Doc } from 'src/controller/browser';
import { Component } from 'src/controller/react/container';
import { randomStr } from 'src/controller/util';
import { AST, Style } from '.';

export type NodeOption = AST & { isRoot?: boolean; children?: NodeService[] };
class Node extends Doc {
  public type: 'label' | 'component';
  public name: string;
  private _styles: Style[];
  public children: NodeService[];
  public element?: React.ReactElement;
  public isDelete: boolean = false;
  public isSelect: boolean = false;
  public isRoot?: boolean = false;
  public className?: string;
  public component?: Component;
  public id?: number;
  private static random: number = 1;
  private static classNames: string[] = [];
  constructor(Option: NodeOption) {
    super();
    const {
      type,
      name,
      styles,
      children,
      element,
      className,
      component,
      isRoot = false,
    } = Option;
    this.type = type;
    this.name = name;
    this._styles = styles;
    this.children = children;
    this.element = element;
    this.isRoot = isRoot;
    this.component = component;
    this.id = Node.Random();

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
