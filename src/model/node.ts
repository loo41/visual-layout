import _ from 'lodash';
import { NodeService } from 'src/controller';
import { Children, NodeOption, Props, Style } from './index';
import Doc from 'src/controller/browser/document';
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
  public props?: Props;
  public id: number;
  public static random: number = 1;
  constructor(Option: NodeOption) {
    super();
    const {
      type,
      styles,
      children,
      _name,
      element,
      className,
      props,
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
    this.props = props;
    this.id = id;
    this.hasCanChild = hasCanChild;
    this.className = className;
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
