import * as ActionTypes from '../actionTypes';
import * as Pages from '../pages';

export default function(state= {}, action) {
  switch(action.type) {
  case ActionTypes.SELECT_COLLECTION:
    return {
      page: Pages.COLLECTION_LIST
    }
  case ActionTypes.OPEN_COLLECTION:
    return {
      page: Pages.MEDIA_LIST,
      collection: {
        directory: action.directory
      }
    }
  default :
    return state;
  }
};
