import {createSelector} from "@ngrx/store";
import {projectFeatureSelector} from "./project.selector";
import {ProjectState} from "../reducers/index.reducer";

export const orderSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.order
);
