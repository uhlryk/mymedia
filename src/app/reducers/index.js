import * as Actions from '../actions/index.js';
import * as Pages from '../pages';

export default function(state= {}, action) {
  switch(action.type) {
    case Actions.SELECT_COLLECTION:
      return {
        page: Pages.COLLECTION_LIST
      }
    case Actions.OPEN_COLLECTION:
      return {
        page: Pages.LOADER,
        collection: {
          directory: action.directory
        }
      }
    default :
      return state;
  }
};
