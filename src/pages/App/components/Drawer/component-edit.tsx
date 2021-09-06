import { PageService } from 'src/controller';
import MonacoEditor from 'react-monaco-editor';
import { Component } from 'src/controller/react/container';
import { useRef } from 'react';
import { Alert } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { formatTime } from 'src/util';

const ComponentEdit: React.FC<{ page: PageService }> = ({ page }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const timer = useRef<number>();
  const messageTimer = useRef<number>();

  const component = page?.currentNode[0]?.component || {};

  const value = JSON.stringify(component, null, 2) || '';

  useEffect(() => {
    messageTimer.current = window.setTimeout(() => {
      if (errorMessage) {
        setErrorMessage('');
      }
    }, 2000);
  }, [errorMessage]);

  const updateComponent = (code: string) => {
    clear();
    timer.current = window.setTimeout(() => {
      if (isTrueComponent(code)) {
        const component = JSON.parse(code);
        page?.setComponent(component);
      }
    }, 2000);

    return () => clear();
  };

  const clear = () => {
    window.clearTimeout(timer.current);
    window.clearTimeout(messageTimer.current);
    timer.current = undefined;
  };

  const isTrueComponent = (code: string) => {
    try {
      const component: Component = JSON.parse(code);

      const isComponent = (component: Component): boolean => {
        if (
          (component._name || component._name === '') &&
          ((component.children && typeof component.children === 'string'
            ? true
            : Array.isArray(component.children)
            ? component.children.every(child => isComponent(child))
            : false) ||
            !component?.children)
        ) {
          setErrorMessage('');
          return true;
        } else {
          setErrorMessage(
            `【${formatTime().split(' ')?.[1]}】component validation failed`,
          );
          return false;
        }
      };

      return isComponent(component);
    } catch (err) {
      console.error(err?.message);
      setErrorMessage(err?.message);
      return false;
    }
  };

  return (
    <>
      {!!errorMessage.length && (
        <Alert
          message={errorMessage}
          style={{ marginBottom: 10 }}
          closable
          type="error"
        />
      )}
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
    </>
  );
};

export default ComponentEdit;
