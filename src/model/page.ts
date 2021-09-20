import { NodeService, Options } from 'src/controller';
import { isString } from 'src/controller/util';
import { AST, PageObject } from '.';

export default class Page {
  public id: string;
  public name: string;
  public _page!: NodeService;
  public currentNode: NodeService[] = [];
  protected _idx: number = 1;
  protected target: AST;
  constructor(options: Required<Options> & Partial<PageObject>) {
    const { id, name, target, idx } = options;
    this.id = id;
    this.idx = idx || 1;
    this.name = name;
    this.target = target;
  }
  setPage(target: NodeService) {
    this._page = target;
  }
  set page(page: NodeService) {
    this._page = page;
    this.clearDeleteNode(this._page);
    // clear select node
    this.currentNode = [];
  }
  get page() {
    this.clearDeleteNode(this._page);
    return this._page;
  }

  get idx() {
    return this._idx++;
  }

  set idx(idx: number) {
    this._idx = idx;
  }

  clearDeleteNode = (node: NodeService): NodeService | null => {
    if (node.isDelete) {
      if (node.isRoot) {
        node.children = [];
      }
      return null;
    } else {
      node.children = isString(node.children)
        ? node.children
        : (node.children
            ?.map(node => (isString(node) ? node : this.clearDeleteNode(node)))
            .filter(_ => _) as NodeService[]);
      return node;
    }
  };
}
