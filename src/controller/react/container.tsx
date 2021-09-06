import React from 'react';
import { useContext } from 'react';
import { PagesContext } from 'src/context';
import { isFunction } from 'src/controller/util';
import { Pages } from 'src/model';

export type Component = {
  [Pages.COMPONENT_NAME]: string;
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

    const name = component[Pages.COMPONENT_NAME];

    const Component = components.get(name.split('.')[0]);

    // support two level component
    const C = /\./.test(name) ? (Component as any)?.[name.split('.')[1]] : Component;

    const props = Object.entries(rest).reduce(
      (props: { [props: string]: unknown }, [key, value]) => {
        const isComponent =
          value && typeof value === 'object' && (value as Component)?.name;

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
      return new Error(`${name} component not found`);
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
