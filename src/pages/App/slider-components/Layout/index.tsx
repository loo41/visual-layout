import { AST } from 'src/model';
import { useContext } from 'react';
import styles from './index.module.scss';
import { LayoutAST } from 'src/const/layout';
import { useCallback } from 'react';
import { PagesContext } from 'src/context';
import { useRef } from 'react';
import { useMemo } from 'react';
import _ from 'lodash';
import { Tooltip } from 'antd';

const Layout: React.FC<{}> = () => {
  const { pagesService } = useContext(PagesContext);
  const pageLayout = useRef<{ [props: string]: { title: string; layout: AST }[] }>(
    {},
  );

  const page = pagesService.getCurrentPage();

  const pageLayoutAST = useMemo(() => {
    if (page) {
      if (pageLayout.current?.[page.id]) {
        return pageLayout.current[page.id];
      }
      LayoutAST.forEach(layout => {
        const node = page.createNode(_.cloneDeep(layout.layout));
        const DOM = page.Doc.create(node);
        page.DocEvent.bindLayoutEvent(node);
        layout.layout.element = DOM;
      });

      pageLayout.current[page.id] = LayoutAST;
    }

    return LayoutAST;
  }, [page]);

  return (
    <div className={styles.container}>
      {pageLayoutAST.map((layout, index) => (
        <div key={index} className={styles.layoutWarper}>
          <Item layout={layout} />
        </div>
      ))}
    </div>
  );
};

const Item: React.FC<{ layout: { title: string; layout: AST } }> = ({ layout }) => {
  const renderLayout = useCallback(
    (ele: HTMLDivElement) => {
      if (ele && layout.layout.element) {
        if (ele.firstChild) ele.removeChild(ele.firstChild);
        ele.appendChild(layout.layout.element);
      }
    },
    [layout.layout.element],
  );

  return (
    <Tooltip placement="left" title={layout.title}>
      <div style={{ height: '100%', width: '100%' }} ref={renderLayout} />
    </Tooltip>
  );
};

export default Layout;
