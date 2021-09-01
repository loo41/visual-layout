import { AST } from 'src/model';

const flexRow: AST = {
  name: 'div',
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
      name: 'div',
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
  name: 'div',
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
      name: 'div',
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
  name: 'div',
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
      name: 'div',
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
      name: 'div',
      type: 'label',
      styles: [
        {
          key: 'flex',
          value: '1',
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
      name: 'div',
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
  name: 'div',
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
      name: 'div',
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
  name: 'div',
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
      name: 'div',
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
      ],
      children: [],
    },
  ],
};

const LayoutAST = [
  {
    title: 'Flex 横向',
    layout: flexRow,
  },
  {
    title: 'Flex 纵向',
    layout: flexColum,
  },
  {
    title: '移动端上下 Padding',
    layout: mobile,
  },
  {
    title: '滚动',
    layout: scroll,
  },
  {
    title: '空盒子',
    layout: none,
  },
];

export { LayoutAST };
