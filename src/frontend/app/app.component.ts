import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ProjectContextService } from "./services/projectContext.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    constructor(
        private router: Router,
        private projectContextService: ProjectContextService
    ) {
        projectContextService.listenNewProject().subscribe(() => {
            this.router.navigate(["/"]);
        });
    }
}
