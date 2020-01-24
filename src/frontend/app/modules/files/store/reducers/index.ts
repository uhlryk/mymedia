import { createReducer, on } from "@ngrx/store";
import IResource from "../../../../../../shared/types/resource.interface";
import ITag from "../../../../../../shared/types/tag.interface";
import {
    setProjectInitialData, setResourceDescription,
    setResourceOrder, setResourceRanking, setResourceTags,
    setResourceTitle
} from "../actions/index.action";

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
    on(setResourceTitle, (state, action) => {
        return Object.assign({}, state, {
            resourceList: state.resourceList.map((resource: IResource) => {
                if (resource.id === action.resourceId) {
                    return Object.assign({}, resource, { title: action.title });
                } else {
                    return resource;
                }
            }),
            tagList: state.tagList
        });
    }),
    on(setResourceDescription, (state, action) => {
        return Object.assign({}, state, {
            resourceList: state.resourceList.map((resource: IResource) => {
                if (resource.id === action.resourceId) {
                    return Object.assign({}, resource, { description: action.description });
                } else {
                    return resource;
                }
            }),
            tagList: state.tagList
        });
    }),
    on(setResourceRanking, (state, action) => {
        return Object.assign({}, state, {
            resourceList: state.resourceList.map((resource: IResource) => {
                if (resource.id === action.resourceId) {
                    return Object.assign({}, resource, { ranking: action.ranking });
                } else {
                    return resource;
                }
            }),
            tagList: state.tagList
        });
    }),
    on(setResourceTags, (state, action) => {
        return Object.assign({}, state, {
            resourceList: state.resourceList.map((resource: IResource) => {
                if (resource.id === action.resourceId) {
                    const updatedResource = Object.assign({}, resource, { tags: action.tags.slice() });
                    console.log("ppppppppppp");
                    console.log(updatedResource);
                    return updatedResource;
                } else {
                    return resource;
                }
            }),
            tagList: state.tagList
        });
    }),
    on(setResourceOrder, (state, action) => {
        return Object.assign({}, state, {
            order: action.order
        });
    })
);
