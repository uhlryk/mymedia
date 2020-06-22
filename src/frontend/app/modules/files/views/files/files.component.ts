import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { LoaderService } from "../../../../services/loader.service";
import { Router } from "@angular/router";
import { TagsModalComponent } from "../../modules/tags-modal/tags-modal.component";
import { Subscription } from "rxjs";
import IProject from "../../../../../../shared/types/project.interface";
import { ConfirmationService } from "primeng/api";
import IpcProvider from "../../../../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../../../../shared/IpcProviderResourceEnums";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../reducers";
import { Resource } from "../../store/actions/index.action";
import IThumbnailChangeEvent from "../../../../../../shared/types/thumbnailChangeEvent.interface";
import IResource from "../../../../../../shared/types/resource.interface";

@Component({
    templateUrl: "files.component.html",
    styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit, OnDestroy {
    resourceChangeListenerCleaner: () => void;
    constructor(
        private confirmationService: ConfirmationService,
        private store: Store<AppState>,
        private projectContextService: ProjectContextService,
        private loaderService: LoaderService,
        private router: Router
    ) {}
    ngOnInit() {
        this.resourceChangeListenerCleaner = IpcProvider.listen(
            IpcProviderResourceEnums.ON_RESOURCE_CHANGE,
            (resource: IResource) => {
                this.store.dispatch(Resource.upsertResource({ resource }));
            }
        );
        IpcProvider.trigger(IpcProviderResourceEnums.REGISTER_RESOURCE_CHANGE_LISTENER);
        this.loaderService.hide();
    }

    ngOnDestroy() {
        this.resourceChangeListenerCleaner();
}
}
