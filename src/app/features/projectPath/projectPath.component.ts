import { Component, ChangeDetectorRef } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ProjectContextService } from "../../services/projectContext.service";
const electron = (<any>window).require("electron");
const dialog = electron.remote.dialog;

@Component({
    templateUrl: "projectPath.component.html"
})
export class ProjectPathComponent {
    constructor(
        private cdr: ChangeDetectorRef,
        private router: Router,
        private projectContextService: ProjectContextService
    ) {}
    projectPath = new FormControl("");
    onSelectPath() {
        dialog.showOpenDialog(
            {
                properties: ["openDirectory"]
            },
            fileNames => {
                const projectFolderPath = fileNames[0];
                this.projectPath.setValue(projectFolderPath);
                this.projectContextService.setProjectPath(projectFolderPath);
                this.projectContextService.loadProject().then(project => {
                    console.log(project);
                    this.projectContextService.setProject(project);
                    this.router.navigate(["/files"]);
                });
            }
        );
    }
}
