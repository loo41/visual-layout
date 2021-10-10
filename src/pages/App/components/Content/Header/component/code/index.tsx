import { CodeOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Drawer, Tooltip } from 'antd';
import { ProjectService } from 'src/controller';
import Visible from 'src/pages/components/Visible';
import BaseInfo from './base-info';
import Config from './config';
import CodeEdit from './code-edit';
import styles from './index.module.scss';
import { useState } from 'react';
import { exportCode, templateType } from './util';

export interface CodeConfig {
  cssLocation: 'inner' | 'link';
  page: string;
  fileSuffix: 'jsx' | 'tsx';
  component: templateType;
  cssFileSuffix: 'css' | 'less' | 'scss';
  cssModule: boolean;
}

const Code: React.FC<{ project: ProjectService }> = ({ project }) => {
  const [codeConfig, setCodeConfig] = useState<CodeConfig>({
    cssLocation: 'link',
    page: Object.values(project.getPages())[0].id,
    fileSuffix: 'jsx',
    component: templateType.functionComponent,
    cssFileSuffix: 'css',
    cssModule: true,
  });

  return (
    <Visible>
      {({ visible, setVisible }) => (
        <>
          <Drawer
            title="代码"
            placement="right"
            width={'calc(100% - 420px)'}
            onClose={() => setVisible(false)}
            visible={visible}
            destroyOnClose
          >
            <div className={styles.container}>
              <div className={styles.leftContainer}>
                <div className={styles.download}>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                    onClick={() => exportCode(project, codeConfig)}
                  >
                    导出
                  </Button>
                </div>
                <BaseInfo project={project} />
                <Config setCodeConfig={setCodeConfig} codeConfig={codeConfig} />
              </div>
              <div className={styles.rightContainer}>
                <CodeEdit project={project} codeConfig={codeConfig} />
              </div>
            </div>
          </Drawer>
          <Tooltip placement="top" title="代码">
            <CodeOutlined
              style={{ fontSize: 20 }}
              onClick={() => setVisible(true)}
            />
          </Tooltip>
        </>
      )}
    </Visible>
  );
};

export default Code;
