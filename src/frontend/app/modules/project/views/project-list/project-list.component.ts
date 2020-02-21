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
import { IProjectListElement } from "../../../../../../shared/types/project-list.interface";

@Component({
    templateUrl: "project-list.component.html",
    styleUrls: ["./project-list.component.scss"]
})
export class ProjectListComponent implements OnInit {
    projectList$: Observable<Array<IProjectListElement>>;
    constructor(
        private router: Router,
        private loaderService: LoaderService,
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        this.projectList$ = this.store.pipe(select(ProjectList.listSelector));
    }

    onClickNewProject() {
        this.loaderService.show();

        IpcProvider.request(
            IpcProviderResourceEnums.SET_ACTIVE_PROJECT_FROM_FILEPICKER
        ).then(() => {
            this.router.navigate(["/files"]);
        });
    }

    onClickProjectFromList(id) {
        IpcProvider.request(IpcProviderResourceEnums.SET_ACTIVE_PROJECT_FROM_LIST, {
            id: id
        }).then(() => {
            this.router.navigate(["/files"]);
        });
    }

    onRemoveProjectFromList(id) {
        this.store.dispatch(
            Actions.Project.deleteProjectFromProjectList({
                id: id
            })
        );
    }
}
