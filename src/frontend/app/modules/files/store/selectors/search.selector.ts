import {createSelector} from "@ngrx/store";
import {projectFeatureSelector} from "./project.selector";
import {ProjectState} from "../reducers/index.reducer";

export const searchSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.search
);
export const tagsSearchSelector = createSelector(
    searchSelector,
    (search: { tagIdList: Array<string>; text: string }) => search.tagIdList
);
export const textSearchSelector = createSelector(
    searchSelector,
    (search: { tagIdList: Array<string>; text: string }) => search.text
);
