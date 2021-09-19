import { PageService } from 'src/controller';
export default class Project {
  protected pages: { [key: string]: PageService } = {};
  public static idx: number = 1;
  public currentId?: string;
  public name: string = '';
  public description: string = '';
  public ID: string = `Project_${Project.idx++}`;
}
