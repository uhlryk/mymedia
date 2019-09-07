import { Injectable } from "@angular/core";
import loadFile from "./loadFile";
import fileSave from "./fileSave";
import getFileList from "./getFileList";
import Project from "../types/Project";
import File from "../types/File";
import { Observable, from } from "rxjs";
import { NgZone } from "@angular/core";
import path from "path";

@Injectable()
export class ProjectContextService {
    static projectFileName = "project.json";
    projectFolderPath: string;
    _project: Project;
    constructor(private _ngZone: NgZone) {}
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
                            files.forEach(fsFile => {
                                const fsFileName: string = fsFile.name;
                                const fsFilePath: string = fsFile.path;
                                const fileFromProject = project.files.find(
                                    file => file.filePath === fsFilePath
                                );
                                if (!fileFromProject) {
                                    const file: File = new File();
                                    file.filePath = fsFilePath;
                                    file.orgFileName = fsFileName;
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

    getFiles(): Array<File> {
        return this._project.files;
    }
}
