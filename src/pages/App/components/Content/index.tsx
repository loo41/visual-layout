import { Layout } from 'antd';
import { useState } from 'react';
import { useContext } from 'react';
import { PagesContext } from 'src/context';
import Body from './Body';
import Header from './Header';
import styles from './index.module.scss';

const { Content } = Layout;

export interface Options {
  zoom: number;
}

// eslint-disable-next-line
export default () => {
  const { pagesService } = useContext(PagesContext);

  const [options, setOptions] = useState<Options>({
    zoom: 1,
  });

  return (
    <Content className={styles.content}>
      <Header
        pagesService={pagesService}
        options={options}
        setOptions={setOptions}
      />
      <Body pagesService={pagesService} options={options} />
    </Content>
  );
};
