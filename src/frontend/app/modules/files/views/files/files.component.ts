import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
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

    _cardList: Array<ResourceModel>;
    _projectTagList: Array<TagModel>;

    _searchTagList: Array<TagModel>;
    _searchText: string;
    _orderMethod: string;
    _projectChange: Subscription;
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
        this._searchTagList = [];
        this._searchText = "";
        this._orderMethod = "";
        this._isLeftMenuVisible = false;
        this.loaderService.show();
        this._projectChange = this.projectContextService
            .projectChange()
            .subscribe((projectModel: ProjectModel) => {
                console.log("FilesComponent change in project");
                this._projectTagList = this.projectContextService.getProjectTagList();
                this._cardList = projectModel.getResourceCollectionModel().getList();
                console.log(this._cardList);
            });
        this._openTagManager = this.projectContextService
            .listenOpenTagsManager()
            .subscribe(() => {
                this.tagsModal.show();
            });
        this.projectContextService
            .loadProject()
            .then(() => {
                this.thumbnailService.onThumbnailChange().subscribe(response => {
                    const resourceModel: ResourceModel = this.projectContextService.getResourceModel(
                        response.resourceId
                    );
                    resourceModel.setThumbnailPath(
                        response.resourceThumbnailPath,
                        response.videoIndex
                    );
                    this.projectContextService.triggerChange();
                });

                this.loaderService.hide();
            })
            .catch(() => {
                this.router.navigate(["/create-project"]);
            });
    }

    onClickThumbnail(resourceId) {
        this.projectContextService.openResource(resourceId);
    }

    onClickDetailsButton(resourceId) {
        this.detailsModal.show(resourceId);
    }

    onChangeSearchText(searchText: string) {
        this._searchText = searchText;
    }

    onChangeSearchTagList(searchTagList: Array<TagModel>) {
        this._searchTagList = searchTagList;
    }

    onChangeOrderMethod(orderMethod: string) {
        this._orderMethod = orderMethod;
    }

    ngOnDestroy() {
        this._projectChange.unsubscribe();
        this._openTagManager.unsubscribe();
    }
}
