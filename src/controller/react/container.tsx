import React from 'react';
import { useContext } from 'react';
import { PagesContext } from 'src/context';
import { isFunction } from 'src/controller/util';

export type Component = {
  _name: string;
  children?: Component[] | string;
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
  component: Component;
  args?: T;
}) {
  const { pagesService } = useContext(PagesContext);

  const components = pagesService.components;

  function render<T extends Args>(component: Component, args?: T): React.ReactNode {
    const { children, ...rest } = component;

    const name = component._name;

    const Component = components.get(name.split('.')[0]);

    // support HTML label
    const C = /^[A-Z]/.test(name)
      ? /\./.test(name) // support two level component
        ? (Component as any)?.[name.split('.')[1]]
        : Component
      : name;

    const props = Object.entries(rest).reduce(
      (props: { [props: string]: unknown }, [key, value]) => {
        const isComponent =
          value && typeof value === 'object' && (value as Component)?._name;

        props[key] = isComponent ? render(value as Component) : value;
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
      console.error(`${name} component not found`);
      return <></>;
    }

    // component? component: string
    return (
      <C {...props} onClickCapture={onClickCapture}>
        {typeof children === 'string'
          ? children
          : children?.map(child => render(child))}
      </C>
    );
  }

  return <>{render(component, args)}</>;
}

export function render<T extends Args>(component: Component, args?: T) {
  return component ? <Container component={component} args={args} /> : <></>;
}
