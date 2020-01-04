import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ProjectContextService } from "./services/projectContext.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy {
    _newProject: Subscription;
    constructor(
        private router: Router,
        private projectContextService: ProjectContextService
    ) {
        this._newProject = projectContextService.listenNewProject().subscribe(() => {
            this.router.navigate(["/"]);
        });
    }

    ngOnDestroy() {
        if (this._newProject) {
            this._newProject.unsubscribe();
        }
    }
}
