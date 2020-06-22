import { createFeatureSelector, createSelector } from "@ngrx/store";
import { projectListFeatureKey, ProjectListState } from "../reducers/index.reducer";

export const projectListFeatureSelector = createFeatureSelector<ProjectListState>(
    projectListFeatureKey
);

export const listSelector = createSelector(
    projectListFeatureSelector,
    (projectList: ProjectListState) => projectList.list
);
