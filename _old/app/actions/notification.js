export const SHOW_NOTIFICATION = "notification.show";
export const CLOSE_NOTIFICATION = "notification.close";


export function showNotification(message, title, level) {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: {
          message,
          title,
          level: level || "info"
        }

      });
    }, 0);

    // setTimeout(() => dispatch({ type: CLOSE_NOTIFICATION }), 1000);
  };
}