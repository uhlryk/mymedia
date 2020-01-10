import uuid from "uuidv4";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { NgZone } from "@angular/core";
import ProjectModel from "../models/project.model";
import ResourceCollectionModel from "../models/resource.collection.model";
import ResourceModel from "../models/resource.model";
import TagModel from "../models/tag.model";
import IpcProvider from "../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../shared/IpcProviderResourceEnums";
import TagCollectionModel from "../models/tag.collection.model";
import IProject from "../../../shared/types/project.interface";
import ITag from "../../../shared/types/tag.interface";
import IResource from "../../../shared/types/resource.interface";

@Injectable()
export class ProjectContextService {
    private _project: IProject;
    private subject = new BehaviorSubject<any>(null);

    constructor(private _ngZone: NgZone) {}
    public async loadProject(): Promise<IProject> {
        const project: IProject = await IpcProvider.request(
            IpcProviderResourceEnums.LOAD_PROJECT
        );
        if (project) {
            this._project = project;
            this.triggerChange();
            return project;
        } else {
            return null;
        }
    }

    public listenProjectChange(): Observable<IProject> {
        return this.subject.asObservable();
    }

    setProjectPath(): Promise<boolean> {
        return this.getProjectModel().setProjectPath();
    }
    getProjectPath(): Promise<string> {
        return this.getProjectModel().getProjectPath();
    }

    listenNewProject(): Observable<void> {
        return Observable.create(async observable => {
            IpcProvider.listen(IpcProviderResourceEnums.TRIGGER_SET_PROJECT, () => {
                this._ngZone.run(() => {
                    observable.next();
                });
            });
        });
    }
    listenOpenTagsManager(): Observable<void> {
        return Observable.create(async observable => {
            IpcProvider.listen(IpcProviderResourceEnums.TRIGGER_TAGS_MANAGER, () => {
                this._ngZone.run(() => {
                    observable.next();
                });
            });
        });
    }
    getProjectModel(): ProjectModel {
        return ProjectModel.getInstance();
    }

    createProject(): Observable<boolean> {
        return Observable.create(async observable => {
            await this.getProjectModel().createProject();

            this._ngZone.run(() => {
                observable.next(true);
                observable.complete();
            });
        });
    }

    getResourceModel(resourceId: string): ResourceModel {
        return this.getProjectModel()
            .getResourceCollectionModel()
            .getResourceModelById(resourceId);
    }

    public openResource(resourceId: string) {
        const selectedResource: IResource = this._project.resourceList.find(
            (resource: IResource) => resource.id === resourceId
        );
        IpcProvider.trigger(IpcProviderResourceEnums.EXECUTE_RESOURCE, {
            filePath: selectedResource.filePath
        });
    }

    public createProjectTag(tagDiff: Omit<ITag, "id">) {
        this._project = Object.assign({}, this._project, {
            tagList: (this._project.tagList || []).concat({
                id: uuid(),
                ...tagDiff
            })
        });
        this.saveProject();
    }

    public changeProjectTag(tagId, tagDiff: Partial<Omit<ITag, "id">>) {
        this._project = Object.assign({}, this._project, {
            tagList: this._project.tagList.map((tag: ITag) => {
                if (tag.id === tagId) {
                    return Object.assign({}, tag, tagDiff);
                } else {
                    return tag;
                }
            })
        });
        this.saveProject();
    }
    public removeProjectTag(tagId) {
        this._project = Object.assign({}, this._project, {
            tagList: this._project.tagList.filter((tag: ITag) => tag.id !== tagId),
            resourceList: this._project.resourceList.map((resource: IResource) => {
                if (resource.tags.includes(tagId)) {
                    return Object.assign({}, resource, {
                        tags: resource.tags.filter(
                            (resourceTagId: string) => resourceTagId !== tagId
                        )
                    });
                } else {
                    return resource;
                }
            })
        });
        this.saveProject();
    }

    private saveProject(): void {
        IpcProvider.trigger(IpcProviderResourceEnums.SAVE_PROJECT, {
            project: this._project
        });
        this.triggerChange();
    }

    private triggerChange() {
        this.subject.next(this._project);
    }
}
