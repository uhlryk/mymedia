import { createAction, props } from "@ngrx/store";
import IResource from "../../../../../../shared/types/resource.interface";

export const setResourceList = createAction(
    "SET_RESOURCE_LIST",
    props<{ resourceList: Array<IResource> }>()
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
export const setResourceTagList = createAction(
    "SET_RESOURCE_TAG_LIST",
    props<{ resourceId: string; tagIdList: Array<string> }>()
);
export const upsertResource = createAction(
    "UPSERT_RESOURCE",
    props<{ resource: IResource; }>()
);
export const executeResource = createAction(
    "EXECUTE_RESOURCE",
    props<{ resourceId: string }>()
);

export const deleteResourceFromDeleteResourceMenu = createAction(
    "DELETE_RESOURCE_FROM_DELETE_RESOURCE_MENU",
    props<{ resourceId: string }>()
);
