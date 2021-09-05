import React from 'react';
import { EventType } from '.';
import DocEvent from './event';
import { NodeService } from '..';
import { getStylesProps } from '../util';
import { render } from 'src/controller/react';
import { COMPONENT } from 'src/model';

class Doc extends DocEvent {
  create = ({
    node,
    eventType,
  }: {
    node: NodeService;
    eventType?: EventType;
  }): React.ReactElement => {
    const { type, name, className, children, content, component } = node;

    const props =
      eventType === EventType.container
        ? {
            onDrop: this.onDrop(node),
            onDragOver: this.onDragover(node),
            onClick: this.onClick(node),
          }
        : eventType && this.createContainerEvent(node);

    node.element =
      type === COMPONENT
        ? component
          ? render(
              component,
              eventType === EventType.container
                ? { onClick: this.onClick(node) }
                : undefined,
            )
          : React.createElement('')
        : React.createElement(
            name,
            { style: getStylesProps(node), className: className, ...props },
            [
              content,
              ...children?.map(page =>
                this.create({
                  node: page,
                  eventType:
                    eventType === EventType.container ? eventType : undefined,
                }),
              ),
            ],
          );

    return node.element;
  };
}

export default Doc;
