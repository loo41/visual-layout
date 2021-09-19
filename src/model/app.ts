import { ProjectService } from 'src/controller';

export type Components = Map<string, unknown>;

export default class App {
  public project!: ProjectService;
  public static components: Map<string, unknown> = new Map();
}
