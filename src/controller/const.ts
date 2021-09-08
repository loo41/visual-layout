import { AST, Style } from 'src/model';
export interface Options {
  id: string;
  update: () => void;
  page: AST;
  name: string;
  selectStyle: Style[];
  previewStyle: (Style & { isCanUse?: boolean })[];
}
