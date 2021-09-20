import React, { useRef } from 'react';
import { PageService } from 'src/controller';
import { Options } from '..';
import styles from './index.module.scss';

const Container: React.FC<{
  page: PageService;
  curPage: PageService;
  options: Options;
}> = ({ page, curPage, options }) => {
  const cacheView = useRef<React.ReactElement>(<></>);

  const canvasSize = {
    transform: `scale(${options.zoom},${options.zoom})`,
  };

  if (page.id !== curPage.id) {
    return cacheView.current;
  }

  const view = (
    <div className={styles.container} style={canvasSize}>
      <div className={styles.canvas}>{page.createView()}</div>
    </div>
  );

  cacheView.current = view;

  return view;
};

export default Container;
