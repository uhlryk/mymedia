import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoaderService } from "../../../../services/loader.service";
import IpcProvider from "../../../../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../../../../shared/IpcProviderResourceEnums";

@Component({
    templateUrl: "project-path.component.html",
    styleUrls: ["./project-path.component.scss"]
})
export class ProjectPathComponent implements OnInit {
    constructor(private router: Router, private loaderService: LoaderService) {}

    ngOnInit(): void {
        IpcProvider.request(IpcProviderResourceEnums.GET_PROJECT_LIST).then(
            projectList => {
                console.log("AAAAAAA", projectList);
            }
        );
    }

    onNewProjectPath() {
        this.loaderService.show();

        IpcProvider.request(IpcProviderResourceEnums.SET_ACTIVE_PROJECT_BY_PATH).then(
            () => {
                this.router.navigate(["/files"]);
            }
        );
    }
}
