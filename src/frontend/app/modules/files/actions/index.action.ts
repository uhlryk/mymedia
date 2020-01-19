import { createAction, props } from "@ngrx/store";
import IResource from "../../../../../shared/types/resource.interface";
import ITag from "../../../../../shared/types/tag.interface";

export const setProjectInitialData = createAction(
    "SET_PROJECT_INIT_DATA",
    props<{ resourceList: Array<IResource>; tagList: Array<ITag> }>()
);

export const setResourceOrder = createAction(
    "SET_RESOURCE_ORDER",
    props<{ order: string }>()
);
