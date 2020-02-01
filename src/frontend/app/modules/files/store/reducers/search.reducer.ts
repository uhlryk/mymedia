import { createReducer, on } from "@ngrx/store";
import * as Actions from "../actions/index.action";

export interface SearchState {
    tagIdList: Array<string>;
    text: string;
}

export const InitialSearchState: SearchState = {
    tagIdList: [],
    text: ""
};

export const InitialSearchReducer = createReducer(
    InitialSearchState,
    on(Actions.Search.setSearchTags, (state, action) => {
        return Object.assign({}, state, {
            tagIdList: action.tagIdList
        });
    }),
    on(Actions.Search.setSearchText, (state, action) => {
        return Object.assign({}, state, {
            text: action.text
        });
    })
);
