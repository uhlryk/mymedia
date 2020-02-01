import {createFeatureSelector} from "@ngrx/store";
import { projectFeatureKey, ProjectState } from "../reducers/index.reducer";

export const projectFeatureSelector = createFeatureSelector<ProjectState>(
    projectFeatureKey
);
