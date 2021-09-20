import { Page, AST, Style, JSONComponent, PageObject, ASTObject } from 'src/model';
import { EventType } from '../browser';
import { HistoryService, NodeService, Options } from '..';
import { isString } from 'src/controller/util';

export interface Update {
  // eslint-disable-next-line
  ({}: { description?: string; isKeepHistory?: boolean }): void;
}

export default class PageService extends Page {
  public update: Update;
  public options: Options;
  public history: HistoryService;
  public updateSign: boolean = false;
  constructor(options: Required<Options> & Partial<PageObject>) {
    super(options);
    const { id, name, history } = options;
    this.options = options;
    this.id = id;
    this.name = name;
    this.update = this.bindUpdate(options.update);
    this.history = new HistoryService(history ? history : {}, this);

    this.setPage(this.newNode(options.page || options.target, true));
  }

  setOptions(options: Partial<Options>) {
    this.options = {
      ...this.options,
      ...options,
    };
    this.update({ isKeepHistory: false });
  }

  getIdx = () => {
    return this.idx;
  };

  bindUpdate = (update: () => void): Update => {
    return ({ description, isKeepHistory = true }) => {
      if (isKeepHistory) {
        this.history.keep({
          node: this.page.copy({ isCopyID: true }),
          description,
        });
      }
      this.updateSign = !this.updateSign;
      update();
    };
  };

  setCurrentNode = (nodes: NodeService[]) => {
    this.page.clearEffect();

    this.currentNode = nodes.map(node => {
      node.isSelect = true;
      return node;
    });

    this.update({ isKeepHistory: false });
  };

  setStyles = (styles: Style[]) => {
    this.currentNode.map(node => node.setStyles(styles));
    this.update({ description: '更新样式' });
  };

  setContent = (content: string) => {
    this.currentNode.map(node => node.setContent(content));
    this.update({ description: '添加内容' });
  };

  setComponent = (component: JSONComponent) => {
    this.currentNode.map(node => node.setComponent(component, this));
    this.update({ description: '更新组件' });
  };

  setClassName = (className: string) => {
    this.currentNode.map(node => node.setClassName(className));
    this.update({ description: '设置Class' });
  };

  createView = () => {
    const view = this.page.createElement({ eventType: EventType.container });
    return view;
  };

  toString() {
    return this.page.toString();
  }

  backOffHistory() {
    this.history.backOff();
    const history = this.history.current();
    if (history) {
      history.node.clearEffect();
      this.page = history.node.copy({ isCopyID: true });
    } else {
      // backOff first history
      this.page = this.newNode(this.target, true);
    }
    this.update({ isKeepHistory: false });
  }

  forwardHistory() {
    this.history.forward();
    this.setHistoryPage();
    this.update({ isKeepHistory: false });
  }

  returnHistory(_id: number) {
    this.history.return(_id);
    const history = this.history.current();
    if (history) {
      history.node.clearEffect();
      this.page = history.node.copy({ isCopyID: true });
    } else {
      // backOff first history
      this.page = this.newNode(this.target, true);
    }
    this.update({ isKeepHistory: false });
  }

  recoveryHistory(_id: number) {
    this.history.recovery(_id);
    this.setHistoryPage();
    this.update({ isKeepHistory: false });
  }

  setHistoryPage = () => {
    const history = this.history.current();
    if (history) {
      history.node.clearEffect();
      this.page = history.node.copy({ isCopyID: true });
    }
  };

  toObject = (): PageObject => {
    return {
      id: this.id,
      idx: this.idx,
      name: this.name,
      currentNode: [],
      page: this.page.toObject(),
      history: this.history.toObject(),
      target: this.ASTtoObject(this.target),
    };
  };

  ASTtoObject = (target: AST): ASTObject => {
    return {
      ...target,
      children: isString(target.children)
        ? target.children
        : target.children?.map(child =>
            isString(child) ? child : this.ASTtoObject(child),
          ),
    };
  };

  newNode = (target: AST, isRoot?: boolean): NodeService => {
    return new NodeService(
      {
        ...target,
        isRoot,
        id: this.idx,
        children: isString(target.children)
          ? target.children
          : target.children?.map(node =>
              isString(node) ? node : this.newNode(node),
            ),
      },
      {
        options: this.options,
        currentNode: this.currentNode,
        setCurrentNode: this.setCurrentNode,
        getIdx: this.getIdx,
        update: this.update,
      },
    );
  };
}
