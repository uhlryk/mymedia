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
    setProjectPath(projectFolderPath: string): void {
        this._projectModel = new ProjectModel(projectFolderPath);
        // this.projectFolderPath = projectFolderPath;
    }

    getProjectPath() {
        return this._projectModel.getProjectPath();
    }
    getProjectModel(): ProjectModel {
        return this._projectModel;
    }

    createProject(createSubFolderTags: boolean): Observable<boolean> {
        return Observable.create(async observable => {
            await this._projectModel.createProject(createSubFolderTags);

            this._ngZone.run(() => {
                observable.next(true);
                observable.complete();
            });
        });
    }

    loadProject(): Observable<boolean> {
        return Observable.create(async observable => {
            const isProject: boolean = await this._projectModel.loadProject();
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
        return this._projectModel
            .getResourceCollectionModel()
            .getResourceModelById(resourceId);
    }

    getResourceCollectionModel(): ResourceCollectionModel {
        return this._projectModel.getResourceCollectionModel();
    }

    openResource(resourceId: string) {
        this._projectModel.open(resourceId);
    }

    addResourceTag(resourceId, tagId) {
        const tagModel: TagModel = this._projectModel
            .getTagCollectionModel()
            .getTagModelById(tagId);
        this._projectModel
            .getResourceCollectionModel()
            .getResourceModelById(resourceId)
            .addTagModel(tagModel);
    }

    removeResourceTag(resourceId, tagId) {
        this._projectModel
            .getResourceCollectionModel()
            .getResourceModelById(resourceId)
            .removeTagModel(tagId);
    }

    createProjectTag(tagName) {
        this._projectModel.getTagCollectionModel().addTagModel(TagModel.create(tagName));
    }

    getProjectTagList(): Array<TagModel> {
        return this._projectModel.getTagCollectionModel().getList();
    }

    getProjectTagModelById(tagId: string): TagModel {
        return this._projectModel.getTagCollectionModel().getTagModelById(tagId);
    }

    getProjectTagModelByName(tagName: string): TagModel {
        return this._projectModel.getTagCollectionModel().getTagModelByName(tagName);
    }

    saveProject(): Observable<null> {
        return Observable.create(async observable => {
            await this._projectModel.save();
            this._ngZone.run(() => {
                observable.next();
                observable.complete();
            });
        });
    }
}
