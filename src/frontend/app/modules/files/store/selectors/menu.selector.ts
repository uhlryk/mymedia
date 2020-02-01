import {createSelector} from "@ngrx/store";
import {projectFeatureSelector} from "./project.selector";
import {ProjectState} from "../reducers/index.reducer";

export const deleteResourceMenuSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.deleteResourceMenu
);
export const rightMenuSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.rightMenu
);

export const rightMenuResourceIdSelector = createSelector(
    rightMenuSelector,
    (rightMenu: { resourceId: string; visible: boolean }) => rightMenu.resourceId
);
export const rightMenuVisibleSelector = createSelector(
    rightMenuSelector,
    (rightMenu: { resourceId: string; visible: boolean }) => rightMenu.visible
);
