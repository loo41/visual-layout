import _ from 'lodash';
import { AST, COMPONENT } from 'src/model';
import * as any from 'antd';

console.log('any', any);

export const Components: AST[] = [
  {
    name: '',
    type: COMPONENT,
    styles: [],
    children: [],
    component: {
      name: 'Button',
      type: 'primary',
      children: 'Button',
    },
  },
  {
    name: '',
    type: COMPONENT,
    styles: [],
    children: [],
    component: {
      name: 'Menu',
      children: [
        {
          name: 'Menu.Item',
          children: 'Navigation One',
        },
        {
          name: 'Menu.Item',
          children: 'Navigation Two',
        },
        {
          name: 'Menu.Item',
          children: 'Navigation Three',
        },
      ],
    },
  },
  {
    name: '',
    type: COMPONENT,
    styles: [],
    children: [],
    component: {
      name: 'Pagination',
      defaultCurrent: 1,
      total: 50,
    },
  },
  {
    name: '',
    type: COMPONENT,
    styles: [],
    children: [],
    component: {
      name: 'Steps',
      current: 1,
      children: [
        {
          name: 'Steps.Step',
          title: 'Finished',
          description: 'This is a description.',
        },
        {
          name: 'Steps.Step',
          title: 'In Progress',
          description: 'This is a description.',
        },
      ],
    },
  },
  {
    name: '',
    type: COMPONENT,
    styles: [],
    children: [],
    component: {
      name: 'Cascader',
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
      placeholder: 'Please select',
    },
  },
];

const container: AST = {
  name: 'div',
  type: 'label',
  styles: [],
  children: [],
};

export const ComponentsAST: AST[] = Components.map(component => {
  const Component = _.cloneDeep(container);
  Component.children = [component];
  return Component;
});
