import { isString } from 'lodash';
import React from 'react';
import { useContext } from 'react';
import { PagesContext } from 'src/context';
import { isFunction } from 'src/controller/util';
import { AST } from 'src/model';

export type Component = {
  [props: string]: unknown;
};

export type Click = (ev: React.MouseEvent<HTMLElement>) => void;

export interface Args {
  onClick: Click;
}

export function Container<T extends Args>({
  component,
  args,
}: {
  component: AST;
  args?: T;
}) {
  const { pagesService } = useContext(PagesContext);

  const components = pagesService.components;

  function render<T extends Args>(component: AST, args?: T): React.ReactNode {
    const { _name, children, ...rest } = component;

    const Component = components.get(_name.split('.')[0]);

    // support HTML label
    const C = /^[A-Z]/.test(_name)
      ? /\./.test(_name) // support two level component
        ? (Component as any)?.[_name.split('.')[1]]
        : Component
      : _name;

    const props = Object.entries(rest.component || {}).reduce(
      (props: { [props: string]: unknown }, [key, value]) => {
        const isComponent =
          value && typeof value === 'object' && (value as AST)?._name;

        props[key] = isComponent ? render(value as AST) : value;
        return props;
      },
      {},
    );

    // proxy onClick event
    const onClickCapture = (ev: React.MouseEvent<HTMLElement>) => {
      if (props?.onClickCapture && isFunction(props?.onClickCapture)) {
        (props.onClickCapture as Click)?.(ev);
      }
      if (args?.onClick) {
        args.onClick?.(ev);
      }
    };

    if (!C) {
      console.error(`${_name} component not found`);
      return <></>;
    }

    // element no children error

    const childrenElement =
      typeof children === 'string'
        ? children
        : children?.map(child => (isString(child) ? child : render(child)));

    // component? component: string
    return (
      <C {...props} onClickCapture={onClickCapture}>
        {childrenElement}
      </C>
    );
  }

  return <>{render(component, args)}</>;
}

export function render<T extends Args>(component: AST, args?: T) {
  try {
    return component ? <Container component={component} args={args} /> : <></>;
  } catch (err) {
    console.error(`组件渲染错误，请检查相关属性是否正确。${err.message}`);
    return <></>;
  }
}
