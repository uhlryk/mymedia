import {createAction, props} from "@ngrx/store";

export const setSearchTags = createAction(
    "SET_SEARCH_TAGS",
    props<{ tagIdList: Array<string> }>()
);
export const setSearchText = createAction("SET_SEARCH_TEXT", props<{ text: string }>());
export const addSearchTag = createAction("ADD_SEARCH_TAG", props<{ tagId: string }>());
export const removeSearchTag = createAction(
    "REMOVE_SEARCH_TAG",
    props<{ tagId: string }>()
);
