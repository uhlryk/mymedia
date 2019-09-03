export const CHANGE_RESOURCE_PATH = "filters.change_resource_path";


export function changeResourcePath(resourcePath) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_RESOURCE_PATH,
      payload: {
        resourcePath
      }
    });
  };
}
