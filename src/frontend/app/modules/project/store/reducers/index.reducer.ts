import { createReducer, on } from "@ngrx/store";
import * as Actions from "../actions/index.action";
import { IProjectListElement } from "../../../../../../shared/types/project-list.interface";

export const projectListFeatureKey = "project-list";

export interface ProjectListState {
    list: Array<IProjectListElement>;
}
export const InitialProjectListState: ProjectListState = {
    list: []
};

export const InitialResourceReducer = createReducer(
    InitialProjectListState,
    on(Actions.Project.setProjectList, (state, action) => {
        return Object.assign({}, InitialProjectListState, {
            list: action.list
        });
    }),
    on(Actions.Project.deleteProjectFromProjectList, (state, action) => {
        return Object.assign({}, InitialProjectListState, {
            list: state.list.filter(project => project.id !== action.id)
        });
    })
);
