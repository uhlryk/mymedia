import {
    createReducer,
    on
} from "@ngrx/store";
import IResource from "../../../../../shared/types/resource.interface";
import ITag from "../../../../../shared/types/tag.interface";
import { setProjectInitData } from "../actions/index.action";

export const projectFeatureKey = "project";

export interface ProjectState {
    resourceList: Array<IResource>;
    tagList: Array<ITag>;
    search: {
        tagIdList: Array<string>;
        text: string;
    };
}

export const InitialProjectState: ProjectState = {
    resourceList: [],
    tagList: [],
    search: {
        tagIdList: [],
        text: null
    }
};

export const InitialProjectReducer = createReducer(
    InitialProjectState,
    on(setProjectInitData, (state, action) => {
        return {
            resourceList: action.resourceList,
            tagList: action.tagList,
            search: InitialProjectState.search
        };
    })
);
