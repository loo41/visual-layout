import { Layout } from 'antd';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from 'src/context';
import Body from './Body';
import Header from './Header';
import styles from './index.module.scss';

const { Content } = Layout;

export interface Options {
  zoom: number;
}

// eslint-disable-next-line
export default () => {
  const { appService } = useContext(AppContext);

  const [options, setOptions] = useState<Options>({
    zoom: 1,
  });

  return (
    <Content className={styles.content}>
      <Header
        pagesService={appService.project}
        options={options}
        setOptions={setOptions}
      />
      <Body pagesService={appService.project} options={options} />
    </Content>
  );
};
