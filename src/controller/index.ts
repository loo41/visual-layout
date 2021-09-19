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

export type ComponentValue = {
  from: string;
  to: unknown;
};
export type Components = Map<string, ComponentValue>;

export type ProjectOptions = Pick<
  Options,
  'target' | 'selectStyle' | 'previewStyle'
>;
export interface ProjectConfig {
  options: ProjectOptions;
}

export interface AppConfig {
  project: ProjectConfig;
  components: Components;
}

export { ProjectService, NodeService, PageService, HistoryService, AppService };
