import { Radio, Switch } from 'antd';
import { CodeConfig } from '.';
import styles from './index.module.scss';
import { templateType } from './util';

const Config: React.FC<{
  setCodeConfig: (codeConfig: CodeConfig) => void;
  codeConfig: CodeConfig;
}> = ({ setCodeConfig, codeConfig }) => {
  return (
    <div className={styles.warper}>
      <div className={styles.mainTitle} style={{ marginTop: 40 }}>
        <h3>React 配置</h3>
      </div>
      <div className={styles.body}>
        <div className={styles.item}>
          <div className={styles.title}>组件形式 </div>
          <div className={styles.content}>
            <Radio.Group
              value={codeConfig.component}
              onChange={e => {
                setCodeConfig({
                  ...codeConfig,
                  component: e.target.value,
                });
              }}
            >
              <Radio value={templateType.classComponent}>类组件</Radio>
              <Radio value={templateType.functionComponent}>函数组件</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>文件后缀 </div>
          <div className={styles.content}>
            <Radio.Group
              value={codeConfig.fileSuffix}
              onChange={e => {
                setCodeConfig({
                  ...codeConfig,
                  fileSuffix: e.target.value,
                });
              }}
            >
              <Radio value="tsx">.tsx</Radio>
              <Radio value="jsx">.jsx</Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
      <div className={styles.mainTitle} style={{ marginTop: 40 }}>
        <h3>样式配置</h3>
      </div>
      <div className={styles.body}>
        <div className={styles.item}>
          <div className={styles.title}>CSS文件后缀 </div>
          <div className={styles.content}>
            <Radio.Group
              value={codeConfig.cssFileSuffix}
              onChange={e => {
                setCodeConfig({
                  ...codeConfig,
                  cssFileSuffix: e.target.value,
                });
              }}
            >
              <Radio value="css">.css</Radio>
              <Radio value="less">.less</Radio>
              <Radio value="scss">.scss</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>CSS-Module </div>
          <div className={styles.content}>
            <Switch
              checked={codeConfig.cssModule}
              onChange={value => {
                setCodeConfig({
                  ...codeConfig,
                  cssModule: value,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Config;
