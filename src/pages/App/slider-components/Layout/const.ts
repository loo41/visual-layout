import { AST, Pages } from 'src/model';

const flexRow: AST = {
  [Pages.COMPONENT_NAME]: 'div',
  type: 'label',
  styles: [
    { key: 'display', value: 'flex' },
    {
      key: 'height',
      value: '100%',
    },
    {
      key: 'width',
      value: '100%',
    },
  ],
  children: new Array(3).fill(0).map(item => {
    return {
      [Pages.COMPONENT_NAME]: 'div',
      type: 'label',
      styles: [
        {
          key: 'display',
          value: 'flex',
        },
        {
          key: 'flex',
          value: '1',
        },
      ],
      children: [],
      extraStyles: [
        {
          key: 'border',
          value: '1px dashed #000000',
        },
        {
          key: 'padding',
          value: '5px',
        },
      ],
    };
  }),
};

const flexColum: AST = {
  [Pages.COMPONENT_NAME]: 'div',
  type: 'label',
  styles: [
    { key: 'display', value: 'flex' },
    { key: 'flex-direction', value: 'column' },
    {
      key: 'height',
      value: '100%',
    },
    {
      key: 'width',
      value: '100%',
    },
  ],
  children: new Array(3).fill(0).map(item => {
    return {
      [Pages.COMPONENT_NAME]: 'div',
      type: 'label',
      styles: [
        {
          key: 'display',
          value: 'flex',
        },
        {
          key: 'flex',
          value: '1',
        },
      ],
      children: [],
      extraStyles: [
        {
          key: 'border',
          value: '1px dashed #000000',
        },
        {
          key: 'padding',
          value: '5px',
        },
      ],
    };
  }),
};

const mobile: AST = {
  [Pages.COMPONENT_NAME]: 'div',
  type: 'label',
  styles: [
    { key: 'padding', value: '50px 0' },
    {
      key: 'height',
      value: '100%',
    },
    {
      key: 'width',
      value: '100%',
    },
    {
      key: 'position',
      value: 'relative',
    },
    {
      key: 'display',
      value: 'flex',
    },
  ],
  children: [
    {
      [Pages.COMPONENT_NAME]: 'div',
      type: 'label',
      styles: [
        {
          key: 'position',
          value: 'absolute',
        },
        {
          key: 'height',
          value: '50px',
        },
        {
          key: 'width',
          value: '100%',
        },
        {
          key: 'top',
          value: '0',
        },
        {
          key: 'left',
          value: '0',
        },
      ],
      children: [],
    },
    {
      [Pages.COMPONENT_NAME]: 'div',
      type: 'label',
      styles: [
        {
          key: 'flex',
          value: '1',
        },
        {
          key: 'min-height',
          value: '60px',
        },
        {
          key: 'overflow',
          value: 'auto',
        },
        {
          key: 'margin',
          value: '10px 0',
        },
      ],
      children: [],
    },
    {
      [Pages.COMPONENT_NAME]: 'div',
      type: 'label',
      styles: [
        {
          key: 'position',
          value: 'absolute',
        },
        {
          key: 'height',
          value: '50px',
        },
        {
          key: 'width',
          value: '100%',
        },
        {
          key: 'bottom',
          value: '0',
        },
        {
          key: 'left',
          value: '0',
        },
      ],
      children: [],
    },
  ],
};

const none: AST = {
  [Pages.COMPONENT_NAME]: 'div',
  type: 'label',
  styles: [
    {
      key: 'height',
      value: '100%',
    },
    {
      key: 'width',
      value: '100%',
    },
    {
      key: 'overflow',
      value: 'auto',
    },
  ],
  children: [
    {
      [Pages.COMPONENT_NAME]: 'div',
      type: 'label',
      styles: [
        {
          key: 'height',
          value: '100%',
        },
        {
          key: 'width',
          value: '100%',
        },
        {
          key: 'overflow',
          value: 'auto',
        },
      ],
      children: [],
    },
  ],
};

const scroll: AST = {
  [Pages.COMPONENT_NAME]: 'div',
  type: 'label',
  styles: [
    {
      key: 'height',
      value: '100%',
    },
    {
      key: 'width',
      value: '100%',
    },
    {
      key: 'overflow',
      value: 'auto',
    },
  ],
  children: [
    {
      [Pages.COMPONENT_NAME]: 'div',
      type: 'label',
      styles: [
        {
          key: 'height',
          value: '300%',
        },
        {
          key: 'width',
          value: '100%',
        },
        {
          key: 'background',
          value: '#f5f5f5',
        },
      ],
      children: [],
    },
  ],
};

const position: AST = {
  [Pages.COMPONENT_NAME]: 'div',
  type: 'label',
  styles: [
    {
      key: 'height',
      value: '100%',
    },
    {
      key: 'width',
      value: '100%',
    },
    {
      key: 'position',
      value: 'relative',
    },
  ],
  children: [
    {
      [Pages.COMPONENT_NAME]: 'div',
      type: 'label',
      styles: [
        {
          key: 'position',
          value: 'absolute',
        },
        {
          key: 'width',
          value: '50px',
        },
        {
          key: 'height',
          value: '50px',
        },
        {
          key: 'top',
          value: '10px',
        },
        {
          key: 'left',
          value: '10px',
        },
        {
          key: 'background',
          value: '#f5f5f5',
        },
      ],
      children: [],
    },
  ],
};

const LayoutAST = [
  {
    title: '基础',
    children: [
      {
        title: '空 DIV',
        layout: none,
      },
      {
        title: '滚动',
        layout: scroll,
      },
      {
        title: 'Position',
        layout: position,
      },
    ],
  },
  {
    title: 'Flex',
    children: [
      {
        title: 'Flex 横向',
        layout: flexRow,
      },
      {
        title: 'Flex 纵向',
        layout: flexColum,
      },
    ],
  },
  {
    title: '移动端',
    children: [
      {
        title: '头部/底部: Padding',
        layout: mobile,
      },
    ],
  },
];

export { LayoutAST };
