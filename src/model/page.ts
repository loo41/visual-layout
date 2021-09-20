import { NodeService, Options } from 'src/controller';
import HistoryService from 'src/controller/service/history';
import { isString } from 'src/controller/util';
import { AST, PageObject } from '.';

export default class Page {
  public id: string;
  public name: string;
  public _page!: NodeService;
  public currentNode: NodeService[] = [];
  public history: HistoryService;
  protected _idx: number = 1;
  protected target: AST;
  constructor(options: Required<Options> & Partial<PageObject>) {
    const { id, name, target, history, idx } = options;
    this.id = id;
    this.idx = idx || 1;
    this.name = name;
    this.target = target;
    this.history = new HistoryService(history ? history : {}, this);
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

  newNode = (target: AST, isRoot?: boolean): NodeService => {
    return new NodeService({
      ...target,
      isRoot,
      id: this.idx,
      children: isString(target.children)
        ? target.children
        : target.children?.map(node => (isString(node) ? node : this.newNode(node))),
    });
  };
}
