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
        text: null
    },
    order: "NAME_ASC"
};

export const InitialProjectReducer = createReducer(
    InitialProjectState,
    on(setProjectInitialData, (state, action) => {
        return {
            resourceList: action.resourceList,
            tagList: action.tagList,
            search: InitialProjectState.search,
            order: InitialProjectState.order
        };
    }),
    on(setResourceOrder, (state, action) => {
        return {
            resourceList: state.resourceList,
            tagList: state.tagList,
            search: state.search,
            order: action.order
        };
    })
);
