import { AST } from 'src/model';

const flexRow: AST = {
  _name: 'div',
  type: 'Element',
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
      _name: 'div',
      type: 'Element',
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

const flexCol: AST = {
  _name: 'div',
  type: 'Element',
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
      _name: 'div',
      type: 'Element',
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
  _name: 'div',
  type: 'Element',
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
      _name: 'div',
      type: 'Element',
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
      _name: 'div',
      type: 'Element',
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
      _name: 'div',
      type: 'Element',
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
  _name: 'div',
  type: 'Element',
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
      _name: 'div',
      type: 'Element',
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
  _name: 'div',
  type: 'Element',
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
      _name: 'div',
      type: 'Element',
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
  _name: 'div',
  type: 'Element',
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
      _name: 'div',
      type: 'Element',
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

const componentLayout: AST = {
  _name: 'div',
  type: 'Element',
  styles: [],
  children: [
    {
      _name: 'Layout',
      type: 'Component',
      styles: [],
      children: [
        {
          _name: 'Layout.Header',
          type: 'Component',
          styles: [],
          hasCanChild: true,
          children: 'Header',
        },
        {
          _name: 'Layout.Content',
          type: 'Component',
          styles: [],
          hasCanChild: true,
          children: 'Content',
        },
        {
          _name: 'Layout.Footer',
          type: 'Component',
          styles: [],
          hasCanChild: true,
          children: 'Footer',
        },
      ],
      component: {
        style: { height: '100%' },
      },
    },
  ],
};

const componentSliderLayout: AST = {
  _name: 'div',
  type: 'Element',
  styles: [],
  children: [
    {
      _name: 'Layout',
      type: 'Component',
      styles: [],
      children: [
        {
          _name: 'Layout.Sider',
          type: 'Component',
          styles: [],
          hasCanChild: true,
          children: 'Sider',
        },
        {
          _name: 'Layout',
          type: 'Component',
          styles: [],
          hasCanChild: true,
          children: [
            {
              _name: 'Layout.Header',
              type: 'Component',
              styles: [],
              hasCanChild: true,
              children: 'Header',
            },
            {
              _name: 'Layout.Content',
              type: 'Component',
              styles: [],
              hasCanChild: true,
              children: 'Content',
            },
            {
              _name: 'Layout.Footer',
              type: 'Component',
              styles: [],
              hasCanChild: true,
              children: 'Footer',
            },
          ],
        },
      ],
      component: {
        style: { height: '100%' },
      },
    },
  ],
};

const componentGrid: AST = {
  _name: 'div',
  type: 'Element',
  styles: [
    {
      key: 'height',
      value: '100%',
    },
    {
      key: 'width',
      value: '100%',
    },
  ],
  children: [
    {
      _name: 'Row',
      type: 'Component',
      hasCanChild: true,
      styles: [],
      component: {
        gutter: 6,
      },
      children: [
        {
          _name: 'Col',
          type: 'Component',
          styles: [],
          component: {
            span: 8,
          },
          children: [{ _name: 'div', type: 'Element', styles: [], children: [] }],
        },
        {
          _name: 'Col',
          type: 'Component',
          styles: [],
          component: {
            span: 8,
          },
          children: [{ _name: 'div', type: 'Element', styles: [], children: [] }],
        },
        {
          _name: 'Col',
          type: 'Component',
          styles: [],
          component: {
            span: 8,
          },
          children: [{ _name: 'div', type: 'Element', styles: [], children: [] }],
        },
      ],
    },
  ],
};

const Card: AST = {
  _name: 'div',
  type: 'Element',
  styles: [],
  children: [
    {
      _name: 'Card',
      type: 'Component',
      component: {
        title: 'Title',
      },
      hasCanChild: true,
      styles: [],
      children: [
        {
          _name: 'div',
          type: 'Element',
          styles: [],
          children: 'children',
        },
      ],
    },
  ],
};

const LayoutAST = [
  {
    title: '组件',
    children: [
      {
        title: 'Layout',
        layout: componentLayout,
      },
      {
        title: 'Layout-Slider',
        layout: componentSliderLayout,
      },
      {
        title: 'Card',
        layout: Card,
      },
      {
        title: 'Grid',
        layout: componentGrid,
      },
    ],
  },
  {
    title: '基础',
    children: [
      {
        title: 'DIV',
        layout: none,
      },
      {
        title: 'Scroll',
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
        title: 'Flex Row',
        layout: flexRow,
      },
      {
        title: 'Flex Col',
        layout: flexCol,
      },
    ],
  },
  {
    title: '移动端',
    children: [
      {
        title: 'Mobile',
        layout: mobile,
      },
    ],
  },
];

export { LayoutAST };
