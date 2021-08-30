import { DragEleId } from 'src/const';
import { NodeService } from '..';

class DocEvent {
  private static dragData: { [props: string]: NodeService } = {};
  bindContainerEvent = (node: NodeService) => {
    if (node.element) {
      node.element.ondrop = (ev: DragEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
        const id = ev.dataTransfer?.getData(DragEleId);
        if (id) {
          const nodeService: NodeService = Reflect.get(DocEvent.dragData, id);
          if (nodeService) {
            Reflect.deleteProperty(DocEvent.dragData, id);
            // up merge
            node.styles.push(...nodeService.styles);
            node.children.push(...nodeService.children);
          }
          node.pageService?.update({ description: '添加元素' });
        }
      };
      node.element.ondragover = (ev: DragEvent) => {
        ev.preventDefault();
        if (ev.dataTransfer?.dropEffect) {
          ev.dataTransfer.dropEffect = 'move';
        }
      };
      node.element.onclick = (ev: MouseEvent) => {
        ev.stopPropagation();
        node.pageService?.setCurrentNode([node]);
      };
    }
    node.children.forEach(childrenNode => this.bindContainerEvent(childrenNode));
  };

  bindLayoutEvent = (node: NodeService) => {
    if (node.element) {
      const id = `drag${Math.random()}`;
      node.element.id = id;
      node.element.draggable = true;
      node.element.ondragstart = (ev: DragEvent) => {
        // fix self drag
        Reflect.set(DocEvent.dragData, id, node.copy());
        ev.dataTransfer?.setData(DragEleId, id);
        if (ev.dataTransfer?.dropEffect) {
          ev.dataTransfer.dropEffect = 'move';
        }
      };
    }
  };
}

export default DocEvent;
