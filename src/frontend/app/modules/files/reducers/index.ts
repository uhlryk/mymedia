import { createReducer, on } from "@ngrx/store";
import IResource from "../../../../../shared/types/resource.interface";
import ITag from "../../../../../shared/types/tag.interface";
import { setProjectInitialData, setResourceOrder } from "../actions/index.action";

export const projectFeatureKey = "project";

export interface ProjectState {
    resourceList: Array<IResource>;
    tagList: Array<ITag>;
    search: {
        tagIdList: Array<string>;
        text: string;
    };
    order: string;
}

export const InitialProjectState: ProjectState = {
    resourceList: [],
    tagList: [],
    search: {
        tagIdList: [],
        text: ""
    },
    order: "NAME_ASC"
};

export const InitialProjectReducer = createReducer(
    InitialProjectState,
    on(setProjectInitialData, (state, action) => {
        return Object.assign({}, InitialProjectState, {
            resourceList: action.resourceList,
            tagList: action.tagList
        });
    }),
    on(setResourceOrder, (state, action) => {
        return Object.assign({}, state, {
            order: action.order
        });
    })
);
