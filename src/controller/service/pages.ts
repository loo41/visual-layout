import { PageObject, Pages, ProjectObject } from 'src/model';
import PageService from './page';
import Keyboard from '../keyboard-event';
import AppService, { defaultOptions } from './app';
import { Options } from 'src/controller';

export default class PagesService extends Pages {
  constructor(options?: ProjectObject) {
    super();
    new Keyboard(this);
    if (options) {
      const { ID, currentId, idx, name, description, pages } = options;
      this.ID = ID;
      this.currentId = currentId;
      Pages.idx = idx;
      this.name = name || '';
      this.description = description || '';
      this.pages = Object.entries(pages).reduce((projects, [key, value]) => {
        projects[key] = new PageService({
          ...value,
          selectStyle: defaultOptions.selectStyle,
          previewStyle: defaultOptions.previewStyle,
          update: this.update,
        });
        return projects;
      }, {} as { [props: string]: PageService });
    }
  }

  getPages() {
    return this.pages;
  }

  setPages(id: string) {
    this.currentId = id;
    this.update();
  }

  ceratePage(options: Options) {
    const id = `Page${Pages.idx}`;
    Reflect.set(
      this.pages,
      id,
      new PageService({
        id,
        update: this.update,
        name: options.name || 'Page',
        selectStyle: options.selectStyle || [],
        target: options.target,
        previewStyle:
          options.previewStyle.map(option => ({
            ...option,
            isCanUse: option?.isCanUse ?? true,
          })) || [],
      }),
    );
    this.currentId = id;
    Pages.idx++;
    this.update();
  }

  delete(id: string) {
    // delete page === current page
    if (id === this.currentId) {
      const pagesKey = Object.keys(this.pages);
      const currentPageIndex = pagesKey.findIndex(key => key === id);
      if (currentPageIndex !== -1) {
        this.currentId =
          pagesKey[
            currentPageIndex > 0 ? currentPageIndex - 1 : currentPageIndex + 1
          ];
      }
    }
    Reflect.deleteProperty(this.pages, id);
    this.update();
  }

  update = () => {
    Promise.resolve().then(() => AppService.updateView());
  };

  updateName = (name: string) => {
    this.name = name;
  };

  updateDescription = (description: string) => {
    this.description = description;
  };

  getCurrentPage = (): PageService => {
    return Object.values(this.pages).filter(({ id }) => id === this.currentId)[0];
  };

  toObject = (): ProjectObject => {
    return {
      idx: Pages.idx,
      currentId: this.currentId,
      ID: this.ID,
      name: this.name,
      description: this.description,
      pages: Object.entries(this.pages).reduce((projects, [key, value]) => {
        projects[key] = value.toObject();
        return projects;
      }, {} as { [props: string]: PageObject }),
    };
  };
}
