import IResource from "../../../../../../shared/types/resource.interface";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "../actions/index.action";

export interface ResourceState {
    list: Array<IResource>;
}

export const InitialResourceState: ResourceState = {
    list: []
};

export const InitialResourceReducer = createReducer(
    InitialResourceState,
    on(Actions.Resource.setResourceList, (state, action) => {
        return Object.assign({}, InitialResourceState, {
            list: action.resourceList
        });
    }),
    on(Actions.Resource.setResourceTitle, (state, action) => {
        return Object.assign({}, state, {
            list: state.list.map((resource: IResource) => {
                if (resource.id === action.resourceId) {
                    return Object.assign({}, resource, { title: action.title });
                } else {
                    return resource;
                }
            })
        });
    }),
    on(Actions.Resource.setResourceDescription, (state, action) => {
        return Object.assign({}, state, {
            list: state.list.map((resource: IResource) => {
                if (resource.id === action.resourceId) {
                    return Object.assign({}, resource, {
                        description: action.description
                    });
                } else {
                    return resource;
                }
            })
        });
    }),
    on(Actions.Resource.setResourceRanking, (state, action) => {
        return Object.assign({}, state, {
            list: state.list.map((resource: IResource) => {
                if (resource.id === action.resourceId) {
                    return Object.assign({}, resource, {
                        ranking: action.ranking
                    });
                } else {
                    return resource;
                }
            })
        });
    }),
    on(Actions.Resource.setResourceTagList, (state, action) => {
        return Object.assign({}, state, {
            list: state.list.map((resource: IResource) => {
                if (resource.id === action.resourceId) {
                    return Object.assign({}, resource, {
                        tagIdList: action.tagIdList.slice()
                    });
                } else {
                    return resource;
                }
            })
        });
    }),
    on(Actions.Resource.deleteResourceFromDeleteResourceMenu, (state, action) => {
        return Object.assign({}, state, {
            list: state.list.filter((resource: IResource) => {
                return resource.id !== action.resourceId;
            }),
            deleteResourceMenu: {
                resourceId: null,
                visible: false
            }
        });
    }),
    on(Actions.Resource.upsertResource, (state, action) => {
        let existAndChanged: boolean = false;
        let newList = state.list.map((resource: IResource) => {
            if (resource.id === action.resource.id) {
                existAndChanged = true;
                return action.resource;
            } else {
                return resource;
            }
        });
        if (existAndChanged === false) {
            newList = newList.concat([action.resource]);
        }
        return Object.assign({}, state, {
            list: newList
        });
    })
);
