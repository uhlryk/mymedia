import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DetailsModalComponent } from "./details-modal.component";
import { TitleComponent } from "./components/title/title.component";
import { DescriptionComponent } from "./components/description/description.component";
import { SidebarModule } from "primeng/sidebar";
import { SharedModule } from "../shared/shared.module";
import { InplaceModule } from "primeng/inplace";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { InputTextareaModule } from "primeng/inputtextarea";
import { RatingModule } from "primeng/rating";
@NgModule({
    declarations: [DetailsModalComponent, TitleComponent, DescriptionComponent],
    imports: [
        CommonModule,
        SidebarModule,
        SharedModule,
        FormsModule,
        InplaceModule,
        InputTextModule,
        ButtonModule,
        InputTextareaModule,
        RatingModule
    ],
    exports: [DetailsModalComponent]
})
export class DetailsModalModule {}
