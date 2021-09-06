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
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'Checkbox.Group',
      options: ['Apple', 'Pear', 'Orange'],
    },
  },
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'DatePicker',
    },
  },
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'Input',
      placeholder: 'Basic usage',
    },
  },
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'InputNumber',
      defaultValue: 10,
    },
  },
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'Mentions',
      placeholder: 'Mentions',
      children: [
        {
          _name: 'Mentions.Option',
          value: 'afc163',
          children: 'afc163',
        },
        {
          _name: 'Mentions.Option',
          value: 'zombieJ',
          children: 'zombieJ',
        },
        {
          _name: 'Mentions.Option',
          value: 'yesmeck',
          children: 'yesmeck',
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
      _name: 'Radio',
      children: 'Radio',
    },
  },
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'Rate',
    },
  },
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'Select',
      defaultValue: 'lucy',
      children: [
        {
          _name: 'Select.Option',
          value: 'jack',
          children: 'jack',
        },
        {
          _name: 'Select.Option',
          value: 'lucy',
          children: 'lucy',
        },
        {
          _name: 'Select.Option',
          value: 'Disabled',
          children: 'Disabled',
          disabled: true,
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
      _name: 'Slider',
      defaultValue: 30,
    },
  },
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'Switch',
      defaultChecked: true,
    },
  },
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'TimePicker',
    },
  },
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'Avatar',
      size: 32,
    },
  },
  {
    _name: '',
    type: 'Component',
    styles: [],
    children: [],
    component: {
      _name: 'Badge',
      count: 5,
      children: [
        {
          _name: 'Avatar',
          size: 32,
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
      _name: 'Avatar',
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
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
