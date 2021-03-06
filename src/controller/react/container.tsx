import { isFunction, isString } from 'lodash';
import React from 'react';
import { NodeService } from '..';
import AppService from '../service/app';
import { isElement } from 'src/controller/util';

export type Event<T> = (node: NodeService) => (ev: T) => void;
export interface Rest {
  onClick: Event<React.MouseEvent<Element, MouseEvent>>;
  onDrop: Event<React.DragEvent<Element>>;
  onDragOver: Event<React.DragEvent<Element>>;
}

export function Container({ component, ...props }: Props) {
  const components = AppService.components;

  const { create, getStyles } = props;

  function render(node: NodeService, args?: Rest): React.ReactNode {
    const { _name, type, children, hasCanChild, id } = node;

    if (type === 'Element') {
      return create(node);
    }

    const Component = components.get(_name.split('.')[0]);

    // support HTML label
    const C = /^[A-Z]/.test(_name)
      ? /\./.test(_name) // support two level component
        ? (Component?.to as any)?.[_name.split('.')[1]]
        : Component?.to
      : _name;

    const props = Object.entries(node.props || {}).reduce(
      (props: { [props: string]: unknown }, [key, value]) => {
        const isComponent = isElement(value);

        props[key] = isComponent ? render(value as NodeService, args) : value;
        return props;
      },
      {},
    );

    if (!C) {
      console.error(`${_name} component not found`);
      return <></>;
    }

    // proxy onClick event
    const onClick = (ev: React.MouseEvent<HTMLElement>) => {
      if (props?.onClick && isFunction(props?.onClick)) {
        (props.onClick as any)?.(ev);
      }
      if (args?.onClick) {
        args.onClick?.(node)?.(ev);
      }
    };

    // element children null error
    const childrenElement =
      typeof children === 'string'
        ? children
        : children?.map(child => (isString(child) ? child : render(child, args)));

    // component? component: string
    return (
      <C
        key={id}
        {...props}
        {...(hasCanChild
          ? {
              ...args,
              onDragOver: (e: React.DragEvent<Element>) => {
                args?.onDragOver(node)?.(e);
              },
              onDrop: (e: React.DragEvent<Element>) => {
                args?.onDrop(node)?.(e);
              },
              style: getStyles(node),
            }
          : {})}
        onClick={onClick}
      >
        {childrenElement}
      </C>
    );
  }

  return <>{render(component, props?.props)}</>;
}

export interface Props {
  component: NodeService;
  props?: Rest;
  create: (node: NodeService) => React.ReactElement;
  getStyles: (node: NodeService) => { [props: string]: string };
}

export function render({ component, ...rest }: Props) {
  try {
    return component ? <Container component={component} {...rest} /> : <></>;
  } catch (err) {
    console.error(`?????????????????????????????????????????????????????????${err.message}`);
    return <></>;
  }
}
