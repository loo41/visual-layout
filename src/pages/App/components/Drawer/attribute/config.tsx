import { Style } from 'src/model';
import { Width, Height, Display } from './components';

export interface CssProps {
  style?: Style[];
  onChange?: (styles: Style[]) => void;
}

const Css = [
  {
    key: 'width',
    component: (props: CssProps) => <Width {...props} />,
  },
  {
    key: 'height',
    component: (props: CssProps) => <Height {...props} />,
  },
  {
    key: 'display',
    component: (props: CssProps) => <Display {...props} />,
  },
];

export { Css };
