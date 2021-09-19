import { AST } from 'src/model';
import { useMemo } from 'react';
import styles from './index.module.scss';
import _ from 'lodash';
import { Tooltip } from 'antd';
import { PageService } from 'src/controller';
import { EventType } from 'src/controller/browser';
import Collapse from 'src/pages/components/Collapse';
import { LayoutAST } from './const';

const Layout: React.FC<{}> = () => {
  return (
    <div className={styles.container}>
      {LayoutAST.map(({ children, title }) => (
        <Collapse
          key={title}
          header={
            <div className={styles.header}>
              <span>{title}</span>
            </div>
          }
        >
          <div className={styles.layoutWarper}>
            {children.map(layout => (
              <div key={layout.title} className={styles.item}>
                <Item layout={layout} />
              </div>
            ))}
          </div>
        </Collapse>
      ))}
    </div>
  );
};

const Item: React.FC<{ layout: { title: string; layout: AST } }> = ({ layout }) => {
  const node = useMemo(() => {
    return PageService?.createNode(_.cloneDeep(layout.layout));
  }, [layout.layout]);

  const DOM = useMemo(
    () => node?.createElement({ eventType: EventType.layout }),
    [node],
  );

  return (
    <Tooltip placement="left" title={layout.title}>
      <div style={{ height: '100%', width: '100%' }}>{DOM}</div>
    </Tooltip>
  );
};

export default Layout;
