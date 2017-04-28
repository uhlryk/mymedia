import { showLoader, hideLoader } from "./loader";
import storage from "electron-json-storage";

export const LOAD_PROJECTS = "projects.bulk_project_set";

export function loadProjectsFromPesistence() {
  return (dispatch, getState) => {
    // storage.remove("projects");
    dispatch(showLoader("searching projects"));
    storage.has("projects", function(error, hasKey) {
      if (hasKey) {
        storage.get("projects", function(error, projects) {
          dispatch(hideLoader());
          dispatch({
            type: LOAD_PROJECTS,
            payload: {
              list: projects
            }
          });
        });
      }  else {
        dispatch(hideLoader());
      }
    })

  }
}

export function saveProjects(project) {
  return (dispatch, getState) => {

    if(!project.isHidden) {
      const mappedProject = {
        name: project.name,
        path: project.path,
        projectExtensionName: project.projectExtensionName
      };
      const projects = getState().projects.filter(_project => _project.path !== mappedProject.path);
      projects.push(mappedProject);
      storage.set("projects", projects, function (error) {});
    }
  };
}

export function clearProjects() {
  return (dispatch, getState) => {
    dispatch(showLoader("clearing projects"));
    storage.remove("projects", function(error) {
      dispatch(hideLoader());
      dispatch({
        type: LOAD_PROJECTS,
        payload: {
          list: []
        }
      });
    });
  }
}
