import {createSelector} from "@ngrx/store";
import {projectFeatureSelector} from "./project.selector";
import {ProjectState} from "../reducers/index.reducer";
import {OrderState} from "../reducers/order.reducer";

export const orderSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.order
);

export const typeSelector = createSelector(orderSelector, (order: OrderState) => order.type)
