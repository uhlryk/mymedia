import { Component, ChangeDetectorRef } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ProjectContextService } from "../../services/projectContext.service";
// import getFileList from "./getFileList";
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
                const projectFolderPath = fileNames[0];
                this.projectPath.setValue(projectFolderPath);
                this.projectContextService.setProjectPath(projectFolderPath);
                this.projectContextService.loadProject()
                    .subscribe(isProject => {
                        // if(isProject) {

                        // } else {
                            this.router.navigate(["/files"]);
                        // }
                    });
                // loadFile(projectFolderPath, ".project.json").then(projectFile => {
                //   console.log(projectFile);
                //   if(!projectFile) {
                //
                //   } else {
                //
                //   }
                //     getFileList(this.projectContextService.getProjectPath()).then(
                //         fileList => {
                //           console.log(fileList);
                //             // this.fileList = fileList;
                //             // this.cdr.detectChanges();
                //         }
                //     );
                // });

                // this.cdr.detectChanges();
                // this.router.navigate(["/files"]);
            }
        );
    }
}
