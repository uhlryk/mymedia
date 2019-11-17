import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilesComponent } from "./pages/files/files.component";
import { RowComponent } from "./components/row/row.component";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "./modules/shared/shared.module";
import { ListComponent } from "./components/list/list.component";
import { DetailsModalModule } from "./modules/details-modal/details-modal.module";
import { ThumbnailsModalModule } from "./modules/thumbnails-modal/thumbnails-modal.module";
import { ResultManipulationService } from "../../services/result-manipulation.service";
import { SearchComponent } from "./components/search/search.component";
import { OrderComponent } from "./components/order/order.component";
import { ContentComponent } from "./modules/thumbnails-modal/components/content/content.component";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";

import { TooltipModule } from "primeng/tooltip";
import { RatingModule } from "primeng/rating";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CardModule,
        ButtonModule,
        DetailsModalModule,
        TooltipModule,
        SharedModule,
        RatingModule,
        ThumbnailsModalModule
    ],
    providers: [ResultManipulationService],
    declarations: [
        FilesComponent,
        RowComponent,
        ListComponent,
        SearchComponent,
        OrderComponent,
        ContentComponent
    ],
    entryComponents: [ContentComponent]
})
export class FilesModule {}
