import React from 'react';
import { useContext } from 'react';
import { PagesContext } from 'src/context';

export type Component = {
  name: string;
  children?: Component[] | string;
  [props: string]: any;
};

export function Container({ component }: { component: Component }) {
  const { pagesService } = useContext(PagesContext);

  const components = pagesService.components;

  function render(component: Component): React.ReactNode {
    const { name, children, ...rest } = component;

    const Component = components.get(name.split('.')[0]);

    const C = /\./.test(name) ? (Component as any)?.[name.split('.')[1]] : Component;

    const props = Object.entries(rest).reduce(
      (
        props: {
          [props: string]: React.ReactNode;
        },
        [key, value],
      ) => {
        const isComponent = value && typeof value === 'object' && value?.name;

        props[key] = isComponent ? render(value) : value;
        return props;
      },
      {},
    );

    if (!C) {
      return new Error(`${name} component not found`);
    }

    // component? component: string
    return (
      <C {...props}>
        {typeof children === 'string'
          ? children
          : children?.map(child => render(child))}
      </C>
    );
  }

  return <>{render(component)}</>;
}

export function render(component?: Component) {
  console.log('component', component);
  return component ? <Container component={component} /> : <></>;
}
