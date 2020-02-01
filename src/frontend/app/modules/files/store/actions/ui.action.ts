import {createAction, props} from "@ngrx/store";

export const showRightMenu = createAction(
    "SHOW_RIGHT_MENU",
    props<{
        resourceId: string;
    }>()
);
export const hideRightMenu = createAction("HIDE_RIGHT_MENU", props<{}>());

export const showDeleteResourceMenu = createAction(
    "SHOW_DELETE_RESOURCE_MENU",
    props<{ resourceId: string }>()
);
export const hideDeleteResourceMenu = createAction(
    "HIDE_DELETE_RESOURCE_MENU",
    props<{}>()
);
