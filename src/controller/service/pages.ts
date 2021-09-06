import { Pages } from 'src/model';
import PageService from './page';
import Keyboard from '../keyboard-event';
import { Options } from '../const';

export default class PagesService extends Pages {
  constructor() {
    super();
    new Keyboard(this);
  }
  public updateView: () => void = () => {};
  init(setRefresh: () => void) {
    this.updateView = setRefresh;
  }
  getPages() {
    return this.pages;
  }
  setPages(id: string) {
    this.currentId = id;
    this.update();
  }
  cerate(
    options: Partial<Omit<Options, 'id' | 'update' | 'page'>> &
      Omit<Options, 'id' | 'update' | 'name'>,
  ) {
    const id = `Page${this.idx}`;
    Reflect.set(
      this.pages,
      id,
      new PageService({
        id,
        update: this.update,
        name: options.name || id,
        selectStyle: options.selectStyle || [],
        page: options.page,
        previewStyle: options.previewStyle || [],
      }),
    );
    this.currentId = id;
    this.idx++;
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
    Promise.resolve().then(() => this.updateView());
  };
  getCurrentPage = (): PageService => {
    return Object.values(this.pages).filter(({ id }) => id === this.currentId)[0];
  };
  registerComponents = (components: { [props: string]: unknown }) => {
    for (const [key, value] of Object.entries(components)) {
      this.components.set(key, value);
    }
  };
}
