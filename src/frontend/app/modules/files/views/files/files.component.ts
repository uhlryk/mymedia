import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { DetailsModalComponent } from "../../modules/details-modal/details-modal.component";
import { ThumbnailsModalComponent } from "../../modules/thumbnails-modal/thumbnails-modal.component";
import ResourceModel from "../../../../models/resource.model";
import { LoaderService } from "../../../../services/loader.service";
import { Router } from "@angular/router";
import { ThumbnailService } from "../../../../services/thumbnail.service";
import { TagsModalComponent } from "../../modules/tags-modal/tags-modal.component";
import ProjectModel from "../../../../models/project.model";
import TagModel from "../../../../models/tag.model";
import { Subscription } from "rxjs";
import IProject from "../../../../../../shared/types/project.interface";
import IResource from "../../../../../../shared/types/resource.interface";
import ITag from "../../../../../../shared/types/tag.interface";
import ISearch from "../../types/search.interface";

@Component({
    templateUrl: "files.component.html",
    styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit, OnDestroy {
    @ViewChild(DetailsModalComponent, { static: true })
    detailsModal: DetailsModalComponent;

    @ViewChild(ThumbnailsModalComponent, { static: true })
    thumbnailsModal: ThumbnailsModalComponent;

    @ViewChild(TagsModalComponent, { static: true })
    tagsModal: TagsModalComponent;

    // _cardList: Array<ResourceModel>;
    // _projectTagList: Array<TagModel>;

    _resourceList: Array<IResource>;
    _tagList: Array<ITag>;
    _search: ISearch;
    _orderMethod: string;
    _projectChange: Subscription;
    _thumbnailChange: Subscription;
    _openTagManager: Subscription;
    private _isLeftMenuVisible: boolean;
    // visibleSidebar = false;
    constructor(
        private projectContextService: ProjectContextService,
        private thumbnailService: ThumbnailService,
        private loaderService: LoaderService,
        private router: Router
    ) {}
    ngOnInit() {
        // this._searchTagList = [];
        // this._searchText = "";
        this._orderMethod = "";
        this._isLeftMenuVisible = false;
        this.loaderService.show();
        this._projectChange = this.projectContextService
            .listenProjectChange()
            .subscribe((project: IProject) => {
                if(project) {
                    this._resourceList = project.resourceList;
                    this._tagList = project.tagList;
                }
            });
        this._openTagManager = this.projectContextService
            .listenOpenTagsManager()
            .subscribe(() => {
                this.tagsModal.show();
            });
        this.projectContextService
            .loadProject()
            .then((project: IProject) => {
                if (project) {
                    console.log(this._resourceList);
                    this._resourceList = project.resourceList;
                    this._tagList = project.tagList;
                    // this._thumbnailChange = this.thumbnailService
                    //     .onThumbnailChange()
                    //     .subscribe(response => {
                    //         const resourceModel: ResourceModel = this.projectContextService.getResourceModel(
                    //             response.resourceId
                    //         );
                    //         resourceModel.setThumbnailPath(
                    //             response.resourceThumbnailPath,
                    //             response.videoIndex
                    //         );
                    //         this.projectContextService.triggerChange();
                    //     });

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
        if (this._openTagManager) {
            this._openTagManager.unsubscribe();
        }
        if (this._thumbnailChange) {
            this._thumbnailChange.unsubscribe();
        }
    }
}
