import { createReducer, on } from "@ngrx/store";
import * as Actions from "../actions/index.action";

export interface OrderState {
    type: string;
}

export const InitialOrderState: OrderState = {
    type: "CREATED_DESC"
};

export const InitialOrderReducer = createReducer(
    InitialOrderState,
    on(Actions.Search.setSearchTags, (state, action) => {
        return Object.assign({}, state, {
            tagIdList: action.tagIdList
        });
    }),
    on(Actions.Order.setResourceOrder, (state, action) => {
        return Object.assign({}, state, {
            type: action.order
        });
    })
);
