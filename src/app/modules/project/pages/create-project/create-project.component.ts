import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-create-project",
    templateUrl: "./create-project.component.html",
    styleUrls: ["./create-project.component.scss"]
})
export class CreateProjectComponent implements OnInit {
    projectPath: string;
    createSubFolderTags: boolean;
    constructor(
        private projectContextService: ProjectContextService,
        private router: Router
    ) {}

    ngOnInit() {
        this.projectPath = this.projectContextService.getProjectPath();
    }

    onCreateProject() {
        this.projectContextService.createProject(this.createSubFolderTags).subscribe(isProject => {
            this.router.navigate(["/files"]);
        });
    }
}
