import { Component, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { ProjectContextService } from "../../../../services/projectContext.service";
import {LoaderService} from "../../../../services/loader.service";

@Component({
    templateUrl: "project-path.component.html",
    styleUrls: ["./project-path.component.scss"]
})
export class ProjectPathComponent {
    constructor(
        private cdr: ChangeDetectorRef,
        private router: Router,
        private projectContextService: ProjectContextService,
        private loaderService: LoaderService
    ) {}

    onSelectPath() {
        this.loaderService.show();
        this.projectContextService.setProjectPath().subscribe(() => {
            this.projectContextService.loadProject().subscribe(isProject => {
                this.loaderService.hide();
                if (isProject) {
                    this.router.navigate(["/files"]);
                } else {
                    this.router.navigate(["/create-project"]);
                }
            });
        });
    }
}
