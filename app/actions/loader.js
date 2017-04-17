export const SHOW_LOADER = "loader.show";
export const CLOSE_LOADER = "loader.close";


export function showLoader(message) {
  return (dispatch, getState) => {
    dispatch({
      type: SHOW_LOADER,
      payload: {
        message
      }
    });
  };
}

export function hideLoader() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_LOADER
    });
  };
}
