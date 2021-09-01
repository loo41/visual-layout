import { AST } from 'src/model';
import { useContext } from 'react';
import styles from './index.module.scss';
import { LayoutAST } from 'src/pages/App/slider-components/Layout/const';
import { PagesContext } from 'src/context';
import _ from 'lodash';
import { Tooltip } from 'antd';
import { PageService } from 'src/controller';
import { EventType } from 'src/controller/browser';

const Layout: React.FC<{}> = () => {
  const { pagesService } = useContext(PagesContext);

  const page = pagesService.getCurrentPage();

  return (
    <div className={styles.container}>
      {LayoutAST.map((layout, index) => (
        <div key={index} className={styles.layoutWarper}>
          <Item layout={layout} page={page} />
        </div>
      ))}
    </div>
  );
};

const Item: React.FC<{ layout: { title: string; layout: AST }; page: PageService }> =
  ({ layout, page }) => {
    const node = page?.createNode(_.cloneDeep(layout.layout));
    const DOM = node?.createElement({ eventType: EventType.layout });

    return (
      <Tooltip placement="left" title={layout.title}>
        <div style={{ height: '100%', width: '100%' }}>{DOM}</div>
      </Tooltip>
    );
  };

export default Layout;
