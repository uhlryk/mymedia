export const SELECT_COLLECTION = 'selectCollection';
export const INIT_READ_COLLECTION = 'initReadCollection';
export const FINISH_READ_COLLECTION = 'finishReadCollection';

/**
 * start check collection directory
 * @param directory
 */
export const initReadCollection = directory => ({
  type: INIT_READ_COLLECTION,
  directory
});

/**
 * finish check collection directory
 * @param directory
 */
export const finishReadCollection = files => ({
  type: FINISH_READ_COLLECTION,
  files
});

import directoryList from '../helpers/directoryList';
export const Thunk = {
  readCollection : directory => (dispatch, getState) => {
    dispatch(initReadCollection(directory));

    directoryList(directory, (err, files) => {
      dispatch(finishReadCollection(files));
    });
  }
}
