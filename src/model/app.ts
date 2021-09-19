import { PagesService } from 'src/controller';

export type Components = Map<string, unknown>;

export default class App {
  public project!: PagesService;
  public static components: Map<string, unknown> = new Map();
}
