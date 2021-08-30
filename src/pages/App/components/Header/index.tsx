import { Layout } from 'antd';
import styles from './index.module.scss';

const { Header } = Layout;

export default () => {
  return <Header className={styles.header}></Header>;
};
