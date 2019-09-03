export default {
  createThunk (logger = console, extraArgument) {
    return ({dispatch, getState}) => next => action => {
      try {
        if (typeof action === "function") {
          const result = action(dispatch, getState, extraArgument);
          if (result && result.catch) {
            result
              .catch(err => {
                logger.error(err);
              });
          }
          return result;
        }

        return next(action);
      } catch (err) {
        logger.error(err);
        throw err
      }
    }
  }
}
