import { createReducer, on } from "@ngrx/store";
import uuid from "uuidv4";
import * as Actions from "../actions/index.action";
import ITag from "../../../../../../shared/types/tag.interface";

export interface TagState {
    list: Array<ITag>;
}

export const InitialTagState: TagState = {
    list: []
};

export const InitialTagReducer = createReducer(
    InitialTagState,
    on(Actions.Project.setProjectInitialData, (state, action) => {
        return Object.assign({}, InitialTagState, {
            list: action.tagList
        });
    }),
    on(Actions.Tag.createTag, (state, action) => {
        return Object.assign({}, InitialTagState, {
            list: state.list.concat({
                id: uuid(),
                name: action.name
            })
        });
    }),
    on(Actions.Tag.setTagName, (state, action) => {
        return Object.assign({}, state, {
            list: state.list.map((tag: ITag) => {
                if (tag.id === action.tagId) {
                    return Object.assign({}, tag, { name: action.name });
                } else {
                    return tag;
                }
            })
        });
    }),
    on(Actions.Tag.removeTag, (state, action) => {
        return Object.assign({}, InitialTagState, {
            list: state.list.filter((tag: ITag) => tag.id !== action.tagId)
        });
    })
);
