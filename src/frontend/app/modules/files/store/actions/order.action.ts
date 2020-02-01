import {createAction, props} from "@ngrx/store";

export const setResourceOrder = createAction(
    "SET_RESOURCE_ORDER",
    props<{ order: string }>()
);
