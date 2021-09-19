import { AST } from 'src/model';

const computer: AST = {
  _name: 'div',
  type: 'Element',
  styles: [
    {
      key: 'height',
      value: '800px',
    },
    {
      key: 'width',
      value: '1280px',
    },
    {
      key: 'background',
      value: 'white',
    },
  ],
  children: [],
};

const models = [
  {
    height: '926',
    width: '428',
    key: 'iPhone 12 Pro Max',
  },
  {
    height: '844',
    width: '390',
    key: 'iPhone 12 Pro',
  },
  {
    height: '896',
    width: '414',
    key: 'iPhone 11',
  },
  {
    height: '640',
    width: '360',
    key: 'Nexus 5',
  },
  {
    height: '800',
    width: '360',
    key: 'Samsung Galaxy A70',
  },
  {
    height: '780',
    width: '360',
    key: 'Oppo Find X',
  },
  {
    height: '1366',
    width: '1024',
    key: 'iPadOS',
  },
  {
    height: '1024',
    width: '768',
    key: '小米平板',
  },
  {
    height: '800',
    width: '1280',
    key: 'MacBook',
  },
];

export { computer, models };
