import { showLoader, hideLoader } from "./loader";
// import Promise from "bluebird";
import storage from "electron-json-storage";
export const LOAD_PROJECTS = "projects.bulk_project_set";

function hasProject () {
  return new Promise((resolve, reject) => {
    storage.has("projects", (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    })
  })
}

function getProject () {
  return new Promise((resolve, reject) => {
    storage.get("projects", (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    })
  })
}

function setProject (project) {
  return new Promise((resolve, reject) => {
    storage.set("projects", project, (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    })
  })
}

export function loadProjectsFromPesistence() {
  return async (dispatch, getState) => {
    try {
      dispatch(showLoader("searching projects"));
      const hasKey = await hasProject();
      if (hasKey) {
        const projects = await getProject();
        dispatch(hideLoader());
        dispatch({
          type: LOAD_PROJECTS,
          payload: {
            list: projects
          }
        });
      } else {
        dispatch(hideLoader());
      }
      dispatch(hideLoader());
    } catch (err) {
      console.log(err);
    }
  }
}

export function saveProjects(project) {
  return async (dispatch, getState) => {
    try {
      if (!project.isHidden) {
        const mappedProject = {
          name: project.name,
          path: project.path,
          projectExtensionName: project.projectExtensionName
        };
        const projects = getState().projects.filter(_project => _project.path !== mappedProject.path);
        projects.push(mappedProject);
        await setProject(projects);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function clearProjects() {
  return async (dispatch, getState) => {
    dispatch(showLoader("clearing projects"));
    await promisifiedStorage.remove("projects");
    dispatch(hideLoader());
    dispatch({
      type: LOAD_PROJECTS,
      payload: {
        list: []
      }
    });
  }
}
