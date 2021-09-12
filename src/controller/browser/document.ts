import React from 'react';
import { EventType } from '.';
import DocEvent from './event';
import { NodeService } from '..';
import { strikeToCamel } from '../util';
import { render } from 'src/controller/react';
import { isString } from 'src/controller/util';

class Doc extends DocEvent {
  create = ({
    node,
    eventType,
  }: {
    node: NodeService;
    eventType?: EventType;
  }): React.ReactElement => {
    const { type, className, children } = node;

    const iscContainer = eventType === EventType.container;

    const props = iscContainer
      ? {
          onDrop: this.onDrop(node),
          onDragOver: this.onDragOver(node),
          onClick: this.onClick(node),
        }
      : eventType && this.createContainerEvent(node);

    const getStyles = (node: NodeService) => {
      const { styles, isSelect } = node;

      const previewStyle =
        NodeService.pageService?.options.previewStyle.filter(
          ({ isCanUse }) => !eventType || !iscContainer || isCanUse,
        ) || [];
      return previewStyle
        .concat(isSelect ? NodeService.pageService?.options.selectStyle || [] : [])
        .concat(styles)
        .reduce((styles: { [props: string]: string }, style) => {
          const { key, value } = style;
          styles[strikeToCamel(key)] = value;
          return styles;
        }, {});
    };

    const getChildren = () => {
      return isString(children)
        ? children
        : children
            ?.map(child => {
              if (child) {
                return isString(child)
                  ? child
                  : this.create({
                      node: child,
                      eventType: iscContainer ? eventType : undefined,
                    });
              }
              return undefined;
            })
            .filter(_ => _);
    };

    node.element =
      type === 'Component'
        ? render({
            component: node,
            props: {
              onClick: this.onClick,
              onDrop: this.onDrop,
              onDragOver: this.onDragOver,
            },
            create: (node: NodeService) => {
              return this.create({ node, eventType });
            },
            getStyles,
          })
        : React.createElement(
            node._name,
            {
              style: getStyles(node),
              className: className,
              ...props,
            },
            getChildren(),
          );

    return node.element;
  };
}

export default Doc;
