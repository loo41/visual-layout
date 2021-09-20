import { Style } from 'src/model';
import { Width, Height, Display } from './components';

export interface CssProps {
  style?: Style[];
  onChange?: (styles: Style[]) => void;
}

const Css = [
  {
    key: 'width',
    component: (props: CssProps) => <Width {...props} key="width" />,
  },
  {
    key: 'height',
    component: (props: CssProps) => <Height {...props} key="height" />,
  },
  {
    key: 'display',
    component: (props: CssProps) => <Display {...props} key="display" />,
  },
];

export { Css };
