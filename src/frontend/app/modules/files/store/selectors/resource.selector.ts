import {createSelector} from "@ngrx/store";
import IResource from "../../../../../../shared/types/resource.interface";
import {projectFeatureSelector} from "./project.selector";
import {ProjectState} from "../reducers/index.reducer";

export const resourceListSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.resourceList
);

export const resourceSelector = createSelector(
    resourceListSelector,
    (resourceList: Array<IResource>, props: { resourceId: string }) =>
        resourceList.find((resource: IResource) => resource.id === props.resourceId)
);
