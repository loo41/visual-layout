import { AST, COMPONENT } from 'src/model';

export const ComponentsAST: AST[] = [
  {
    name: 'div',
    type: 'label',
    styles: [],
    children: [
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
    ],
  },
  {
    name: 'div',
    type: 'label',
    styles: [],
    children: [
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
    ],
  },
  {
    name: 'div',
    type: 'label',
    styles: [],
    children: [
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
    ],
  },
  {
    name: 'div',
    type: 'label',
    styles: [],
    children: [
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
    ],
  },
  {
    name: 'div',
    type: 'label',
    styles: [],
    children: [
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
    ],
  },
];
