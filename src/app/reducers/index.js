import * as Actions from '../actions/index.js';
import * as Pages from '../pages';

export default function(state= {}, action) {
  switch(action.type) {
    case Actions.SELECT_COLLECTION:
      return {
        page: Pages.COLLECTION_LIST
      }
    case Actions.INIT_READ_COLLECTION:
      return {
        page: Pages.LOADER,
        collection: {
          directory: action.directory
        }
      }
    case Actions.FINISH_READ_COLLECTION:
      return {
        page: Pages.MEDIA_LIST,
        collection: Object.assign({
          files: action.files
        }, state.collection)
      }
    default :
      return state;
  }
};
