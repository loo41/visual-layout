import { AST } from 'src/model';
import { useContext, useMemo } from 'react';
import styles from './index.module.scss';
import _ from 'lodash';
import { Tooltip } from 'antd';
import { PageService } from 'src/controller';
import { EventType } from 'src/controller/browser';
import Collapse from 'src/pages/components/Collapse';
import { LayoutAST } from './const';
import { AppContext } from 'src/context';

const Layout: React.FC<{}> = () => {
  const { appService } = useContext(AppContext);
  const pageService = appService.project.getCurrentPage();

  return useMemo(
    () => (
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
                  <Item layout={layout} pageService={pageService} />
                </div>
              ))}
            </div>
          </Collapse>
        ))}
      </div>
    ),
    [pageService],
  );
};

const Item: React.FC<{
  layout: { title: string; layout: AST };
  pageService: PageService;
}> = ({ layout, pageService }) => {
  const node = useMemo(() => {
    return pageService?.newNode(_.cloneDeep(layout.layout));
  }, [layout.layout, pageService]);

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
