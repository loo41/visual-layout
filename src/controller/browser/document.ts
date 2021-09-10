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

    const props =
      eventType === EventType.container
        ? {
            onDrop: this.onDrop(node),
            onDragOver: this.onDragover(node),
            onClick: this.onClick(node),
          }
        : eventType && this.createContainerEvent(node);

    const getStyles = () => {
      const { styles, isSelect } = node;

      const previewStyle =
        node.pageService?.options.previewStyle.filter(
          ({ isCanUse }) => !eventType || eventType === EventType.layout || isCanUse,
        ) || [];

      return previewStyle
        .concat(isSelect ? node.pageService?.options.selectStyle || [] : [])
        .concat(styles)
        .reduce((styles: { [props: string]: string }, style) => {
          const { key, value } = style;
          styles[strikeToCamel(key)] = value;
          return styles;
        }, {});
    };

    node.element =
      type === 'Component'
        ? render(
            node,
            eventType === EventType.container
              ? { onClick: this.onClick(node) }
              : undefined,
          )
        : React.createElement(
            node._name,
            {
              style: getStyles(),
              className: className,
              ...props,
            },

            isString(children)
              ? children
              : children
                  ?.map(child =>
                    isString(child)
                      ? child
                      : child
                      ? this.create({
                          node: child,
                          eventType:
                            eventType === EventType.container
                              ? eventType
                              : undefined,
                        })
                      : null,
                  )
                  .filter(_ => _),
          );

    return node.element;
  };
}

export default Doc;
