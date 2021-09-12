import _ from 'lodash';
import { AST } from 'src/model';

export const Components: AST[] = [
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
  {
    _name: 'Button',
    type: 'Component',
    styles: [],
    children: 'Button',
    component: {
      type: 'primary',
    },
  },
  {
    _name: 'Menu',
    type: 'Component',
    styles: [],
    children: [
      {
        type: 'Component',
        _name: 'Menu.Item',
        children: 'Navigation One',
      },
      {
        type: 'Component',
        _name: 'Menu.Item',
        children: 'Navigation Two',
      },
      {
        type: 'Component',
        _name: 'Menu.Item',
        children: 'Navigation Three',
      },
    ],
    component: {},
  },
  {
    _name: 'Pagination',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      defaultCurrent: 1,
      total: 50,
    },
  },
  {
    _name: 'Steps',
    type: 'Component',
    styles: [],
    children: [
      {
        _name: 'Steps.Step',
        type: 'Component',
        children: [],
        component: {
          title: 'Finished',
          description: 'This is a description.',
        },
      },
      {
        _name: 'Steps.Step',
        type: 'Component',
        children: [],
        component: {
          title: 'In Progress',
          description: 'This is a description.',
        },
      },
    ],
    component: {
      current: 1,
    },
  },
  {
    _name: 'Cascader',
    type: 'Component',
    styles: [],
    children: null,
    component: {
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
  {
    _name: 'Checkbox.Group',
    type: 'Component',
    styles: [],
    children: null,
    component: {
      options: ['Apple', 'Pear', 'Orange'],
    },
  },
  {
    _name: 'DatePicker',
    type: 'Component',
    styles: [],
    children: [],
  },
  {
    _name: 'Input',
    type: 'Component',
    styles: [],
    children: null,
    component: {
      placeholder: 'Basic usage',
    },
  },
  {
    _name: 'InputNumber',
    type: 'Component',
    styles: [],
    children: null,
    component: {
      defaultValue: 10,
    },
  },
  {
    _name: 'Mentions',
    type: 'Component',
    styles: [],
    children: [
      {
        _name: 'Mentions.Option',
        type: 'Component',
        children: [],
        component: {
          value: 'afc163',
          children: 'afc163',
        },
      },
      {
        _name: 'Mentions.Option',
        type: 'Component',
        children: [],
        component: {
          value: 'zombieJ',
          children: 'zombieJ',
        },
      },
      {
        _name: 'Mentions.Option',
        type: 'Component',
        children: [],
        component: {
          value: 'yesmeck',
          children: 'yesmeck',
        },
      },
    ],
    component: {
      placeholder: 'Mentions',
    },
  },
  {
    _name: 'Radio',
    type: 'Component',
    styles: [],
    children: 'Radio',
  },
  {
    _name: 'Rate',
    type: 'Component',
    styles: [],
    children: [],
  },
  {
    _name: 'Select',
    type: 'Component',
    styles: [],
    children: [
      {
        _name: 'Select.Option',
        type: 'Component',
        children: [],
        component: {
          value: 'jack',
          children: 'jack',
        },
      },
      {
        _name: 'Select.Option',
        type: 'Component',
        children: [],
        component: {
          value: 'lucy',
          children: 'lucy',
        },
      },
      {
        _name: 'Select.Option',
        type: 'Component',
        children: [],
        component: {
          disabled: true,
          value: 'Disabled',
          children: 'Disabled',
        },
      },
    ],
    component: {
      defaultValue: 'lucy',
    },
  },
  {
    _name: 'Slider',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      defaultValue: 30,
    },
  },
  {
    _name: 'Switch',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      defaultChecked: true,
    },
  },
  {
    _name: 'TimePicker',
    type: 'Component',
    styles: [],
    children: [],
  },
  {
    _name: 'Avatar',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      size: 32,
    },
  },
  {
    _name: 'Badge',
    type: 'Component',
    styles: [],
    children: [
      {
        _name: 'Avatar',
        type: 'Component',
        children: [],
        component: {
          size: 32,
        },
      },
    ],
    component: {
      count: 5,
    },
  },
  {
    _name: 'Avatar',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  },
];

const container: AST = {
  _name: 'div',
  type: 'Element',
  styles: [],
  children: [],
};

export const ComponentsAST: AST[] = Components.map(component => {
  const Component = _.cloneDeep(container);
  Component.children = [component];
  return Component;
});
