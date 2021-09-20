import { Page, AST, Style, JSONComponent, PageObject, ASTObject } from 'src/model';
import { EventType } from '../browser';
import { NodeService, Options } from '..';
import { isString } from 'src/controller/util';

export interface Update {
  // eslint-disable-next-line
  ({}: { description?: string; isKeepHistory?: boolean }): void;
}

export default class PageService extends Page {
  public update: Update;
  public options: Options;
  public updateSign: boolean = false;
  constructor(options: Required<Options> & Partial<PageObject>) {
    super(options);
    this.options = options;
    this.id = options.id;
    this.name = options.name;
    this.update = this.bindUpdate(options.update);
    NodeService.pageService = this;

    this.setPage(this.newNode(options.page || options.target, true));
  }

  setOptions(options: Partial<Options>) {
    this.options = {
      ...this.options,
      ...options,
    };
    this.update({ isKeepHistory: false });
  }

  bindUpdate = (update: () => void): Update => {
    return ({ description, isKeepHistory = true }) => {
      if (isKeepHistory) {
        this.history.keep({
          node: this.page.copy(),
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
      this.page = history.node.copy();
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
      this.page = history.node.copy();
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
      this.page = history.node.copy();
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
}
