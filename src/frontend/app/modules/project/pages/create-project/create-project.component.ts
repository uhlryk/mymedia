import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../../../services/loader.service";

@Component({
    selector: "app-create-project",
    templateUrl: "./create-project.component.html",
    styleUrls: ["./create-project.component.scss"]
})
export class CreateProjectComponent implements OnInit {
    projectPath: string;
    constructor(
        private projectContextService: ProjectContextService,
        private router: Router,
        private loaderService: LoaderService
    ) {}

    ngOnInit() {
        this.projectContextService.getProjectPath().subscribe(projectPath => {
            this.projectPath = projectPath;
            this.loaderService.hide();
        });
    }

    onCreateProject() {
        this.projectContextService.createProject().subscribe(isProject => {
            this.router.navigate(["/files"]);
        });
    }
}
