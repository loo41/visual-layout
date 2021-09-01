import { Button, Menu } from 'antd';
import _ from 'lodash';
import React, { useContext } from 'react';
import { PagesContext } from 'src/context';
import { PageService } from 'src/controller';
import { EventType } from 'src/controller/browser';
import { AST } from 'src/model';
import { ComponentsAST } from './const';
import styles from './index.module.scss';

const Components: React.FC<{}> = () => {
  const { pagesService } = useContext(PagesContext);

  pagesService.components.set('Button', Button);
  pagesService.components.set('Menu', Menu);

  const page = pagesService.getCurrentPage();

  return (
    <div className={styles.container}>
      {ComponentsAST.map((ast, index) => (
        <Component key={index} ast={ast} page={page} />
      ))}
    </div>
  );
};

const Component: React.FC<{ ast: AST; page: PageService }> = ({ ast, page }) => {
  const node = page?.createNode(_.cloneDeep(ast));
  const DOM = node?.createElement({ eventType: EventType.layout });

  return <div>{DOM}</div>;
};

export default Components;
