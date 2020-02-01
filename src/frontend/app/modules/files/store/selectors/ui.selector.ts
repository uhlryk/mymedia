import { createSelector } from "@ngrx/store";
import { projectFeatureSelector } from "./project.selector";
import { ProjectState } from "../reducers/index.reducer";

export const uiSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.ui
);
export const deleteResourceMenuSelector = createSelector(
    uiSelector,
    (ui: {deleteResourceMenu}) => ui.deleteResourceMenu
);
export const rightMenuSelector = createSelector(
    uiSelector,
    (ui: {rightMenu}) => ui.rightMenu
);

export const rightMenuResourceIdSelector = createSelector(
    rightMenuSelector,
    (rightMenu: { resourceId: string; visible: boolean }) => rightMenu.resourceId
);
export const rightMenuVisibleSelector = createSelector(
    rightMenuSelector,
    (rightMenu: { resourceId: string; visible: boolean }) => rightMenu.visible
);
