import _ from 'lodash';
import { AST } from 'src/model';

export const Components: AST[] = [
  {
    _name: 'Button',
    type: 'Component',
    styles: [],
    children: 'Button',
    props: {
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
    props: {},
  },
  {
    _name: 'Pagination',
    type: 'Component',
    styles: [],
    children: [],
    props: {
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
        props: {
          title: 'Finished',
          description: 'This is a description.',
        },
      },
      {
        _name: 'Steps.Step',
        type: 'Component',
        children: [],
        props: {
          title: 'In Progress',
          description: 'This is a description.',
        },
      },
    ],
    props: {
      current: 1,
    },
  },
  {
    _name: 'Cascader',
    type: 'Component',
    styles: [],
    children: null,
    props: {
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
    props: {
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
    props: {
      placeholder: 'Basic usage',
    },
  },
  {
    _name: 'InputNumber',
    type: 'Component',
    styles: [],
    children: null,
    props: {
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
        props: {
          value: 'afc163',
          children: 'afc163',
        },
      },
      {
        _name: 'Mentions.Option',
        type: 'Component',
        children: [],
        props: {
          value: 'zombieJ',
          children: 'zombieJ',
        },
      },
      {
        _name: 'Mentions.Option',
        type: 'Component',
        children: [],
        props: {
          value: 'yesmeck',
          children: 'yesmeck',
        },
      },
    ],
    props: {
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
        props: {
          value: 'jack',
          children: 'jack',
        },
      },
      {
        _name: 'Select.Option',
        type: 'Component',
        children: [],
        props: {
          value: 'lucy',
          children: 'lucy',
        },
      },
      {
        _name: 'Select.Option',
        type: 'Component',
        children: [],
        props: {
          disabled: true,
          value: 'Disabled',
          children: 'Disabled',
        },
      },
    ],
    props: {
      defaultValue: 'lucy',
    },
  },
  {
    _name: 'Slider',
    type: 'Component',
    styles: [],
    children: [],
    props: {
      defaultValue: 30,
    },
  },
  {
    _name: 'Switch',
    type: 'Component',
    styles: [],
    children: [],
    props: {
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
    props: {
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
        props: {
          size: 32,
        },
      },
    ],
    props: {
      count: 5,
    },
  },
  {
    _name: 'Avatar',
    type: 'Component',
    styles: [],
    children: [],
    props: {
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
