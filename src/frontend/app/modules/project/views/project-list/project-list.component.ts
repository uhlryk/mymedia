import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoaderService } from "../../../../services/loader.service";
import IpcProvider from "../../../../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../../../../shared/IpcProviderResourceEnums";
import * as Actions from "../../store/actions/index.action";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../../../reducers";
import { Observable } from "rxjs";
import { ProjectList } from "../../store/selectors/index.selector";

@Component({
    templateUrl: "project-list.component.html",
    styleUrls: ["./project-list.component.scss"]
})
export class ProjectListComponent implements OnInit {
    projectList$: Observable<Array<string>>;
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
        this.projectList$ = this.store.pipe(select(ProjectList.listSelector));
    }

    onNewProjectPath() {
        this.loaderService.show();

        IpcProvider.request(IpcProviderResourceEnums.SET_ACTIVE_PROJECT_BY_PATH).then(
            () => {
                this.router.navigate(["/files"]);
            }
        );
    }

    onExistingProjectPath(projectPath) {
        console.log(projectPath);
    }

    onRemoveProjectPath(projectPath) {
        console.log(projectPath);
    }
}
