import { Components, ProjectService } from 'src/controller';

export default class App {
  public project!: ProjectService;
  public static components: Components = new Map();
}
