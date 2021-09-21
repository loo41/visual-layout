import { PageService } from 'src/controller';
import Collapse from 'src/pages/components/Collapse';
import ClassName from './components/className';
import Content from './components/content';
import Component from './components/component';
import styles from './index.module.scss';

const BaseAttribute: React.FC<{ page: PageService }> = ({ page }) => {
  return (
    <Collapse
      header={
        <div className={styles.header}>
          <span>节点属性</span>
        </div>
      }
    >
      <Component page={page} />
      <ClassName page={page} />
      <Content page={page} />
    </Collapse>
  );
};

export default BaseAttribute;
