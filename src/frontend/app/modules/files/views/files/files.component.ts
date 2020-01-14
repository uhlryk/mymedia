import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { DetailsModalComponent } from "../../modules/details-modal/details-modal.component";
import { LoaderService } from "../../../../services/loader.service";
import { Router } from "@angular/router";
import { ThumbnailService } from "../../../../services/thumbnail.service";
import { TagsModalComponent } from "../../modules/tags-modal/tags-modal.component";
import { Subscription } from "rxjs";
import IProject from "../../../../../../shared/types/project.interface";
import IResource from "../../../../../../shared/types/resource.interface";
import ITag from "../../../../../../shared/types/tag.interface";
import ISearch from "../../types/search.interface";
import { ConfirmationService } from "primeng/api";
import IpcProvider from "../../../../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../../../../shared/IpcProviderResourceEnums";
import { AppMenuService } from "../../../../services/app-menu.service";

@Component({
    templateUrl: "files.component.html",
    styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit, OnDestroy {
    @ViewChild(DetailsModalComponent, { static: true })
    detailsModal: DetailsModalComponent;

    @ViewChild(TagsModalComponent, { static: true })
    tagsModal: TagsModalComponent;

    _resourceList: Array<IResource>;
    _tagList: Array<ITag>;
    _search: ISearch;
    _orderMethod: string;
    _projectChange: Subscription;
    _thumbnailChange: Subscription;
    _tagsManagerChange: Subscription;
    constructor(
        private confirmationService: ConfirmationService,
        private projectContextService: ProjectContextService,
        private appMenu: AppMenuService,
        private thumbnailService: ThumbnailService,
        private loaderService: LoaderService,
        private router: Router
    ) {}
    ngOnInit() {
        this._search = {
            text: "",
            tagIdList: []
        };
        this._orderMethod = "";
        this.loaderService.show();
        this._projectChange = this.projectContextService
            .listenProjectChange()
            .subscribe((project: IProject) => {
                if (project) {
                    this._resourceList = project.resourceList;
                    if (this._tagList !== project.tagList) {
                        this._search.tagIdList = this._search.tagIdList.filter(
                            (tagId: string) =>
                                project.tagList.find((tag: ITag) => tag.id === tagId)
                        );
                    }
                    this._tagList = project.tagList;
                }
            });
        this._tagsManagerChange = this.appMenu.listenTagsManagerButton().subscribe(() => {
            this.tagsModal.show();
        });
        this.projectContextService.loadProject().then((project: IProject) => {
            if (project) {
                this._resourceList = project.resourceList;
                this._tagList = project.tagList;
                this._thumbnailChange = this.thumbnailService
                    .onThumbnailChange()
                    .subscribe(response => {
                        const thumbnailResource = this._resourceList.find(
                            (resource: IResource) => resource.id === response.resourceId
                        );
                        const list = (thumbnailResource.thumbnailList || []).slice();
                        list[response.videoIndex] = response.resourceThumbnailPath;
                        this.projectContextService.changeProjectResource(
                            thumbnailResource.id,
                            {
                                thumbnailList: list
                            }
                        );
                    });

                this.loaderService.hide();
            } else {
                this.router.navigate(["/create-project"]);
            }
        });
    }

    onClickThumbnail(resourceId) {
        this.projectContextService.openResource(resourceId);
    }

    onClickDetailsButton(resourceId) {
        this.detailsModal.show(resourceId);
    }

    onClickDeleteButton(resourceId) {
        this.confirmationService.confirm({
            message: "Are you sure that you want to delete resource?",
            accept: () => {
                console.log("Removed");
                this.projectContextService.removeProjectResource(resourceId);
            }
        });
    }

    onChangeSearch(search: ISearch) {
        this._search = search;
    }

    onChangeOrderMethod(orderMethod: string) {
        this._orderMethod = orderMethod;
    }

    ngOnDestroy() {
        if (this._projectChange) {
            this._projectChange.unsubscribe();
        }
        if (this._thumbnailChange) {
            this._thumbnailChange.unsubscribe();
        }

        if (this._tagsManagerChange) {
            this._tagsManagerChange.unsubscribe();
        }
    }
}
