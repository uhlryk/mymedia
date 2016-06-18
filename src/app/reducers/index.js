import * as Actions from "../actions/index.js";

export default function(state= {}, action) {
  switch(action.type) {
    case Actions.SELECT_COLLECTION:
      return {};
    case Actions.SET_COLLECTION_PATH:
      return {
        collection: {
          directory: action.directory
        }
      };
    case Actions.SET_FILE_LIST:
      return {
        collection: Object.assign({
          files: action.files
        }, state.collection)
      };
    default :
      return state;
  }
};
