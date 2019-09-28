import { Component, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { remote } from "electron";
const dialog = remote.dialog;

@Component({
    templateUrl: "project-path.component.html"
})
export class ProjectPathComponent {
    constructor(
        private cdr: ChangeDetectorRef,
        private router: Router,
        private projectContextService: ProjectContextService
    ) {}
    onSelectPath() {
        dialog.showOpenDialog(
            {
                properties: ["openDirectory"]
            },
            fileNames => {
                const projectFolderPath = fileNames[0];
                this.projectContextService
                    .setProjectPath(projectFolderPath)
                    .subscribe(() => {
                        this.projectContextService.loadProject().subscribe(isProject => {
                            if (isProject) {
                                // console.log(project);
                                // this.projectContextService.setProject(project);
                                this.router.navigate(["/files"]);
                            } else {
                                this.router.navigate(["/create-project"]);
                            }
                        });
                    });
            }
        );
    }
}
