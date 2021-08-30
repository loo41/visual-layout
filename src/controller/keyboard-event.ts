import keyboard from 'keyboardjs';
import { NodeService, PagesService } from '.';

export default class Keyboard {
  private copyNode: NodeService[] = [];
  constructor(public pagesService: PagesService) {
    this.bindKeyboardEvent();
  }
  bindKeyboardEvent = () => {
    keyboard.bind('ctrl + c', () => {
      console.log('Copy');
      this.copyNode = this.pagesService.getCurrentPage().currentNode;
    });
    keyboard.bind('ctrl + v', () => {
      console.log('Paste');
      this.pagesService.getCurrentPage().currentNode.forEach(node => {
        node.children.push(...this.copyNode.map(node => node.copy()));
      });
      this.pagesService.getCurrentPage().update({ description: '复制元素' });
    });
    keyboard.bind('ctrl + backspace', e => {
      console.log(e);
      console.log('Delete');
      const currentNode = this.pagesService.getCurrentPage().currentNode;
      if (currentNode.some(({ isRoot }) => isRoot)) {
        return;
      }
      currentNode.forEach(node => {
        node.isDelete = true;
      });
      this.pagesService.getCurrentPage().update({ description: '删除元素' });
    });
    keyboard.bind('ctrl + z', () => {
      console.log('BackOff');
      this.pagesService.getCurrentPage().backOffHistory();
    });
    keyboard.bind('ctrl + y', () => {
      console.log('Forward');
      this.pagesService.getCurrentPage().forwardHistory();
    });
  };
}
