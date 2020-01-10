import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoaderService } from "../../../../services/loader.service";
import IpcProvider from "../../../../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../../../../shared/IpcProviderResourceEnums";

@Component({
    templateUrl: "project-path.component.html",
    styleUrls: ["./project-path.component.scss"]
})
export class ProjectPathComponent {
    constructor(
        private router: Router,
        private loaderService: LoaderService
    ) {}

    onSelectPath() {
        this.loaderService.show();
        IpcProvider.request(IpcProviderResourceEnums.SET_PROJECT).then(isProjectExist => {
            if (isProjectExist) {
                this.router.navigate(["/files"]);
            } else {
                this.router.navigate(["/create-project"]);
            }
        });
    }
}
