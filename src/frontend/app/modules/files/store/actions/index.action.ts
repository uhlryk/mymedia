import { createAction, props } from "@ngrx/store";
import IResource from "../../../../../../shared/types/resource.interface";
import ITag from "../../../../../../shared/types/tag.interface";

export const setProjectInitialData = createAction(
    "SET_PROJECT_INIT_DATA",
    props<{ resourceList: Array<IResource>; tagList: Array<ITag> }>()
);

export const setResourceOrder = createAction(
    "SET_RESOURCE_ORDER",
    props<{ order: string }>()
);

export const setResourceTitle = createAction(
    "SET_RESOURCE_TITLE",
    props<{ resourceId: string; title: string }>()
);
export const setResourceDescription = createAction(
    "SET_RESOURCE_DESCRIPTION",
    props<{ resourceId: string; description: string }>()
);
export const setResourceRanking = createAction(
    "SET_RESOURCE_RANKING",
    props<{ resourceId: string; ranking: number }>()
);
export const setResourceTags = createAction(
    "SET_RESOURCE_TAGS",
    props<{ resourceId: string; tags: Array<string> }>()
);
export const addResourceThumbnail = createAction(
    "SET_RESOURCE_THUMBNAILS",
    props<{ resourceId: string; index: number, thumbnail: string }>()
);
