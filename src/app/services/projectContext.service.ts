import { Injectable } from "@angular/core";
import { FileService } from "./file.service";
import loadFile from "./loadFile";
import fileSave from "./fileSave";
import getFileList from "./getFileList";
import Project from "../types/Project";
import File from "../types/File";
import { Observable, from } from "rxjs";
import { NgZone } from "@angular/core";
import path from "path";
import Tag from "../types/Tag";

@Injectable()
export class ProjectContextService {
    static projectFileName = "project.json";
    projectFolderPath: string;
    _project: Project;
    constructor(private _ngZone: NgZone, private fileService: FileService) {}
    setProjectPath(projectFolderPath: string): void {
        this.projectFolderPath = projectFolderPath;
    }

    getProjectPath(): string {
        return this.projectFolderPath;
    }

    setProject(project) {
        this._project = project;
    }
    createProject(createSubFolderTags: boolean): Observable<boolean> {
        return Observable.create(observable => {
            const project = new Project();
            return getFileList(this.projectFolderPath)
                .then(files => {
                    console.log("===");
                    console.log(files[0]);
                    files.forEach(fsFile => {
                        const fsFileName: string = fsFile.name;
                        const fsFilePath: string = fsFile.path;
                        const fsSize: number = fsFile.stat.size;

                        const file: File = new File();
                        file.filePath = fsFilePath;
                        file.orgFileName = fsFileName;
                        file.size = fsSize;
                        file.newFileName = this.fileService.getFileName(fsFileName);
                        console.log("new file added", file);

                        if(createSubFolderTags) {
                            const folderPath = path.dirname(file.filePath);
                            if(folderPath !== ".") {
                                let existingTag = project.tags.find(tag => tag.name === folderPath);
                                if (!existingTag) {
                                    existingTag = new Tag(folderPath);
                                    project.tags.push(existingTag);
                                }
                                file.tags.push(existingTag.id);
                            }
                        }
                        project.files.push(file);

                    });
                    // this._project = project;
                    return fileSave(
                        path.join(
                            this.projectFolderPath,
                            ProjectContextService.projectFileName
                        ),
                        JSON.stringify(project)
                    );
                })
                .then(() => {
                    this._ngZone.run(() => {
                        this.setProject(project);
                        observable.next(true);
                        observable.complete();
                    });
                });
        });
    }
    loadProject(): Observable<boolean> {
        return Observable.create(observable => {
            return loadFile(
                this.projectFolderPath,
                ProjectContextService.projectFileName
            ).then(projectFile => {
                if (projectFile) {
                    const project = Object.assign(
                        {},
                        new Project(),
                        JSON.parse(projectFile)
                    );
                    return getFileList(this.projectFolderPath)
                        .then(files => {
                            console.log("===");
                            console.log(files[0]);
                            files.forEach(fsFile => {
                                const fsFileName: string = fsFile.name;
                                const fsFilePath: string = fsFile.path;
                                const fsSize: number = fsFile.stat.size;
                                const fileFromProject = project.files.find(
                                    file => file.filePath === fsFilePath
                                );
                                if (!fileFromProject) {
                                    const file: File = new File();
                                    file.filePath = fsFilePath;
                                    file.orgFileName = fsFileName;
                                    file.size = fsSize;
                                    file.newFileName = this.fileService.getFileName(
                                        fsFileName
                                    );
                                    console.log("new file added", file);

                                    project.files.push(file);
                                } else {
                                }
                            });
                            // this._project = project;
                            return fileSave(
                                path.join(
                                    this.projectFolderPath,
                                    ProjectContextService.projectFileName
                                ),
                                JSON.stringify(project)
                            );
                        })
                        .then(() => {
                            this._ngZone.run(() => {
                                this.setProject(project);
                                observable.next(true);
                                observable.complete();
                            });
                        });
                } else {
                    this._ngZone.run(() => {
                        observable.next(false);
                        observable.complete();
                    });
                }
            });
        });
    }

    getFile(fileId: string): File {
        return this._project.files.find(file => file.id === fileId);
    }

    getFiles(): Array<File> {
        return this._project.files;
    }

    openFile(fileId) {
        this.fileService.open(this.getProjectPath(), this.getFile(fileId).filePath);
    }

    getFileTags(fileId: string): Array<Tag> {
        const file = this.getFile(fileId);
        const projectTags = this.getTags();
        return file.tags.map(tagId => projectTags.find(tag => tag.id === tagId));
    }
    addTagToFile(fileId, tagId) {
        const file = this.getFile(fileId);
        if (!file.tags.find(fTagId => fTagId === tagId)) {
            file.tags.push(tagId);
        }
    }

    removeTagFromFile(fileId, tagId) {
        const file = this.getFile(fileId);
        const index = file.tags.findIndex(fTagId => fTagId === tagId);
        if (index >= 0) {
            file.tags.splice(index, 1);
        }
    }

    addTag(tagName) {
        const tag: Tag = new Tag(tagName);
        return this._project.tags.push(tag);
    }

    getTags(): Array<Tag> {
        return this._project.tags;
    }

    getTag(tagId: string): Tag {
        return this._project.tags.find(tag => tag.id === tagId);
    }

    findTagByName(tagName: string): Tag {
        return this._project.tags.find(tag => tag.name === tagName);
    }

    saveProject(): Observable<null> {
        return Observable.create(observable => {
            fileSave(
                path.join(this.projectFolderPath, ProjectContextService.projectFileName),
                JSON.stringify(this._project)
            ).then(() => {
                this._ngZone.run(() => {
                    observable.next();
                    observable.complete();
                });
            });
        });
    }
}
