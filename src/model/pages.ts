import { PageService } from 'src/controller';

export type Components = Map<string, unknown>;
export default class Pages {
  protected pages: { [key: string]: PageService } = {};
  public idx: number = 1;
  public currentId?: string;
  public components: Map<string, unknown> = new Map();
  static readonly COMPONENT = Symbol.for('Component');
  static readonly COMPONENT_NAME = Symbol.for('Name');
  static readonly NODE_NAME = Symbol.for('Name');
}
