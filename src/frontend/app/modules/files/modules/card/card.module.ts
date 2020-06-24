import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CardComponent } from "./components/card/card.component";
import { TagListModule } from "../tag-list/tag-list.module";
import { CardModule as PrimengCardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";
import { RatingModule } from "primeng/rating";
import { SharedModule } from "../shared/shared.module";
import { ThumbnailModule } from "../thumbnail/thumbnail.module";
@NgModule({
    declarations: [CardComponent],
    imports: [
        CommonModule,
        FormsModule,
        TagListModule,
        ButtonModule,
        PrimengCardModule,
        TooltipModule,
        RatingModule,
        ThumbnailModule,
        SharedModule
    ],
    exports: [CardComponent]
})
export class CardModule {}
