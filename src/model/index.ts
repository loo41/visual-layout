import Pages from './pages';
import Page from './page';
import Node from './node';
import History from './history';
import { NodeService } from 'src/controller';

export { Pages, Page, Node, History };

export interface Style {
  key: string;
  value: string;
  title?: string;
}

export interface AST {
  type: string;
  styles: Style[];
  children: AST[];
  element?: HTMLElement;
}

export interface HistorySet {
  id: number;
  time: Date;
  node: NodeService;
  description?: string;
}
