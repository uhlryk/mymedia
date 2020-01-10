import {Component, OnInit} from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../../../services/loader.service";
import IpcProvider from "../../../../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../../../../shared/IpcProviderResourceEnums";

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
        IpcProvider.request(IpcProviderResourceEnums.GET_PROJECT)
            .then(projectPath => {
                this.projectPath = projectPath;
                this.loaderService.hide();
            });
    }

    onCreateProject() {
        this.loaderService.show();
        IpcProvider.request(IpcProviderResourceEnums.CREATE_PROJECT).then(() => {
            this.router.navigate(["/files"]);
        });
    }

}
