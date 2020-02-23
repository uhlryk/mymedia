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
    on(Actions.Resource.setResourceTags, (state, action) => {
        return Object.assign({}, state, {
            list: state.list.map((resource: IResource) => {
                if (resource.id === action.resourceId) {
                    return Object.assign({}, resource, {
                        tags: action.tags.slice()
                    });
                } else {
                    return resource;
                }
            })
        });
    }),
    on(Actions.Resource.deleteResourceFromDeleteResourceMenu, (state, action) => {
        return Object.assign({}, state, {
            list: state.list.map((resource: IResource) => {
                if (resource.id === action.resourceId) {
                    return Object.assign({}, resource, {
                        isRemoved: true
                    });
                } else {
                    return resource;
                }
            }),
            deleteResourceMenu: {
                resourceId: null,
                visible: false
            }
        });
    }),
    on(Actions.Resource.addResourceThumbnail, (state, action) => {
        return Object.assign({}, state, {
            list: state.list.map((resource: IResource) => {
                if (resource.id === action.resourceId) {
                    const list: Array<string> = (resource.thumbnailList || []).slice();

                    list[action.index] = action.thumbnail;
                    return Object.assign({}, resource, {
                        thumbnailList: list
                    });
                } else {
                    return resource;
                }
            })
        });
    })
);
