import { NodeService } from 'src/controller';
import HistoryService from 'src/controller/service/history';
import { isString } from 'src/controller/util';
import { AST } from '.';

export default class Page {
  public id: string;
  public name: string;
  public _page!: NodeService;
  public currentNode: NodeService[] = [];
  public history: HistoryService = new HistoryService();
  protected target: AST;
  constructor(id: string, target: AST) {
    this.name = this.id = id;
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
