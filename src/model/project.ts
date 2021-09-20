import { AppService, PageService, ProjectOptions } from 'src/controller';
import { ProjectObject } from '.';
export default class Project {
  protected pages: { [key: string]: PageService } = {};
  public _idx: number = 1;
  public currentId?: string;
  public name: string = '';
  public description: string = '';
  public ID: string = `Project_${this.idx}`;

  constructor(options?: ProjectObject & ProjectOptions) {
    if (options) {
      const {
        ID,
        currentId,
        idx,
        name,
        description,
        pages,
        selectStyle,
        previewStyle,
      } = options;
      this.idx = idx;

      // set max ID
      if (this.ID < ID) {
        this.ID = ID;
      }

      this.currentId = currentId;
      this.name = name || '';
      this.description = description || '';
      this.pages = Object.entries(pages).reduce((projects, [key, value]) => {
        projects[key] = new PageService({
          ...value,
          selectStyle,
          previewStyle,
          update: this.update,
        });
        return projects;
      }, {} as { [props: string]: PageService });
    }
  }

  get idx() {
    return this._idx++;
  }

  set idx(idx: number) {
    this._idx = idx;
  }

  update = () => {
    Promise.resolve().then(() => AppService.updateView());
  };
}
