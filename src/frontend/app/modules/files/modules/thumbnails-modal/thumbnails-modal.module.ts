import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThumbnailsModalComponent } from "./thumbnails-modal.component";
import { SharedModule } from "../shared/shared.module";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { DialogService } from "primeng/api";
import {ContentComponent} from "./components/content/content.component";
@NgModule({
    declarations: [ThumbnailsModalComponent, ContentComponent],
    imports: [
        CommonModule,
        SharedModule,
        DynamicDialogModule
    ],
    providers: [DialogService],
    exports: [ThumbnailsModalComponent],
    entryComponents: [ContentComponent]
})
export class ThumbnailsModalModule {}
