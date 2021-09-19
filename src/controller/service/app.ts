import { PreviewStyle, SelectStyle } from 'src/const';
import { phone } from 'src/const/container';
import { cloneDeep } from 'src/util';
import ProjectService from './project';
import App from 'src/model/app';
import { Options } from 'src/controller';
import * as components from 'antd';
import { AppStorage } from '../code';

export const defaultOptions = {
  target: cloneDeep(phone),
  selectStyle: SelectStyle,
  previewStyle: PreviewStyle,
};

export default class AppService extends App {
  static updateView: () => void = () => {};
  private appStorage: AppStorage = new AppStorage();

  constructor() {
    super();
    this.init();
    AppService.registerComponents(components);
  }

  get projects() {
    return this.appStorage.projects;
  }

  init = () => {
    const project = this.appStorage.getHistoryProject();
    if (project) {
      this.project = new ProjectService(project);
    } else {
      this.new(defaultOptions);
    }
  };

  keep = () => {
    if (this.project) {
      this.appStorage.keep(this.project);
      this.update();
    }
  };

  set = (id: string) => {
    const project = this.appStorage.get(id);
    if (project) {
      this.project = new ProjectService(project);
      this.update();
    }
  };

  delete = (id: string) => {
    this.appStorage.delete(id);
    this.init();
    this.update();
  };

  new = (options?: Options) => {
    const project = new ProjectService();
    project.ceratePage(options || defaultOptions);
    this.project = project;
    this.update();
  };

  update = () => {
    Promise.resolve().then(() => AppService.updateView());
  };

  static registerComponents = (components: { [props: string]: unknown }) => {
    for (const [key, value] of Object.entries(components)) {
      AppService.components.set(key, value);
    }
    Promise.resolve().then(() => AppService.updateView());
  };
}
