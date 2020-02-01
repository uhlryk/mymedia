import { createSelector } from "@ngrx/store";
import IResource from "../../../../../../shared/types/resource.interface";
import ISearch from "../../types/search.interface";
import { projectFeatureSelector } from "./project.selector";
import * as ResourceListSelector from "./resource.selector";
import { searchSelector } from "./search.selector";
import * as OrderSelector from "./order.selector";
import { ProjectState } from "../reducers/index.reducer";
import {TagState} from "../reducers/tag.reducer";

export const tagListSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.tagList
);

export const listSelector = createSelector(
    tagListSelector,
    (tagList: TagState) => tagList.list
);
