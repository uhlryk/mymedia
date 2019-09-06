import { Component, ChangeDetectorRef } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
const electron = (<any>window).require("electron");
// import { remote} from "electron";
const dialog = electron.remote.dialog;

@Component({
    templateUrl: "project.component.html"
})
export class ProjectComponent {
    constructor(private cdr: ChangeDetectorRef, private router: Router) {}
    projectPath = new FormControl("");
    allowNext = false;
    actionType = "";
    onSelectPath() {
        dialog.showOpenDialog(
            {
                properties: ["openDirectory"]
            },
            fileNames => {
                this.projectPath.setValue(fileNames[0]);
                this.allowNext = true;
                this.actionType = "Create Project";
                this.cdr.detectChanges();
                this.router.navigate(["/files"]);
            }
        );
    }
}
