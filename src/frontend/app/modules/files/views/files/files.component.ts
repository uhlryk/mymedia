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
// import { Resource, Project } from "../../store/actions/index.action";
import IThumbnailChangeEvent from "../../../../../../shared/types/thumbnailChangeEvent.interface";

@Component({
    templateUrl: "files.component.html",
    styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit, OnDestroy {
    @ViewChild(TagsModalComponent, { static: true })
    tagsModal: TagsModalComponent;

    // _projectChange: Subscription;
    // _tagsManagerChange: Subscription;
    //
    // thumbnailListenerCleaner: () => void;
    constructor(
        private confirmationService: ConfirmationService,
        private store: Store<AppState>,
        private projectContextService: ProjectContextService,
        private loaderService: LoaderService,
        private router: Router
    ) {}
    ngOnInit() {
        this.loaderService.show();
        // this.tagsModal.show();

        // IpcProvider.request(IpcProviderResourceEnums.LOAD_PROJECT).then(
        //     (project: IProject) => {
        //         if (project) {
        //             this.store.dispatch(
        //                 Project.setProjectInitialData({
        //                     resourceList: project.resourceList,
        //                     tagList: project.tagList
        //                 })
        //             );
        //             this.thumbnailListenerCleaner = IpcProvider.listen(
        //                 IpcProviderResourceEnums.ON_THUMBNAIL_CHANGE,
        //                 (response: IThumbnailChangeEvent) => {
        //                     this.store.dispatch(
        //                         Resource.addResourceThumbnail({
        //                             resourceId: response.resourceId,
        //                             index: response.videoIndex,
        //                             thumbnail: response.resourceThumbnailPath
        //                         })
        //                     );
        //                 }
        //             );
        //             IpcProvider.trigger(IpcProviderResourceEnums.RUN_THUMBNAIL_CHANGE);
        //             this.loaderService.hide();
        //         } else {
        //             this.router.navigate(["/create-project"]);
        //         }
        //     }
        // );
    }

    ngOnDestroy() {
        // if (this.thumbnailListenerCleaner) {
        //     this.thumbnailListenerCleaner();
        // }
        // if (this._projectChange) {
        //     this._projectChange.unsubscribe();
        // }
        // if (this._tagsManagerChange) {
        //     this._tagsManagerChange.unsubscribe();
        // }
    }
}
