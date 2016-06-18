


import fileList from "../helpers/fileList";
export const Thunk = {
  startCollection : (router, path) => (dispatch, getState) => {
    dispatch({
      type: SET_COLLECTION_PATH,
      path
    });
    router.push("collection");

    fileList(path, (err, files) => {
      dispatch({
        type: SET_FILE_LIST,
        files
      });
    });
  },
  selectCollection : (router) => (dispatch, getState) => {
    dispatch({
      type: SELECT_COLLECTION
    });
    router.push("collections");
  }
}
