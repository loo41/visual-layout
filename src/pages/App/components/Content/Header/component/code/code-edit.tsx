import { Select, Tabs } from 'antd';
import { useMemo } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { ProjectService } from 'src/controller';
import { CodeConfig } from '.';
import styles from './index.module.scss';
import { generateCodeFiles } from './util';
import { useState } from 'react';

const { TabPane } = Tabs;

const CodeEdit: React.FC<{ project: ProjectService; codeConfig: CodeConfig }> = ({
  project,
  codeConfig,
}) => {
  const [page, setPage] = useState(project.getCurrentPage());

  const options = Object.values(project.getPages()).map(page => ({
    key: page.id,
    value: page.name,
    page,
  }));

  const tabPanes = useMemo(() => {
    const files = generateCodeFiles(page, codeConfig);

    return files
      .slice(1)
      .concat(files.slice(0, 1))
      .map(([key, { code, name, suffix, language }]) => {
        return (
          <TabPane tab={`${name}.${suffix}`} key={key} style={{ height: '100%' }}>
            <MonacoEditor
              height="100%"
              theme="vs-dark"
              value={code}
              options={{
                language: language,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                formatOnType: true,
                formatOnPaste: true,
              }}
            />
          </TabPane>
        );
      });
  }, [codeConfig, page]);

  return (
    <div className={styles.codeContainer}>
      <div className={styles.titleWarper}>
        <div>当前页面</div>
        <div>
          <Select
            options={options}
            style={{ width: 100, marginLeft: 20 }}
            defaultValue={page.name}
            onChange={optionValue => {
              const page = options.find(({ value }) => value === optionValue)?.page;
              if (page) {
                setPage(page);
              }
            }}
          />
        </div>
      </div>

      <Tabs onChange={() => {}} style={{ height: '100%' }}>
        {tabPanes}
      </Tabs>
    </div>
  );
};

export default CodeEdit;
