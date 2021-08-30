import _ from 'lodash';
import { NodeService } from 'src/controller';
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
  public id?: number;
  private static random = 1;
  constructor(Option: NodeOption) {
    const { type, styles, children, element, isRoot = false } = Option;
    this.type = type;
    this._styles = styles;
    this.children = children;
    this.element = element;
    this.isRoot = isRoot;
    this.id = Node.Random();
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
