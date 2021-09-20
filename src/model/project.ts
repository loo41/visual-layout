import { AppService, PageService, ProjectOptions } from 'src/controller';
import { App, ProjectObject } from '.';
export default class Project {
  protected pages: { [key: string]: PageService } = {};
  public _idx: number = 1;
  public currentId?: string;
  public name: string = '';
  public description: string = '';
  public id: string = String(App.idx);

  constructor(options?: ProjectObject & ProjectOptions) {
    if (options) {
      const {
        id,
        currentId,
        idx,
        name,
        description,
        pages,
        selectStyle,
        previewStyle,
      } = options;
      this.idx = idx;
      this.id = id;
      this.currentId = currentId;
      this.name = name || '';
      this.description = description || '';
      this.pages = Object.entries(pages).reduce((pages, [key, value]) => {
        pages[key] = new PageService({
          ...value,
          selectStyle,
          previewStyle,
          update: this.update,
        });
        return pages;
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
