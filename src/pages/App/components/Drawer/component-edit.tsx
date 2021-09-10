import { PageService } from 'src/controller';
import MonacoEditor from 'react-monaco-editor';
import { useRef } from 'react';
import { Alert } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { formatTime } from 'src/util';
import { JSONComponent } from 'src/model';
import { isString } from 'lodash';

const ComponentEdit: React.FC<{ page: PageService }> = ({ page }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const timer = useRef<number>();
  const messageTimer = useRef<number>();

  const component = page?.currentNode[0]?.getComponentConfig();

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
      const component: JSONComponent = JSON.parse(code);

      const isComponent = (component: JSONComponent): boolean => {
        const isTrueChildren =
          (component.children && typeof component.children === 'string'
            ? true
            : Array.isArray(component.children)
            ? component.children.every(
                child => isString(child) || isComponent(child),
              )
            : false) || !component?.children;

        if (
          component._name &&
          isTrueChildren &&
          ['Element', 'Component'].includes(component._type)
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
