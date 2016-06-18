export const INIT_PROJECT = "project.init";
export const OPEN_PROJECT = "project.open";
export const CLEAR_PROJECT = "project.clear";

export function initProject(path) {
  return {
    type: INIT_PROJECT,
    path
  }
}
