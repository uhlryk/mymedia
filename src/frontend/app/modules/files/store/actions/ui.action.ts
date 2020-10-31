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
export const showDeleteTagMenu = createAction(
    "SHOW_DELETE_TAG_MENU",
    props<{ tagId: string }>()
);
export const hideDeleteResourceMenu = createAction(
    "HIDE_DELETE_RESOURCE_MENU",
    props<{}>()
);
export const hideDeleteTagMenu = createAction(
    "HIDE_DELETE_TAG_MENU",
    props<{}>()
);
export const showTagsManager = createAction(
    "SHOW_TAGS_MANAGER",
    props<{}>()
);
export const hideTagsManager = createAction(
    "HIDE_TAGS_MANAGER",
    props<{}>()
);
