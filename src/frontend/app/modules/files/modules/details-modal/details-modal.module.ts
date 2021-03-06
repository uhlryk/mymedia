import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DetailsModalComponent } from "./details-modal.component";
import { DescriptionComponent } from "./components/description/description.component";
import { TagSelectListModule } from "../tag-select-list/tag-select-list.module";
import { SidebarModule } from "primeng/sidebar";
import { SharedModule } from "../shared/shared.module";
import { InplaceModule } from "primeng/inplace";
import { ButtonModule } from "primeng/button";
import { InputTextareaModule } from "primeng/inputtextarea";
import { RatingModule } from "primeng/rating";
import { DetailsComponent } from "./components/details/details.component";
import { ThumbnailModule } from "../thumbnail/thumbnail.module";
@NgModule({
    declarations: [DetailsModalComponent, DescriptionComponent, DetailsComponent],
    imports: [
        CommonModule,
        TagSelectListModule,
        SidebarModule,
        SharedModule,
        FormsModule,
        InplaceModule,
        ButtonModule,
        InputTextareaModule,
        RatingModule,
        ThumbnailModule
    ],
    exports: [DetailsModalComponent]
})
export class DetailsModalModule {}
