import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoaderService } from "../../../../services/loader.service";
import IpcProvider from "../../../../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../../../../shared/IpcProviderResourceEnums";
import * as Actions from "../../store/actions/index.action";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../reducers";

@Component({
    templateUrl: "project-path.component.html",
    styleUrls: ["./project-path.component.scss"]
})
export class ProjectPathComponent implements OnInit {
    constructor(
        private router: Router,
        private loaderService: LoaderService,
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        IpcProvider.request(IpcProviderResourceEnums.GET_PROJECT_LIST).then(
            projectList => {
                this.store.dispatch(
                    Actions.Project.setProjectList({
                        list: projectList
                    })
                );
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
