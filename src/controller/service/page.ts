import { isObject } from 'src/util';
import { Page, AST, Style, Node } from 'src/model';
import { DocEvent, Doc } from '../browser';
import { NodeService } from '..';
import { Options } from '../const';

export interface Update {
  ({}: { description?: string; isKeepHistory?: boolean }): void;
}

export default class PageService extends Page {
  public update: Update;
  public Doc: Doc;
  public DocEvent: DocEvent;
  public options: Options;
  public updateSign: boolean = false;
  constructor(options: Options) {
    super(options.id, options.page);
    this.options = options;
    this.id = options.id;
    this.name = options.name;
    this.update = this.bindUpdate(options.update);
    this.Doc = new Doc();
    this.DocEvent = new DocEvent();

    this.setPage(this.createNode(options.page, true));
  }

  setOptions(options: Partial<Options>) {
    this.options = {
      ...this.options,
      ...options,
    };
    this.update({ isKeepHistory: false });
  }

  createNode = (target: AST, isRoot?: boolean): NodeService => {
    return new NodeService(
      {
        ...target,
        isRoot,
        children: target.children.map(node => this.createNode(node)),
      },
      this,
    );
  };

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

  proxy = (targe: AST): AST => {
    const getHandler = <T extends object>() => {
      return {
        get(target: T, propertyKey: string | symbol, receiver: ProxyConstructor) {
          const targetValue = Reflect.get(target, propertyKey, receiver);
          if (Array.isArray(targetValue) || isObject(targetValue)) {
            return setProxy<object>(targetValue);
          }
          return targetValue;
        },
        set<U>(
          target: T,
          propertyKey: string,
          value: U,
          receiver: ProxyConstructor,
        ) {
          return Reflect.set(target, propertyKey, value, receiver);
        },
      };
    };

    const setProxy = <T extends object>(targe: T): T => {
      return new Proxy(targe, getHandler());
    };

    return setProxy<AST>(targe);
  };

  setStyles = (styles: Style[]) => {
    this.currentNode.map(node => node.setStyles(styles));
    this.update({ description: '更新样式' });
  };

  createView = () => {
    const view = this.Doc.create(this.page);
    this.DocEvent.bindContainerEvent(this.page);

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
      this.page = this.createNode(this.target, true);
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
      this.page = this.createNode(this.target, true);
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
}
