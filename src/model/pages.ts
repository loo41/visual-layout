import { PageService } from 'src/controller';

export default class Pages {
  protected pages: { [key: string]: PageService } = {};
  public idx: number = 1;
  public currentId?: string;
}
