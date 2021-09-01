import { AST } from 'src/model';

export const ComponentsAST: AST[] = [
  {
    name: 'div',
    type: 'label',
    styles: [],
    children: [
      {
        name: '',
        type: 'component',
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
        type: 'component',
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
];
