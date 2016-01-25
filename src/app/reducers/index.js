import * as ActionTypes from '../actionTypes';
import * as Pages from '../pages';

export default function(state= {}, action) {
  switch(action.type) {
  case ActionTypes.GO_TO_COLLECTION_PAGE:
    return {
      page: Pages.COLLECTION_LIST
    }
  case ActionTypes.GO_TO_MEDIA_PAGE:
    return {
      page: Pages.MEDIA_LIST
    }
  default :
    return state;
  }
};
