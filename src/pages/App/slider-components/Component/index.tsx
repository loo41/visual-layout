import { SearchOutlined } from '@ant-design/icons';
import * as components from 'antd';
import _, { isString } from 'lodash';
import React, { useContext, useMemo } from 'react';
import { useState } from 'react';
import { AppContext } from 'src/context';
import { PageService } from 'src/controller';
import { EventType } from 'src/controller/browser';
import { AST } from 'src/model';
import { ComponentsAST } from './const';
import styles from './index.module.scss';

const Components: React.FC<{}> = () => {
  const [value, setValue] = useState('');
  const { appService } = useContext(AppContext);
  const pageService = appService.project.getCurrentPage();

  return useMemo(
    () => (
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
              (typeof component.children !== 'string' &&
                component.children.every(child => {
                  return new RegExp(`${_.escapeRegExp(value)}`, 'ig').test(
                    isString(child) ? child : child._name,
                  );
                }))
            );
          }).map((ast, index) => (
            <Component key={index} ast={ast} pageService={pageService} />
          ))}
        </div>
      </div>
    ),
    [pageService, value],
  );
};

const Component: React.FC<{ ast: AST; pageService: PageService }> = ({
  ast,
  pageService,
}) => {
  const node = useMemo(
    () => pageService?.newNode(_.cloneDeep(ast)),
    [ast, pageService],
  );

  const DOM = useMemo(
    () => (
      <components.Tooltip
        placement="right"
        title={
          typeof ast.children?.[0] === 'string'
            ? ast.children[0]
            : ast.children?.[0]._name
        }
      >
        <div>{node?.createElement({ eventType: EventType.layout })}</div>
      </components.Tooltip>
    ),
    [node, ast.children],
  );

  return DOM;
};

export default Components;
