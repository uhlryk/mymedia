import { Component, ChangeDetectorRef } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ProjectContextService } from "../../services/projectContext.service";
const electron = (<any>window).require("electron");
// import { remote} from "electron";
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
                this.projectPath.setValue(fileNames[0]);
                this.projectContextService.setProjectPath(fileNames[0]);
                this.cdr.detectChanges();
                this.router.navigate(["/files"]);
            }
        );
    }
}
