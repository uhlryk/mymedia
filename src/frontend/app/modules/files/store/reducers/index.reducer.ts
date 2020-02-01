import { combineReducers, createReducer, on, ActionReducerMap } from "@ngrx/store";
import { InitialResourceReducer, ResourceState } from "./resource.reducer";
import { InitialTagReducer, TagState } from "./tag.reducer";
import { InitialUIReducer, UIState } from "./ui.resourcer";
import { InitialSearchReducer, SearchState } from "./search.reducer";
import { InitialOrderReducer, OrderState } from "./order.reducer";
export const projectFeatureKey = "project";

export interface ProjectState {
    resourceList: ResourceState;
    tagList: TagState;
    ui: UIState;
    search: SearchState;
    order: OrderState;
}

export const InitialProjectReducer: ActionReducerMap<ProjectState> = {
    resourceList: InitialResourceReducer,
    tagList: InitialTagReducer,
    ui: InitialUIReducer,
    search: InitialSearchReducer,
    order: InitialOrderReducer,
};

