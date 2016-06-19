export const SHOW_NOTIFICATION = "notification.show";
export const CLOSE_NOTIFICATION = "notification.close";


export function showNotification(message, title, level) {
  return (dispatch, getState) => {
    dispatch({
      type: SHOW_NOTIFICATION,
      message,
      title,
      level: level || "info"
    });
    setTimeout(() => dispatch({ type: CLOSE_NOTIFICATION }), 1000);
  };
}
