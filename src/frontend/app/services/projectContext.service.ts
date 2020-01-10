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

    getResourceCollectionModel(): ResourceCollectionModel {
        return this.getProjectModel().getResourceCollectionModel();
    }

    public openResource(resourceId: string) {
        const resource: IResource = this._project.resourceList.find((resource: IResource) => resource.id === resourceId);
        IpcProvider.trigger(IpcProviderResourceEnums.EXECUTE_RESOURCE, {
            filePath: resource.filePath
        });
    }

    setResourceTagList(resourceId, tagList: Array<TagModel>) {
        const tagModelList: Array<TagModel> = tagList.map((tag: TagModel) => {
            return this.getProjectTagModelById(tag.id);
        });
        this.getProjectModel()
            .getResourceCollectionModel()
            .getResourceModelById(resourceId)
            .setTagModelList(tagModelList);
    }

    public createProjectTag(tagName) {
        this._project = Object.assign({}, this._project, {
            tagList: (this._project.tagList || []).concat({
                id: uuid(),
                name: tagName
            })
        });
        this.saveProject();
    }

    public renameProjectTag(tagId, tagName) {
        this._project = Object.assign({}, this._project, {
            tagList: this._project.tagList.map((tag: ITag) => {
                if (tag.id === tagId) {
                    return Object.assign({}, tag, {
                        name: tagName
                    });
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

    getProjectTagList(): Array<TagModel> {
        const tagCollectionModel: TagCollectionModel = this.getProjectModel().getTagCollectionModel();
        if (tagCollectionModel) {
            return tagCollectionModel.getList();
        }
        return [];
    }

    getProjectTagModelById(tagId: string): TagModel {
        return this.getProjectModel()
            .getTagCollectionModel()
            .getTagModelById(tagId);
    }

    getProjectTagModelByName(tagName: string): TagModel {
        return this.getProjectModel()
            .getTagCollectionModel()
            .getTagModelByName(tagName);
    }

    private async saveProject(): Promise<void> {
        await IpcProvider.request(IpcProviderResourceEnums.SAVE_PROJECT, {
            project: this._project
        });
        this.triggerChange();
    }
    // saveProject(): Observable<null> {
    //     return Observable.create(async observable => {
    //         await this.getProjectModel().save();
    //         this._ngZone.run(() => {
    //             observable.next();
    //             observable.complete();
    //         });
    //         this.triggerChange();
    //     });
    // }

    triggerChange() {
        this.subject.next(this._project);
    }
}
