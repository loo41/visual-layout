import {
  AppstoreOutlined,
  BuildOutlined,
  CheckCircleTwoTone,
  ProfileOutlined,
} from '@ant-design/icons';
import { Input, Tooltip, Tree } from 'antd';
import _ from 'lodash';
import { isString } from 'lodash';
import { DataNode, Key } from 'rc-tree/lib/interface';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { PagesContext } from 'src/context';
import { NodeService } from 'src/controller';
import { cloneJsxObject } from 'src/util';
import styles from './index.module.scss';

const nodeKeyId = new Map();
const NodeTree = () => {
  const [search, setSearch] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const { pagesService, refresh } = useContext(PagesContext);

  const page = pagesService.getCurrentPage();
  useEffect(() => {
    setAutoExpandParent(true);
    setExpandedKeys([
      // @ts-ignore
      ...new Set([
        ...expandedKeys,
        ...(page?.currentNode.map(({ id }) => id) || []),
      ]),
    ]);
    // eslint-disable-next-line
  }, [pagesService, page?.currentNode[0]]);

  const trees = useMemo((): DataNode[] => {
    const getTree = (node: NodeService | string, id?: number): DataNode => {
      if (isString(node)) {
        return {
          title: node,
          key: `${id}:${node}`,
          icon: (
            <Tooltip placement="right" title="Text">
              <ProfileOutlined />
            </Tooltip>
          ),
        };
      } else {
        const { id, _name, type, children } = node;
        nodeKeyId.set(id, node);
        return {
          title: `${_name}`,
          key: id,
          icon: ({ selected }) =>
            selected ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : type === 'Component' ? (
              <Tooltip placement="right" title="Component">
                <AppstoreOutlined />
              </Tooltip>
            ) : (
              <Tooltip placement="right" title="Element">
                <BuildOutlined />
              </Tooltip>
            ),

          children: isString(children)
            ? [
                {
                  title: children,
                  key: `${id}:${children}`,
                  icon: (
                    <Tooltip placement="right" title="Text">
                      <ProfileOutlined />
                    </Tooltip>
                  ),
                },
              ]
            : (children
                ?.map(child => child && getTree(child, id))
                .filter(_ => _) as DataNode[]),
        };
      }
    };
    return page?.page ? [getTree(page.page)] : [];
    // eslint-disable-next-line
  }, [refresh, page?.page]);

  const filter = (treeData: DataNode[]): DataNode[] => {
    function matchSearch<T extends string>(title: T): boolean {
      return !search || new RegExp(_.escapeRegExp(search), 'ig').test(title);
    }

    return treeData
      .map(tree => {
        const { title, children } = tree;
        tree.children = children && filter(children);
        if (tree.children?.length || matchSearch(title as string)) {
          return tree;
        }
        return false;
      })
      .filter(_ => _) as DataNode[];
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Input.Search
          placeholder="Search Node"
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.scrollWarper}>
        <Tree
          showIcon
          onSelect={(_, { node }) => {
            if (node) {
              const nodeService = nodeKeyId.get(node.key);
              if (nodeService) {
                page.setCurrentNode([nodeService]);
              }
            }
          }}
          showLine={{ showLeafIcon: false }}
          selectedKeys={
            pagesService.getCurrentPage()?.currentNode.map(({ id }) => id) || []
          }
          autoExpandParent={autoExpandParent}
          expandedKeys={expandedKeys}
          onExpand={expandedKeysValue => {
            setAutoExpandParent(false);
            setExpandedKeys(expandedKeysValue);
          }}
          treeData={filter(cloneJsxObject(trees))}
        />
      </div>
    </div>
  );
};

export default NodeTree;
