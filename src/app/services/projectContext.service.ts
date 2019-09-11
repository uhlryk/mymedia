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
    loadProject(): Observable<Project> {
        return Observable.create(observable => {
            return loadFile(this.projectFolderPath, ProjectContextService.projectFileName)
                .then(projectFile => {
                    if (projectFile) {
                        return Object.assign({}, new Project(), JSON.parse(projectFile));
                    } else {
                        const project = new Project();
                        return fileSave(
                            path.join(
                                this.projectFolderPath,
                                ProjectContextService.projectFileName
                            ),
                            JSON.stringify(project)
                        ).then(() => project);
                    }
                })
                .then(project => {
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
                                observable.next(project);
                                observable.complete();
                            });
                        });
                });
        });
        // return from(projectPromise);
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

    addTag(tagName) {
        const tag: Tag = new Tag(tagName);
        return this._project.tags.push(tag);
    }

    getTags(): Array<Tag> {
        return this._project.tags;
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
