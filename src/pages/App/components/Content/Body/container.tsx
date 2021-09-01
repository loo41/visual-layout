import { useCallback } from 'react';
import { PageService } from 'src/controller';
import { Options } from '..';
import styles from './index.module.scss';

const Container: React.FC<{ page: PageService; options: Options }> = ({
  page,
  options,
}) => {
  const canvasSize = {
    transform: `scale(${options.zoom},${options.zoom})`,
  };

  return (
    <div className={styles.container} style={canvasSize}>
      <div className={styles.canvas}>{page.createView()}</div>
    </div>
  );
};

export default Container;
