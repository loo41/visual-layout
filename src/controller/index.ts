import ProjectService from './service/project';
import PageService from './service/page';
import NodeService from './service/node';
import HistoryService from './service/history';
import AppService from './service/app';

import { AST, Style } from 'src/model';
export interface Options {
  id?: string;
  update?: () => void;
  name?: string;
  target: AST;
  selectStyle: Style[];
  previewStyle: (Style & { isCanUse?: boolean })[];
}

export { ProjectService, NodeService, PageService, HistoryService, AppService };
