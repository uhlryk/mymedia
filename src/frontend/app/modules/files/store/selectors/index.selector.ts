import { createFeatureSelector, createSelector } from "@ngrx/store";
import IResource from "../../../../../../shared/types/resource.interface";
import ISearch from "../../types/search.interface";
import { projectFeatureKey, ProjectState } from "../reducers/index.reducer";
export const projectFeatureSelector = createFeatureSelector<ProjectState>(
    projectFeatureKey
);

export const resourceListSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.resourceList
);

export const resourceSelector = createSelector(
    resourceListSelector,
    (resourceList: Array<IResource>, props: { resourceId: string }) =>
        resourceList.find((resource: IResource) => resource.id === props.resourceId)
);
export const searchSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.search
);
export const orderSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.order
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
export const tagListSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.tagList
);
export const listSelector = createSelector(
    resourceListSelector,
    searchSelector,
    orderSelector,
    (resourceList: Array<IResource>, search: ISearch, order: string) => {
        console.log("Selector recalculated");
        return resourceList
            .filter((resource: IResource) => {
                if (resource.title.toLowerCase().includes(search.text.toLowerCase())) {
                    if (search.tagIdList.length) {
                        return search.tagIdList.every(
                            (searchTagId: string) => !!resource.tags.includes(searchTagId)
                        );
                    }
                    return true;
                }
            })
            .sort((prev, next) => {
                switch (order) {
                    case "NAME_DESC":
                        return prev.title > next.title ? -1 : 1;
                    case "RATING_ASC":
                        return prev.ranking - next.ranking;
                    case "RATING_DESC":
                        return next.ranking - prev.ranking;
                    case "SIZE_ASC":
                        return prev.size - next.size;
                    case "SIZE_DESC":
                        return next.size - prev.size;
                    case "":
                    case "NAME_ASC":
                    default:
                        return prev.title < next.title ? -1 : 1;
                }
            })
            .map((resource: IResource) => resource.id);
    }
);
