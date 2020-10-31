import { createSelector } from "@ngrx/store";
import { projectFeatureSelector } from "./project.selector";
import { ProjectState } from "../reducers/index.reducer";
import {UIState} from "../reducers/ui.reducer";

export const uiSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.ui
);
export const deleteResourceMenuSelector = createSelector(
    uiSelector,
    (ui: UIState) => ui.deleteResourceMenu
);
export const deleteTagMenuSelector = createSelector(
    uiSelector,
    (ui: UIState) => ui.deleteTagMenu
);
export const rightMenuSelector = createSelector(
    uiSelector,
    (ui: UIState) => ui.rightMenu
);

export const rightMenuResourceIdSelector = createSelector(
    rightMenuSelector,
    (rightMenu: { resourceId: string; visible: boolean }) => rightMenu.resourceId
);
export const rightMenuVisibleSelector = createSelector(
    rightMenuSelector,
    (rightMenu: { resourceId: string; visible: boolean }) => rightMenu.visible
);

export const tagsManagerSelector = createSelector(
    uiSelector,
    (ui: UIState) => ui.tagsManager
);
export const tagsManagerVisibleSelector = createSelector(
    tagsManagerSelector,
    (tagsManager: { visible: boolean }) => tagsManager.visible
);
