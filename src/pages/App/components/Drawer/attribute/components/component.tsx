import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Input, Switch, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { PageService } from 'src/controller';
import { DEFAULT } from 'src/model/node';
import styles from '../index.module.scss';

const Component: React.FC<{ page: PageService }> = ({ page }) => {
  const [codeConfig, setCodeConfig] = useState(DEFAULT.codeConfig);
  const [name, setName] = useState(DEFAULT.codeConfig.componentName);

  useEffect(() => {
    if (page) {
      setCodeConfig(page.currentNode[0]?.codeConfig);
      setName(page.currentNode[0]?.codeConfig.componentName);
    }
    // eslint-disable-next-line
  }, [page?.currentNode, page?.currentNode[0]?.codeConfig]);

  const updateIsComponent = (value: boolean) => {
    if (value !== codeConfig.isComponent) {
      page.setCodeConfig({
        ...codeConfig,
        isComponent: value,
      });
    }
  };

  const updateComponentName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value !== codeConfig.componentName) {
      page.setCodeConfig({
        ...codeConfig,
        componentName: e.target.value,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div>
        组件
        <Tooltip placement="topLeft" title="生成独立代码文件">
          <ExclamationCircleOutlined style={{ marginLeft: 5 }} />
        </Tooltip>
      </div>
      <div className={styles.rightContainer}>
        <Switch
          checked={codeConfig?.isComponent}
          onChange={value => updateIsComponent(value)}
        />
        <Input
          placeholder="组件名"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={e => updateComponentName(e)}
        />
      </div>
    </div>
  );
};

export default Component;
