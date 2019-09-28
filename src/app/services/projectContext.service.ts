import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NgZone } from "@angular/core";
import ProjectModel from "../models/project.model";
import ResourceCollectionModel from "../models/resource.collection.model";
import ResourceModel from "../models/resource.model";
import TagModel from "../models/tag.model";

@Injectable()
export class ProjectContextService {
    _projectModel: ProjectModel;
    constructor(private _ngZone: NgZone) {}
    ensureInitialized(): Observable<boolean> {
        return Observable.create(async observable => {
            if(!this.getProjectModel()) {
                this._projectModel = new ProjectModel();
            }
            await this.getProjectModel().loadProject();
            this._ngZone.run(() => {
                observable.next(true);
                observable.complete();
            });
        });
    }
    setProjectPath(projectFolderPath: string): Observable<boolean> {
        return Observable.create(async observable => {
            this._projectModel = new ProjectModel();
            await this.getProjectModel().setProjectPath(projectFolderPath);

            this._ngZone.run(() => {
                observable.next(true);
                observable.complete();
            });
        });
    }

    getProjectPath(): Observable<string> {
        return Observable.create(async observable => {
            const projectPath = await this.getProjectModel().getProjectPath();

            this._ngZone.run(() => {
                observable.next(projectPath);
                observable.complete();
            });
        });
    }
    getProjectModel(): ProjectModel {
        return this._projectModel;
    }

    createProject(createSubFolderTags: boolean): Observable<boolean> {
        return Observable.create(async observable => {
            await this.getProjectModel().createProject(createSubFolderTags);

            this._ngZone.run(() => {
                observable.next(true);
                observable.complete();
            });
        });
    }

    loadProject(): Observable<boolean> {
        return Observable.create(async observable => {
            const isProject: boolean = await this.getProjectModel().loadProject();
            if (isProject) {
                this._ngZone.run(() => {
                    observable.next(true);
                    observable.complete();
                });
            } else {
                this._ngZone.run(() => {
                    observable.next(false);
                    observable.complete();
                });
            }
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

    addResourceTag(resourceId, tagId) {
        const tagModel: TagModel = this.getProjectModel()
            .getTagCollectionModel()
            .getTagModelById(tagId);
        this.getProjectModel()
            .getResourceCollectionModel()
            .getResourceModelById(resourceId)
            .addTagModel(tagModel);
    }

    removeResourceTag(resourceId, tagId) {
        this.getProjectModel()
            .getResourceCollectionModel()
            .removeResourceTagModel(resourceId, tagId);
    }

    removeProjectTag(tagId) {
        this.getProjectModel().getResourceCollectionModel().removeAllResourceTagModel(tagId);
        this.getProjectModel().getTagCollectionModel().removeTagModelById(tagId);
    }

    createProjectTag(tagName) {
        this.getProjectModel().getTagCollectionModel().addTagModel(TagModel.create(tagName));
    }

    getProjectTagList(): Array<TagModel> {
        return this.getProjectModel().getTagCollectionModel().getList();
    }

    getProjectTagModelById(tagId: string): TagModel {
        return this.getProjectModel().getTagCollectionModel().getTagModelById(tagId);
    }

    getProjectTagModelByName(tagName: string): TagModel {
        return this.getProjectModel().getTagCollectionModel().getTagModelByName(tagName);
    }

    saveProject(): Observable<null> {
        return Observable.create(async observable => {
            await this.getProjectModel().save();
            this._ngZone.run(() => {
                observable.next();
                observable.complete();
            });
        });
    }
}
