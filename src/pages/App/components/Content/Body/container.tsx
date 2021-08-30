import { useCallback } from 'react';
import { PageService } from 'src/controller';
import { Options } from '..';
import styles from './index.module.scss';

const Container: React.FC<{ page: PageService; options: Options }> = ({
  page,
  options,
}) => {
  const updateSign = page.updateSign;

  const renderView = useCallback(
    (ele: HTMLDivElement) => {
      if (ele) {
        if (ele.firstChild) {
          ele.removeChild(ele.firstChild);
        }
        ele.appendChild(page.createView());
      }
    },
    // eslint-disable-next-line
    [updateSign, page.page, page.currentNode],
  );

  const canvasSize = {
    transform: `scale(${options.zoom},${options.zoom})`,
  };

  return (
    <div className={styles.container} style={canvasSize}>
      <div className={styles.canvas} ref={renderView} />
    </div>
  );
};

export default Container;
