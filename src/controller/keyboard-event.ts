import keyboard from 'keyboardjs';
import { NodeService, ProjectService } from '.';
import { isString } from 'src/controller/util';

export default class Keyboard {
  private copyNode: NodeService[] = [];
  constructor(public projectService: ProjectService) {
    this.bindKeyboardEvent();
  }
  bindKeyboardEvent = () => {
    keyboard.bind('ctrl + c', () => {
      console.log('Copy');
      this.copyNode = this.projectService.getCurrentPage().currentNode;
    });
    keyboard.bind('ctrl + v', () => {
      console.log('Paste');
      this.projectService.getCurrentPage().currentNode.forEach(node => {
        !isString(node.children) &&
          node.children?.push(...this.copyNode.map(node => node.copy({})));
      });
      this.projectService.getCurrentPage().update({ description: '复制元素' });
    });
    keyboard.bind('ctrl + backspace', () => {
      console.log('Delete');
      const currentNode = this.projectService.getCurrentPage().currentNode;
      if (currentNode.some(({ isRoot }) => isRoot)) {
        return;
      }
      currentNode.forEach(node => {
        node.isDelete = true;
      });
      this.projectService.getCurrentPage().update({ description: '删除元素' });
    });
    keyboard.bind('ctrl + z', () => {
      console.log('BackOff');
      this.projectService.getCurrentPage().backOffHistory();
    });
    keyboard.bind('ctrl + y', () => {
      console.log('Forward');
      this.projectService.getCurrentPage().forwardHistory();
    });
  };
}
