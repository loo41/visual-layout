import { PageService } from 'src/controller';
import MonacoEditor from 'react-monaco-editor';
import { Component } from 'src/controller/react/container';
import { useRef } from 'react';
import { injectionName, recoverySymbol } from 'src/util';

export type JSONComponent = Omit<Component, 'children'> & {
  name: string;
  children?: JSONComponent[] | string;
};

const ComponentEdit: React.FC<{ page: PageService }> = ({ page }) => {
  const timer = useRef<number>();

  const component: JSONComponent | {} =
    (page?.currentNode[0]?.component &&
      injectionName(page?.currentNode[0]?.component)) ||
    {};

  const value = JSON.stringify(component, null, 2) || '';

  const updateComponent = (code: string) => {
    clear();
    timer.current = window.setTimeout(() => {
      if (isTrueComponent(code)) {
        const component = JSON.parse(code);
        page?.setComponent(recoverySymbol(component));
      }
    }, 3000);

    return () => clear();
  };

  const clear = () => {
    window.clearTimeout(timer.current);
    timer.current = undefined;
  };

  const isTrueComponent = (code: string) => {
    try {
      const component: Component = JSON.parse(code);

      const isComponent = (component: Component): boolean => {
        return !!(
          (component.name || component.name === '') &&
          ((component.children && typeof component.children === 'string'
            ? true
            : Array.isArray(component.children)
            ? component.children.every(child => isComponent(child))
            : false) ||
            !component?.children)
        );
      };

      return isComponent(component);
    } catch (err) {
      console.error(err?.message);
      return false;
    }
  };

  return (
    <MonacoEditor
      height="100%"
      language="javascript"
      theme="vs"
      value={value}
      options={{
        language: 'json',
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      onChange={code => updateComponent(code)}
    />
  );
};

export default ComponentEdit;
