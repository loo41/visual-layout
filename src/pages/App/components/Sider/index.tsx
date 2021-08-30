import { Layout } from 'antd';
import { useState, useMemo } from 'react';
import { getSiderMenu, Menu } from 'src/pages/App/config';
import MenuComponent from './Menu';
import styles from './index.module.scss';

const { Sider } = Layout;

// eslint-disable-next-line
export default () => {
  const menus: Menu[] = useMemo(() => {
    return getSiderMenu();
  }, []);

  const [curMenu, setCurMenu] = useState(menus[0].id);

  return (
    <Sider width={400} theme="light">
      <div className={styles.slider}>
        <MenuComponent onChange={menu => setCurMenu(menu)} menus={menus} />
        <div className={styles.body}>
          {menus.map(({ component, id, title }) => {
            const isShow = curMenu === id;
            return (
              <div
                key={id}
                className={styles.card}
                style={{ display: isShow ? 'flex' : 'none' }}
              >
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.component}>{component}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Sider>
  );
};
