import IResource from "../../../../../../shared/types/resource.interface";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "../actions/index.action";

export interface UIState {
    deleteResourceMenu: {
        resourceId?: string;
        visible: boolean;
    };
    rightMenu: {
        resourceId?: string;
        visible: boolean;
    };
}

export const InitialUIState: UIState = {
    deleteResourceMenu: {
        resourceId: null,
        visible: false
    },
    rightMenu: {
        resourceId: null,
        visible: false
    }
};

export const InitialUIReducer = createReducer(
    InitialUIState,
    on(Actions.Resource.deleteResourceFromDeleteResourceMenu, (state, action) => {
        return Object.assign({}, state, {
            deleteResourceMenu: {
                resourceId: null,
                visible: false
            }
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
    })
);
