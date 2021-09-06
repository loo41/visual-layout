import _ from 'lodash';
import { AST, Pages } from 'src/model';

export const Components: AST[] = [
  {
    [Pages.NODE_NAME]: '',
    type: Pages.COMPONENT,
    styles: [],
    children: [],
    component: {
      [Pages.COMPONENT_NAME]: 'Button',
      type: 'primary',
      children: 'Button',
    },
  },
  {
    [Pages.NODE_NAME]: '',
    type: Pages.COMPONENT,
    styles: [],
    children: [],
    component: {
      [Pages.COMPONENT_NAME]: 'Menu',
      children: [
        {
          [Pages.COMPONENT_NAME]: 'Menu.Item',
          children: 'Navigation One',
        },
        {
          [Pages.COMPONENT_NAME]: 'Menu.Item',
          children: 'Navigation Two',
        },
        {
          [Pages.COMPONENT_NAME]: 'Menu.Item',
          children: 'Navigation Three',
        },
      ],
    },
  },
  {
    [Pages.NODE_NAME]: '',
    type: Pages.COMPONENT,
    styles: [],
    children: [],
    component: {
      [Pages.COMPONENT_NAME]: 'Pagination',
      defaultCurrent: 1,
      total: 50,
    },
  },
  {
    [Pages.NODE_NAME]: '',
    type: Pages.COMPONENT,
    styles: [],
    children: [],
    component: {
      [Pages.COMPONENT_NAME]: 'Steps',
      current: 1,
      children: [
        {
          [Pages.COMPONENT_NAME]: 'Steps.Step',
          title: 'Finished',
          description: 'This is a description.',
        },
        {
          [Pages.COMPONENT_NAME]: 'Steps.Step',
          title: 'In Progress',
          description: 'This is a description.',
        },
      ],
    },
  },
  {
    [Pages.NODE_NAME]: '',
    type: Pages.COMPONENT,
    styles: [],
    children: [],
    component: {
      [Pages.COMPONENT_NAME]: 'Cascader',
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
  [Pages.NODE_NAME]: 'div',
  type: 'label',
  styles: [],
  children: [],
};

export const ComponentsAST: AST[] = Components.map(component => {
  const Component = _.cloneDeep(container);
  Component.children = [component];
  return Component;
});
