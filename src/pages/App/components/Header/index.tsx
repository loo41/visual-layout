import { ExpandOutlined, GithubOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import screenFull from 'screenfull';
import Home from './components/Home';
import styles from './index.module.scss';

const { Header } = Layout;

// eslint-disable-next-line
export default () => {
  const requestFullScreen = () => {
    if (screenFull.isEnabled) {
      screenFull.request();
    }
  };

  return (
    <Header className={styles.header}>
      <div className={styles.leftWarper}>
        <div className={styles.item} onClick={e => requestFullScreen()}>
          <ExpandOutlined />
        </div>
        <div className={`${styles.item} ${styles.itemHome}`}>
          <Home />
        </div>
      </div>
      <div>
        <div
          className={styles.item}
          onClick={() => {
            window.open('https://github.com/loo41/visual-layout');
          }}
        >
          <GithubOutlined style={{ color: 'white' }} />
        </div>
      </div>
    </Header>
  );
};
