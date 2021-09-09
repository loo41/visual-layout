import { isObject } from 'src/util';
import { Page, AST, Style, JSONComponent } from 'src/model';
import { EventType } from '../browser';
import { NodeService } from '..';
import { Options } from '../const';
import { isString } from 'src/controller/util';

export interface Update {
  // eslint-disable-next-line
  ({}: { description?: string; isKeepHistory?: boolean }): void;
}

export default class PageService extends Page {
  public update: Update;
  public options: Options;
  public updateSign: boolean = false;
  constructor(options: Options) {
    super(options.id, options.page);
    this.options = options;
    this.id = options.id;
    this.name = options.name;
    this.update = this.bindUpdate(options.update);

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
        children: isString(target.children)
          ? target.children
          : target.children?.map(node => this.createNode(node)),
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

  setContent = (content: string) => {
    this.currentNode.map(node => node.setContent(content));
    this.update({ description: '添加内容' });
  };

  setComponent = (component: JSONComponent) => {
    this.currentNode.map(node => node.setComponent(component));
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
