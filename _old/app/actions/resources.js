import { save } from "./index";
import { showNotification } from "./notification";
import { showLoader, hideLoader } from "./loader";
export const ADD_NEW_BULK_FILES = "file_list.bulk_new_add";
export const LOAD_RESOURCES = "resources.load_resources";
export const UPDATE_RESOURCE = "resources.update_resource";
export const ADD_RESOURCE = "resources.add_resource";
import uuid from "uuid-v4";

export function addFiles(list) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_BULK_FILES,
      payload: {
        list
      }
    });
  };
}

export function loadResources(list) {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_RESOURCES,
      payload: {
        list
      }

    });
  };
}

export function addResource(resource) {
  return async (dispatch, getState, extensionManager) => {
    dispatch(showLoader("creating resource"));
    const resourceId = uuid();
    resource.id = resourceId;
    resource = await extensionManager.projects.onBeforeCreate(resource);
    resource = await extensionManager.attributes.onBeforeCreate(resource);
    resource = await extensionManager.projects.onPostBeforeCreate(resource);
    dispatch({
      type: ADD_RESOURCE,
      payload: {
        ...resource,
      }
    });
    await extensionManager.projects.onAfterCreate(resourceId);
    await extensionManager.attributes.onAfterCreate(resourceId);
    dispatch(await save());
    dispatch(hideLoader());
    dispatch(showNotification("Resource created with great success", "great success"));

  };
}

export function updateResource(resourceId, resource) {
  return async (dispatch, getState, extensionManager) => {
    dispatch(showLoader("updating resource"));
    resource.id = resourceId;
    resource = await extensionManager.projects.onBeforeUpdate(resource);
    resource = await extensionManager.attributes.onBeforeUpdate(resource);
    resource = await extensionManager.projects.onPostBeforeUpdate(resource);
    dispatch({
      type: UPDATE_RESOURCE,
      payload: {
        ...resource
      }
    });
    await extensionManager.projects.onAfterUpdate(resourceId);
    await extensionManager.attributes.onAfterUpdate(resourceId);
    dispatch(await save());
    dispatch(hideLoader());
    dispatch(showNotification("Resource updated", "success"));
  };
}