import proxy from 'src/controller/util/proxy';
import { ProjectObject } from 'src/model';
import ProjectService from '../service/project';

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

  keep = (project: ProjectService) => {
    const idString = String(project.id);
    if (this.projectID.includes(idString)) {
      const index = this.projectID.findIndex(id => id === idString);
      this.projectID.splice(index, 1);
      this.projectID.push(idString);
    } else {
      this.projectID.push(idString);
    }
    const projectObject = project.toObject();
    this.projects.delete(idString);
    this.projects.set(idString, projectObject);
    this.setItem(idString, projectObject);
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
}
