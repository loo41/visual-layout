import { Style } from 'src/model';
import { Width } from './component';

export interface CssProps {
  style?: Style[];
  onChange?: (styles: Style[]) => void;
}

const Css = [
  {
    title: '宽度',
    key: 'width',
    component: (props: CssProps) => <Width {...props} />,
  },
];

export { Css };
