import { SearchOutlined } from '@ant-design/icons';
import * as components from 'antd';
import _ from 'lodash';
import React, { useContext } from 'react';
import { useState } from 'react';
import { PagesContext } from 'src/context';
import { PageService } from 'src/controller';
import { EventType } from 'src/controller/browser';
import { AST } from 'src/model';
import { ComponentsAST } from './const';
import styles from './index.module.scss';

const Components: React.FC<{}> = () => {
  const [value, setValue] = useState('');
  const { pagesService } = useContext(PagesContext);

  pagesService.registerComponents(components);

  const page = pagesService.getCurrentPage();

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <components.Input
          placeholder="组件搜索"
          onChange={e => setValue(e.target.value)}
          addonAfter={<SearchOutlined />}
        />
      </div>
      <div className={styles.components}>
        {ComponentsAST.filter(component => {
          return (
            !value ||
            !component.children ||
            component.children.every(child => {
              return (
                !child.component ||
                new RegExp(`${_.escapeRegExp(value)}`, 'ig').test(
                  child.component?._name,
                )
              );
            })
          );
        }).map((ast, index) => (
          <Component key={index} ast={ast} page={page} />
        ))}
      </div>
    </div>
  );
};

const Component: React.FC<{ ast: AST; page: PageService }> = ({ ast, page }) => {
  const node = page?.createNode(_.cloneDeep(ast));
  const DOM = node?.createElement({ eventType: EventType.layout });

  return (
    <components.Tooltip placement="right" title={ast.children[0]?.component?._name}>
      <div>{DOM}</div>
    </components.Tooltip>
  );
};

export default Components;
