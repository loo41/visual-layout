import _ from 'lodash';
import { AST, Pages } from 'src/model';

export const Components: AST[] = [
  {
    [Pages.COMPONENT_NAME]: '',
    type: Pages.COMPONENT,
    styles: [],
    children: [],
    component: {
      name: 'Button',
      type: 'primary',
      children: 'Button',
    },
  },
  {
    [Pages.COMPONENT_NAME]: '',
    type: Pages.COMPONENT,
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
    [Pages.COMPONENT_NAME]: '',
    type: Pages.COMPONENT,
    styles: [],
    children: [],
    component: {
      name: 'Pagination',
      defaultCurrent: 1,
      total: 50,
    },
  },
  {
    [Pages.COMPONENT_NAME]: '',
    type: Pages.COMPONENT,
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
    [Pages.COMPONENT_NAME]: '',
    type: Pages.COMPONENT,
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
  [Pages.COMPONENT_NAME]: 'div',
  type: 'label',
  styles: [],
  children: [],
};

export const ComponentsAST: AST[] = Components.map(component => {
  const Component = _.cloneDeep(container);
  Component.children = [component];
  return Component;
});
