import { isNull } from 'lodash';
import React from 'react';
import { DragEleId } from 'src/const';
import { isString } from 'src/controller/util';
import { NodeService } from '..';

class DocEvent {
  private static dragData: { [props: string]: NodeService } = {};

  onDrop = (node: NodeService) => (ev: React.DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    const id = ev.dataTransfer?.getData(DragEleId);
    if (id) {
      const nodeService: NodeService = Reflect.get(DocEvent.dragData, id);
      if (nodeService) {
        Reflect.deleteProperty(DocEvent.dragData, id);
        // up merge
        node.styles.push(...nodeService.styles);

        const children = isString(node.children)
          ? [node.children]
          : node.children || [];

        !isNull(children) &&
          children?.push(
            ...((isString(nodeService.children)
              ? [nodeService.children]
              : nodeService.children?.filter(_ => _)) || []),
          );

        if (!isNull(node.children)) {
          node.children = children;
        }
      }

      node.pageService?.update({ description: '添加元素' });
    }
  };

  onDragOver = (node: NodeService) => (ev: React.DragEvent) => {
    ev.preventDefault();
    if (ev.dataTransfer?.dropEffect) {
      ev.dataTransfer.dropEffect = 'move';
    }
  };

  onClick = (node: NodeService) => (ev: React.MouseEvent) => {
    try {
      ev.stopPropagation();
      // some node click return
      if (
        node.pageService?.currentNode.map(node => node.toString()).join(';') ===
        node.toString()
      ) {
        return;
      }

      if (node.type !== 'Component' && ev.currentTarget !== ev.target) {
        // component no click event
      }
      node.pageService?.setCurrentNode([node]);
    } catch (err) {
      console.error(`onClick Event Error ${err?.message}`);
    }
  };

  createContainerEvent = (node: NodeService) => {
    const id = `drag${Math.random()}`;
    return {
      id,
      draggable: true,
      onDragStart: (ev: React.DragEvent) => {
        // fix self drag
        Reflect.set(DocEvent.dragData, id, node.copy());
        ev.dataTransfer?.setData(DragEleId, id);
        if (ev.dataTransfer?.dropEffect) {
          ev.dataTransfer.dropEffect = 'move';
        }
      },
    };
  };
}

export default DocEvent;
