import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { NgZone } from "@angular/core";
import ProjectModel from "../models/project.model";
import ResourceCollectionModel from "../models/resource.collection.model";
import ResourceModel from "../models/resource.model";
import TagModel from "../models/tag.model";
import IpcProvider from "../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../shared/IpcProviderResourceEnums";
import TagCollectionModel from "../models/tag.collection.model";

@Injectable()
export class ProjectContextService {
    private subject = new Subject<any>();

    constructor(private _ngZone: NgZone) {}
    loadProject(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const isProjectExist = await this.getProjectModel().loadProject();
            this.triggerChange();
            if (isProjectExist) {
                resolve();
            } else {
                reject();
            }
        });
    }

    projectChange(): Observable<ProjectModel> {
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

    openResource(resourceId: string) {
        this.getProjectModel().open(resourceId);
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

    removeProjectTag(tagId) {
        this.getProjectModel()
            .getResourceCollectionModel()
            .removeAllResourceTagModel(tagId);
        this.getProjectModel()
            .getTagCollectionModel()
            .removeTagModelById(tagId);
    }

    createProjectTag(tagName) {
        this.getProjectModel()
            .getTagCollectionModel()
            .addTagModel(TagModel.create(tagName));
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

    saveProject(): Observable<null> {
        return Observable.create(async observable => {
            await this.getProjectModel().save();
            this._ngZone.run(() => {
                observable.next();
                observable.complete();
            });
            this.triggerChange();
        });
    }

    triggerChange() {
        this.subject.next(this.getProjectModel());
    }
}
