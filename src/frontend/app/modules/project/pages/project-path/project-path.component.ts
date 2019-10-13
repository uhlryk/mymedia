import { Component, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { ProjectContextService } from "../../../../services/projectContext.service";

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
        this.projectContextService.setProjectPath().subscribe(() => {
            this.projectContextService.loadProject().subscribe(isProject => {
                if (isProject) {
                    this.router.navigate(["/files"]);
                } else {
                    this.router.navigate(["/create-project"]);
                }
            });
        });
    }
}
