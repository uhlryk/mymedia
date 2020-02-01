import { createReducer, on } from "@ngrx/store";
import uuid from "uuidv4";
import IResource from "../../../../../../shared/types/resource.interface";
import ITag from "../../../../../../shared/types/tag.interface";
import * as Actions from "../actions/index.action";

export const projectFeatureKey = "project";

export interface ProjectState {
    resourceList: Array<IResource>;
    tagList: Array<ITag>;
    deleteResourceMenu: {
        resourceId?: string;
        visible: boolean;
    };
    rightMenu: {
        resourceId?: string;
        visible: boolean;
    };
    search: {
        tagIdList: Array<string>;
        text: string;
    };
    order: string;
}

export const InitialProjectState: ProjectState = {
    resourceList: [],
    tagList: [],
    deleteResourceMenu: {
        resourceId: null,
        visible: false
    },
    rightMenu: {
        resourceId: null,
        visible: false
    },
    search: {
        tagIdList: [],
        text: ""
    },
    order: "NAME_ASC"
};

export const InitialProjectReducer = createReducer(
    InitialProjectState,
    on(Actions.Project.setProjectInitialData, (state, action) => {
        return Object.assign({}, InitialProjectState, {
            resourceList: action.resourceList,
            tagList: action.tagList
        });
    }),
    on(Actions.Tag.createTag, (state, action) => {
        return Object.assign({}, state, {
            tagList: state.tagList.concat({
                id: uuid(),
                name: action.name
            })
        });
    }),
    on(Actions.Tag.setTagName, (state, action) => {
        return Object.assign({}, state, {
            tagList: state.tagList.map((tag: ITag) => {
                if (tag.id === action.tagId) {
                    return Object.assign({}, tag, { name: action.name });
                } else {
                    return tag;
                }
            })
        });
    }),
    on(Actions.Tag.removeTag, (state, action) => {
        return Object.assign({}, state, {
            tagList: state.tagList.filter((tag: ITag) => tag.id !== action.tagId)
        });
    }),
    on(Actions.Resource.setResourceTitle, (state, action) => {
        return Object.assign({}, state, {
            resourceList: state.resourceList.map((resource: IResource) => {
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
            resourceList: state.resourceList.map((resource: IResource) => {
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
            resourceList: state.resourceList.map((resource: IResource) => {
                if (resource.id === action.resourceId) {
                    return Object.assign({}, resource, { ranking: action.ranking });
                } else {
                    return resource;
                }
            })
        });
    }),
    on(Actions.Resource.setResourceTags, (state, action) => {
        return Object.assign({}, state, {
            resourceList: state.resourceList.map((resource: IResource) => {
                if (resource.id === action.resourceId) {
                    const updatedResource = Object.assign({}, resource, {
                        tags: action.tags.slice()
                    });
                    return updatedResource;
                } else {
                    return resource;
                }
            })
        });
    }),
    on(Actions.Resource.deleteResourceFromDeleteResourceMenu, (state, action) => {
        return Object.assign({}, state, {
            resourceList: state.resourceList.map((resource: IResource) => {
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
            resourceList: state.resourceList.map((resource: IResource) => {
                if (resource.id === action.resourceId) {
                    const list: Array<string> = (resource.thumbnailList || []).slice();

                    list[action.index] = action.thumbnail;
                    const updatedResource = Object.assign({}, resource, {
                        thumbnailList: list
                    });
                    return updatedResource;
                } else {
                    return resource;
                }
            })
        });
    }),
    on(Actions.Order.setResourceOrder, (state, action) => {
        return Object.assign({}, state, {
            order: action.order
        });
    }),
    on(Actions.UI.showDeleteResourceMenu, (state, action) => {
        return Object.assign({}, state, {
            deleteResourceMenu: {
                resourceId: action.resourceId,
                visible: true
            }
        });
    }),
    on(Actions.UI.hideDeleteResourceMenu, (state, action) => {
        return Object.assign({}, state, {
            deleteResourceMenu: {
                resourceId: null,
                visible: false
            }
        });
    }),
    on(Actions.UI.showRightMenu, (state, action) => {
        return Object.assign({}, state, {
            rightMenu: {
                resourceId: action.resourceId,
                visible: true
            }
        });
    }),
    on(Actions.UI.hideRightMenu, (state, action) => {
        return Object.assign({}, state, {
            rightMenu: {
                resourceId: null,
                visible: false
            }
        });
    }),
    on(Actions.Search.setSearchTags, (state, action) => {
        return Object.assign({}, state, {
            search: Object.assign({}, state.search, {
                tagIdList: action.tagIdList
            })
        });
    }),
    on(Actions.Search.setSearchText, (state, action) => {
        return Object.assign({}, state, {
            search: Object.assign({}, state.search, {
                text: action.text
            })
        });
    })
);
