import {createAction, props} from "@ngrx/store";

export const createTag = createAction("CREATE_TAG", props<{ name: string }>());
export const setTagName = createAction(
    "SET_TAG_NAME",
    props<{ tagId: string; name: string }>()
);
export const removeTag = createAction("REMOVE_TAG", props<{ tagId: string }>());


