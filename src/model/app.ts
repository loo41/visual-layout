import { Components, ProjectService } from 'src/controller';

export default class App {
  public static _idx: number = 1;
  public project!: ProjectService;
  public static components: Components = new Map();

  static get idx() {
    return App._idx++;
  }

  static set idx(idx: number) {
    App._idx = idx;
  }
}
