import {Component, OnDestroy, OnInit} from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../../../services/loader.service";
import {Subscription} from "rxjs";

@Component({
    selector: "app-create-project",
    templateUrl: "./create-project.component.html",
    styleUrls: ["./create-project.component.scss"]
})
export class CreateProjectComponent implements OnInit, OnDestroy {
    projectPath: string;
    _createProjectSubscription: Subscription;
    constructor(
        private projectContextService: ProjectContextService,
        private router: Router,
        private loaderService: LoaderService
    ) {}

    ngOnInit() {
        this.projectContextService.getProjectPath().then(projectPath => {
            this.projectPath = projectPath;
            this.loaderService.hide();
        });
    }

    onCreateProject() {
        this.loaderService.show();
        this._createProjectSubscription = this.projectContextService.createProject().subscribe(isProject => {
            this.router.navigate(["/files"]);
        });
    }

    ngOnDestroy() {
        this._createProjectSubscription.unsubscribe();
    }
}
