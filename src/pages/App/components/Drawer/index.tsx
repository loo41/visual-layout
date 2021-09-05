import { Tabs } from 'antd';
import { useContext } from 'react';
import { PagesContext } from 'src/context';
import Css from './css';
import styles from './index.module.scss';
import ComponentEdit from './component-edit';
import { COMPONENT } from 'src/model';
import Attribute from './attribute';

const { TabPane } = Tabs;

const Drawer: React.FC<{}> = () => {
  const { pagesService } = useContext(PagesContext);

  const page = pagesService.getCurrentPage();

  const isComponentDisable = page?.currentNode[0]?.type !== COMPONENT;
  const isShow = page?.currentNode.length;

  return (
    <div className={styles.drawer} style={{ display: isShow ? 'block' : 'none' }}>
      <Tabs style={{ width: '100%' }}>
        {isComponentDisable && (
          <>
            <TabPane tab="属性" key="style">
              <Attribute page={page} />
            </TabPane>
            <TabPane tab="CSS" key="css">
              <Css page={page} />
            </TabPane>
          </>
        )}
        {!isComponentDisable && (
          <TabPane tab="组件" key="component">
            <ComponentEdit page={page} />
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default Drawer;
