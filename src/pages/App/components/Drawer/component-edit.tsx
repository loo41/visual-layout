import { PageService } from 'src/controller';
import MonacoEditor from 'react-monaco-editor';
import { Component } from 'src/controller/react/container';
import { useRef } from 'react';

const ComponentEdit: React.FC<{ page: PageService }> = ({ page }) => {
  const timer = useRef<number>();
  const value = JSON.stringify(page?.currentNode[0]?.component, null, 2) || '';

  const updateComponent = (code: string) => {
    clear();
    timer.current = window.setTimeout(() => {
      debugger;
      if (isTrueComponent(code)) {
        page?.setComponent(JSON.parse(code));
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
      height="88vh"
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
