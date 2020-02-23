import { createAction, props } from "@ngrx/store";
import ITag from "../../../../../../shared/types/tag.interface";

export const setTagList = createAction("SET_TAG_LIST", props<{ tagList: Array<ITag> }>());
export const createTag = createAction("CREATE_TAG", props<{ name: string }>());
export const setTagName = createAction(
    "SET_TAG_NAME",
    props<{ tagId: string; name: string }>()
);
export const removeTag = createAction("REMOVE_TAG", props<{ tagId: string }>());
