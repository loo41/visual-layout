import ProjectService from './project';
import App from 'src/model/app';
import { AppConfig, ComponentValue, Options } from 'src/controller';
import { AppStorage } from '../code';

export default class AppService extends App {
  static updateView: () => void = () => {};
  private appStorage: AppStorage = new AppStorage();
  public appConfig: AppConfig;

  constructor(appConfig: AppConfig) {
    super();

    this.appConfig = appConfig;
    AppService.components = appConfig.components;

    this.init();
  }

  get projects() {
    return this.appStorage.projects;
  }

  init = () => {
    const project = this.appStorage.getHistoryProject();
    if (project) {
      this.project = new ProjectService({
        ...this.appConfig.project.options,
        ...project,
      });
    } else {
      this.new(this.appConfig.project.options);
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
      this.project = new ProjectService({
        ...this.appConfig.project.options,
        ...project,
      });
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
    project.ceratePage(options || this.appConfig.project.options);
    this.project = project;
    this.update();
  };

  update = () => {
    Promise.resolve().then(() => AppService.updateView());
  };

  static registerComponent = (key: string, value: ComponentValue) => {
    AppService.components.set(key, value);
    Promise.resolve().then(() => AppService.updateView());
  };
}
