import { Tabs } from 'antd';
import { useContext } from 'react';
import { PagesContext } from 'src/context';
import Css from './Css';
import styles from './index.module.scss';
import Style from './Style';

const { TabPane } = Tabs;

const Drawer: React.FC<{}> = () => {
  const { pagesService } = useContext(PagesContext);

  const page = pagesService.getCurrentPage();

  const isShow = !!page?.currentNode.length;

  return (
    <div
      className={styles.drawer}
      style={{ display: `${isShow ? 'flex' : 'none'}` }}
    >
      <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
        <TabPane tab="样式" key="style">
          <Style page={page} />
        </TabPane>
        <TabPane tab="CSS" key="css">
          <Css page={page} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Drawer;
