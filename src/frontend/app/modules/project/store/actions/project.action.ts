import { createAction, props } from "@ngrx/store";

export const setProjectList = createAction(
    "SET_PROJECT_LIST",
    props<{ list: Array<string> }>()
);
// export const setResourceDescription = createAction(
//     "SET_RESOURCE_DESCRIPTION",
//     props<{ resourceId: string; description: string }>()
// );
// export const setResourceRanking = createAction(
//     "SET_RESOURCE_RANKING",
//     props<{ resourceId: string; ranking: number }>()
// );
// export const setResourceTags = createAction(
//     "SET_RESOURCE_TAGS",
//     props<{ resourceId: string; tags: Array<string> }>()
// );
// export const addResourceThumbnail = createAction(
//     "SET_RESOURCE_THUMBNAILS",
//     props<{ resourceId: string; index: number; thumbnail: string }>()
// );
//
// export const executeResource = createAction(
//     "EXECUTE_RESOURCE",
//     props<{ resourceId: string }>()
// );
//
// export const deleteResourceFromDeleteResourceMenu = createAction(
//     "DELETE_RESOURCE_FROM_DELETE_RESOURCE_MENU",
//     props<{ resourceId: string }>()
// );
