import proxy from 'src/controller/util/proxy';
import { ProjectObject } from 'src/model';
import PagesService from '../service/pages';

const PROJECT_IDS = 'projectIds';

export default class AppStorage {
  public projectID: string[] = [];
  public projects: Map<string, ProjectObject> = new Map();

  constructor() {
    this.init();
  }

  init = () => {
    try {
      const ids = this.getItem(PROJECT_IDS);
      if (ids) {
        const projectIds = JSON.parse(ids);
        Array.isArray(projectIds) &&
          projectIds.forEach(id => {
            this.projectID.push(id);
            const projectString = this.getItem(id);
            if (typeof projectString === 'string') {
              const projectObject: ProjectObject = JSON.parse(projectString);
              this.projects.set(id, projectObject);
            }
          });
      }
      this.projectID = proxy(
        this.projectID,
        () => {},
        () => {
          this.setItem(
            PROJECT_IDS,
            this.projectID.filter(_ => _),
          );
        },
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  keep = (project: PagesService) => {
    this.projectID.push(project.ID);
    const projectObject = project.toObject();
    this.projects.set(project.ID, projectObject);
    this.setItem(project.ID, projectObject);
  };

  setItem<T>(id: string, data: T) {
    localStorage.setItem(id, JSON.stringify(data));
  }

  removeItem(id: string) {
    localStorage.removeItem(id);

    if (this.projects.has(id)) {
      this.projects.delete(id);
    }

    if (this.projectID.includes(id)) {
      const index = this.projectID.findIndex(projectID => projectID === id);
      this.projectID.splice(index, 1);
    }
  }

  getItem(id: string): string | null {
    return localStorage.getItem(id);
  }

  delete = (id: string) => {
    this.removeItem(id);
  };

  get = (id: string) => {
    return this.projects.get(id);
  };

  getHistoryProject = (): ProjectObject | false | undefined => {
    const projectId = Array.from(this.projectID).pop();
    return typeof projectId === 'string' && this.projects.get(projectId);
  };
}
