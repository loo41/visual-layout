import _ from 'lodash';
import { AST } from 'src/model';

export const Components: AST[] = [
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'Button',
      type: 'primary',
      children: 'Button',
    },
  },
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'Menu',
      children: [
        {
          _name: 'Menu.Item',
          children: 'Navigation One',
        },
        {
          _name: 'Menu.Item',
          children: 'Navigation Two',
        },
        {
          _name: 'Menu.Item',
          children: 'Navigation Three',
        },
      ],
    },
  },
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'Pagination',
      defaultCurrent: 1,
      total: 50,
    },
  },
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'Steps',
      current: 1,
      children: [
        {
          _name: 'Steps.Step',
          title: 'Finished',
          description: 'This is a description.',
        },
        {
          _name: 'Steps.Step',
          title: 'In Progress',
          description: 'This is a description.',
        },
      ],
    },
  },
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'Cascader',
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
  _name: 'div',
  type: 'element',
  styles: [],
  children: [],
};

export const ComponentsAST: AST[] = Components.map(component => {
  const Component = _.cloneDeep(container);
  Component.children = [component];
  return Component;
});
