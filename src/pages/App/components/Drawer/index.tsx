import { InputNumber, Tabs, Tooltip } from 'antd';
import { useContext } from 'react';
import { PagesContext } from 'src/context';
import CssEdit from './css-edit';
import styles from './index.module.scss';
import ComponentEdit from './component-edit';
import Attribute from './attribute';
import { ColumnWidthOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';

const { TabPane } = Tabs;

const DrawerWidth = 'drawer-width';

const Drawer: React.FC<{}> = () => {
  const [width, setWidth] = useState(300);
  const { pagesService } = useContext(PagesContext);

  const page = pagesService.getCurrentPage();

  const isComponentDisable = page?.currentNode[0]?.type !== 'Component';
  const isShow = page?.currentNode.length;

  useEffect(() => {
    setWidth(Number(localStorage.getItem(DrawerWidth) ?? 300));
  }, []);

  return (
    <div
      className={styles.drawer}
      style={{ display: isShow ? 'flex' : 'none', width: width }}
    >
      <div className={styles.slider}>
        <Tooltip placement="bottom" title="宽度">
          <span>
            <ColumnWidthOutlined />
          </span>
        </Tooltip>
        <InputNumber
          min={300}
          value={width}
          size="small"
          style={{ width: 60 }}
          max={500}
          onChange={value => {
            setWidth(value);
            localStorage.setItem(DrawerWidth, String(value));
          }}
        />
      </div>
      <Tabs className={styles.tabs}>
        {isComponentDisable && (
          <>
            <TabPane tab="属性" key="style">
              <Attribute page={page} />
            </TabPane>
            <TabPane tab="CSS" key="css">
              <CssEdit page={page} />
            </TabPane>
          </>
        )}
        {!isComponentDisable && (
          <TabPane tab="组件" key="component" className="tests">
            <ComponentEdit page={page} />
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default Drawer;
