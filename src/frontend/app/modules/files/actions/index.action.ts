import { createAction, props } from "@ngrx/store";
import IResource from "../../../../../shared/types/resource.interface";
import ITag from "../../../../../shared/types/tag.interface";

export const projectInitDataReady = createAction(
    "PROJECT_INIT_DATA_READY",
    props<{ resourceList: Array<IResource>; tagList: Array<ITag> }>()
);
