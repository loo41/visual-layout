import _ from 'lodash';
import { NodeService } from 'src/controller';
import { randomStr } from 'src/controller/util';
import { Style } from '.';

export type NodeOption = Omit<Node, 'isDelete' | 'isSelect'>;

class Node {
  public type: string;
  private _styles: Style[];
  public children: NodeService[];
  public element?: HTMLElement;
  public isDelete: boolean = false;
  public isSelect: boolean = false;
  public isRoot?: boolean = false;
  public className?: string;
  public id?: number;
  private static random: number = 1;
  private static classNames: string[] = [];
  constructor(Option: NodeOption) {
    const { type, styles, children, element, className, isRoot = false } = Option;
    this.type = type;
    this._styles = styles;
    this.children = children;
    this.element = element;
    this.isRoot = isRoot;
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
